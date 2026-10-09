import { readFile } from "node:fs/promises";
import { PrismaClient, type Role } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import {
  getPlatformProxy,
  unstable_splitSqlQuery as splitSqlQuery,
} from "wrangler";
import { seed } from "../../../prisma/seed";
import { appRouter } from "../trpc/router/_app";
import { createDemoOrder } from "./checkout";
import { findUserByEmail } from "../auth/user";
import { verifyPassword } from "../auth/password";

const state = vi.hoisted(() => ({ env: {} as CloudflareEnv }));
vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: () => ({ env: state.env }),
}));

let proxy: Awaited<ReturnType<typeof getPlatformProxy<CloudflareEnv>>>;
let prisma: PrismaClient;
const adminPassword = "PrivateTestPassword2026";

beforeAll(async () => {
  proxy = await getPlatformProxy<CloudflareEnv>({
    persist: false,
    remoteBindings: false,
  });
  state.env = proxy.env;
  prisma = new PrismaClient({ adapter: new PrismaD1(proxy.env.DB) });
  for (const file of [
    "0001_initial.sql",
    "0002_guards.sql",
    "0003_request_limits.sql",
    "0004_email_case.sql",
    "0005_seed_product_images.sql",
    "0006_seed_recipe_images.sql",
    "0007_r2_media.sql",
  ]) {
    const sql = await readFile(`prisma/migrations/${file}`, "utf8");
    for (const statement of splitSqlQuery(sql))
      await proxy.env.DB.prepare(statement).run();
  }
  await seed(prisma, adminPassword);
}, 60_000);

afterAll(async () => {
  await prisma?.$disconnect();
  await proxy?.dispose();
});

function caller(id?: string, role: Role = "client") {
  return appRouter.createCaller({
    prisma,
    requestIP: undefined,
    session: id ? { user: { id, role }, expires: "" } : null,
  });
}

test("R2 media migration preserves records and custom photos, including legacy user defaults", async () => {
  const { references } = JSON.parse(
    await readFile("assets/seed-media/manifest.json", "utf8"),
  ) as {
    references: {
      table: string;
      column: string;
      label?: string;
      originalImageURL: string;
      imageURL: string;
    }[];
  };
  const tables = [
    "User",
    "Comment",
    "Workshop",
    "ECategoryInSpanish",
    "NECategoryInSpanish",
  ];
  const snapshot = async () =>
    Promise.all(
      tables.map(async (table) => {
        const { results } = await proxy.env.DB.prepare(
          `SELECT * FROM "${table}" ORDER BY id`,
        ).all();
        return results.map((row) =>
          Object.fromEntries(
            Object.entries(row).filter(
              ([key]) => !["image", "imageURL"].includes(key),
            ),
          ),
        );
      }),
    );
  const before = await snapshot();
  for (const ref of references) {
    const labelColumn = ref.table.endsWith("CategoryInSpanish")
      ? "categoryInSpanish"
      : "name";
    const sql =
      `UPDATE "${ref.table}" SET "${ref.column}" = ? WHERE "${ref.column}" = ?` +
      (ref.label ? ` AND "${labelColumn}" = ?` : "");
    await proxy.env.DB.prepare(sql)
      .bind(
        ref.originalImageURL,
        ref.imageURL,
        ...(ref.label ? [ref.label] : []),
      )
      .run();
  }
  const custom = "/api/images/admin/00000000-0000-4000-a000-000000000003.jpg";
  const workshop = await prisma.workshop.findFirstOrThrow();
  await prisma.workshop.update({
    where: { id: workshop.id },
    data: { imageURL: custom },
  });
  const sql = await readFile("prisma/migrations/0007_r2_media.sql", "utf8");
  await proxy.env.DB.batch(
    splitSqlQuery(sql).map((statement) => proxy.env.DB.prepare(statement)),
  );
  expect(await snapshot()).toEqual(before);
  expect(
    (await prisma.workshop.findUniqueOrThrow({ where: { id: workshop.id } }))
      .imageURL,
  ).toBe(custom);
  for (const table of tables) {
    const column = table === "User" ? "image" : "imageURL";
    const { results } = await proxy.env.DB.prepare(
      `SELECT "${column}" AS image FROM "${table}"`,
    ).all<{ image: string | null }>();
    expect(
      results.every(
        (row) => row.image === null || row.image.startsWith("/api/images/"),
      ),
    ).toBe(true);
  }
  await proxy.env.DB.prepare(
    'INSERT INTO "User" (id, name, email) VALUES (?, ?, ?)',
  )
    .bind("legacy-image-default", "Legacy", "legacy-default@example.com")
    .run();
  const legacy = await prisma.user.findUniqueOrThrow({
    where: { id: "legacy-image-default" },
  });
  expect(legacy.image).toMatch(/^\/api\/images\/media\//);
  await prisma.user.delete({ where: { id: legacy.id } });
});

test("the original seed works on real D1 with private admin passwords", async () => {
  const users = await prisma.user.findMany();
  expect(users).toHaveLength(8);
  expect(new Set(users.map((user) => user.passwordHash)).size).toBe(8);
  expect(await prisma.product.count()).toBe(28);
  expect(await prisma.recipe.count()).toBe(12);
  expect(await prisma.workshop.count()).toBe(11);
  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "Daniel@Potitos.com" },
  });
  expect(await verifyPassword(adminPassword, admin.passwordHash)).toBe(true);
  expect(await verifyPassword("potitos2022", admin.passwordHash)).toBe(false);
  expect(await prisma.admin.count()).toBe(5);
  expect((await findUserByEmail(prisma, "daniel@potitos.com"))?.id).toBe(
    admin.id,
  );
});

test("catalog photo migration preserves custom photos and product data", async () => {
  const { products } = JSON.parse(
    await readFile("assets/seed-products/manifest.json", "utf8"),
  ) as {
    products: {
      plainName: string;
      imageURL: string;
      originalImageURL: string;
    }[];
  };
  const baseline = await prisma.product.findMany({
    orderBy: { plainName: "asc" },
    select: { id: true, plainName: true, stock: true },
  });
  await proxy.env.DB.batch(
    products.map((product) =>
      proxy.env.DB.prepare(
        'UPDATE "Product" SET "imageURL" = ? WHERE "plainName" = ?',
      ).bind(product.originalImageURL, product.plainName),
    ),
  );
  const custom = products[0]!;
  const customURL =
    "/api/images/admin/00000000-0000-4000-a000-000000000001.jpg";
  await prisma.product.update({
    where: { plainName: custom.plainName },
    data: { imageURL: customURL },
  });
  const sql = await readFile(
    "prisma/migrations/0005_seed_product_images.sql",
    "utf8",
  );
  await proxy.env.DB.batch(
    splitSqlQuery(sql).map((statement) => proxy.env.DB.prepare(statement)),
  );
  const updated = await prisma.product.findMany({
    orderBy: { plainName: "asc" },
  });
  expect(
    updated.map(({ id, plainName, stock }) => ({ id, plainName, stock })),
  ).toEqual(baseline);
  for (const product of products) {
    expect(
      updated.find((item) => item.plainName === product.plainName)?.imageURL,
    ).toBe(product === custom ? customURL : product.imageURL);
  }
  await prisma.product.update({
    where: { plainName: custom.plainName },
    data: { imageURL: custom.imageURL },
  });
});

test("recipe photo migration preserves custom photos and all other recipe fields", async () => {
  const { recipes } = JSON.parse(
    await readFile("assets/seed-recipes/manifest.json", "utf8"),
  ) as {
    recipes: { name: string; imageURL: string; originalImageURL: string }[];
  };
  const baseline = await prisma.recipe.findMany({ orderBy: { id: "asc" } });
  await proxy.env.DB.batch(
    recipes.map((recipe) =>
      proxy.env.DB.prepare(
        'UPDATE "Recipe" SET "imageURL" = ? WHERE "name" = ?',
      ).bind(recipe.originalImageURL, recipe.name),
    ),
  );
  const custom = recipes[0]!;
  const customURL =
    "/api/images/author/00000000-0000-4000-a000-000000000002.jpg";
  const customId = baseline.find((recipe) => recipe.name === custom.name)!.id;
  await prisma.recipe.update({
    where: { id: customId },
    data: { imageURL: customURL },
  });
  const sql = await readFile(
    "prisma/migrations/0006_seed_recipe_images.sql",
    "utf8",
  );
  await proxy.env.DB.batch(
    splitSqlQuery(sql).map((statement) => proxy.env.DB.prepare(statement)),
  );
  const updated = await prisma.recipe.findMany({ orderBy: { id: "asc" } });
  const withoutImages = (rows: typeof baseline) =>
    rows.map((recipe) =>
      Object.fromEntries(
        Object.entries(recipe).filter(([key]) => key !== "imageURL"),
      ),
    );
  expect(withoutImages(updated)).toEqual(withoutImages(baseline));
  for (const recipe of recipes) {
    expect(updated.find((item) => item.name === recipe.name)?.imageURL).toBe(
      recipe === custom ? customURL : recipe.imageURL,
    );
  }
  await prisma.recipe.update({
    where: { id: customId },
    data: { imageURL: custom.imageURL },
  });
});

test("public recipe responses do not expose passwords or email addresses", async () => {
  const recipes = await caller().recipe.getAllRecipes();
  const detail = await caller().recipe.getById({ id: recipes[0]!.id });
  expect(JSON.stringify([recipes, detail])).not.toMatch(
    /passwordHash|@Potitos|@worki/,
  );
  expect(detail.isFav).toBe(false);
});

test("visitors cannot list accounts, create products, delete recipes or read profiles", async () => {
  await expect(caller().user.getAllUsers()).rejects.toMatchObject({
    code: "UNAUTHORIZED",
  });
  const recipe = await prisma.recipe.findFirstOrThrow();
  await expect(
    caller().recipe.delete({ recipeId: recipe.id }),
  ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  await expect(caller().user.client.getById()).rejects.toMatchObject({
    code: "UNAUTHORIZED",
  });
  const product = await prisma.product.findFirstOrThrow({
    include: { NonEdible: true },
    where: { NonEdible: { isNot: null } },
  });
  await expect(
    caller().product.createNewProduct({
      ...product,
      stock: 1,
      NonEdible: product.NonEdible,
    }),
  ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
});

test("clients cannot delete somebody else's recipe or read another profile", async () => {
  const sandra = await prisma.user.findUniqueOrThrow({
    where: { email: "Sandra@Potitos.com" },
  });
  const recipe = await prisma.recipe.findFirstOrThrow({
    where: { userId: { not: sandra.id } },
  });
  await expect(
    caller(sandra.id).recipe.delete({ recipeId: recipe.id }),
  ).rejects.toMatchObject({ code: "FORBIDDEN" });
  await expect(
    caller(sandra.id).user.client.getById({ id: recipe.userId }),
  ).rejects.toMatchObject({ code: "FORBIDDEN" });
  await expect(
    caller(sandra.id).cart.addProduct({ productId: "any", amount: -1 }),
  ).rejects.toMatchObject({ code: "BAD_REQUEST" });
});

test("changing one client's allergens leaves other clients unchanged", async () => {
  const a = await prisma.user.create({
    data: {
      name: "Allergen A",
      email: "allergen-a@example.com",
      Client: { create: { cart: { create: {} } } },
    },
  });
  const b = await prisma.user.create({
    data: {
      name: "Allergen B",
      email: "allergen-b@example.com",
      Client: { create: { cart: { create: {} } } },
    },
  });
  await prisma.allergenClient.createMany({
    data: [
      { clientId: a.id, allergen: "milk" },
      { clientId: b.id, allergen: "milk" },
    ],
  });
  await caller(a.id).user.client.updateAllergen({ allergen: [] });
  expect(await prisma.allergenClient.count({ where: { clientId: a.id } })).toBe(
    0,
  );
  expect(
    await prisma.allergenClient.findMany({ where: { clientId: b.id } }),
  ).toMatchObject([{ allergen: "milk" }]);
});

test("registration stores a hash and cannot choose an administrator role", async () => {
  await caller().user.client.createNew({
    username: "Nuevo",
    email: "new@example.com",
    password: "Password2026",
  });
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: "new@example.com" },
  });
  expect(user.role).toBe("client");
  expect(await verifyPassword("Password2026", user.passwordHash)).toBe(true);
  expect(user.passwordHash).not.toBe("Password2026");
});

test("checkout uses cart prices, decrements stock atomically and is idempotent", async () => {
  const client = await prisma.user.create({
    data: {
      name: "Checkout",
      email: "checkout@example.com",
      Client: { create: { cart: { create: {} } } },
    },
    include: { Client: true },
  });
  const product = await prisma.product.create({
    data: {
      name: "checkout test",
      plainName: "checkout test",
      description: "test",
      imageURL: "/api/images/seed/00000000-0000-4000-a000-000000000004.jpg",
      ProductUnit: "unit",
      stock: 5,
      NonEdible: { create: { category: "home", price: 2.5 } },
    },
  });
  await prisma.cartProduct.create({
    data: { cartId: client.Client!.cartId, productId: product.id, amount: 2 },
  });
  const preview = await caller(client.id).cart.getAllCartProduct();
  const requestId = crypto.randomUUID();
  const order = await createDemoOrder(
    proxy.env.DB,
    prisma,
    client.id,
    "Recogida en Tienda",
    requestId,
  );
  expect(order.price).toBe(preview.totalPrice + " €");
  expect(
    await createDemoOrder(
      proxy.env.DB,
      prisma,
      client.id,
      "Recogida en Tienda",
      requestId,
    ),
  ).toEqual(order);
  expect(
    (await prisma.product.findUniqueOrThrow({ where: { id: product.id } }))
      .stock,
  ).toBe(3);
  expect(
    await prisma.cartProduct.count({
      where: { cartId: client.Client!.cartId },
    }),
  ).toBe(0);
});

test("gram and milliliter purchases use kilogram and liter stock", async () => {
  const client = await prisma.user.create({
    data: {
      name: "Units",
      email: "units@example.com",
      Client: { create: { cart: { create: {} } } },
    },
    include: { Client: true },
  });
  const template = await prisma.product.findFirstOrThrow({
    where: { name: "copos de avena" },
    include: { Edible: { include: { nutritionFacts: true } } },
  });
  for (const unit of ["grams", "milliliters"] as const) {
    const product = await caller(
      (await prisma.admin.findFirstOrThrow()).userId,
      "admin",
    ).product.createNewProduct({
      name: "Test " + unit,
      description: "test",
      imageURL: template.imageURL,
      stock: 1,
      ProductUnit: unit,
      NonEdible: null,
      Edible: {
        ...template.Edible!,
        nutritionFacts: template.Edible!.nutritionFacts,
        allergens: [],
      },
    });
    await caller(client.id).cart.addProduct({
      productId: product.product.id,
      amount: 250,
    });
    await expect(
      caller(client.id).cart.addProduct({
        productId: product.product.id,
        amount: 1000,
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await createDemoOrder(
      proxy.env.DB,
      prisma,
      client.id,
      "Recogida en Tienda",
      crypto.randomUUID(),
    );
    expect(
      (
        await prisma.product.findUniqueOrThrow({
          where: { id: product.product.id },
        })
      ).stock,
    ).toBe(0.75);
  }
});

test("a failed D1 batch rolls back both the order and the cart", async () => {
  const client = await prisma.user.create({
    data: {
      name: "Rollback",
      email: "rollback@example.com",
      Client: { create: { cart: { create: {} } } },
    },
    include: { Client: true },
  });
  const product = await prisma.product.findFirstOrThrow({
    where: { name: "checkout test" },
  });
  await prisma.cartProduct.create({
    data: { cartId: client.Client!.cartId, productId: product.id, amount: 1 },
  });
  // Simulate stock changing after Prisma reads the cart but before the atomic batch.
  const db = {
    prepare: proxy.env.DB.prepare.bind(proxy.env.DB),
    async batch(statements: Parameters<typeof proxy.env.DB.batch>[0]) {
      await proxy.env.DB.prepare("UPDATE Product SET stock = 0 WHERE id = ?")
        .bind(product.id)
        .run();
      return proxy.env.DB.batch(statements);
    },
  } as typeof proxy.env.DB;
  const requestId = crypto.randomUUID();
  await expect(
    createDemoOrder(db, prisma, client.id, "Recogida en Tienda", requestId),
  ).rejects.toMatchObject({ code: "CONFLICT" });
  expect(
    await prisma.order.findUnique({ where: { id: requestId } }),
  ).toBeNull();
  expect(
    await prisma.cartProduct.count({
      where: { cartId: client.Client!.cartId },
    }),
  ).toBe(1);
  expect(
    (await prisma.product.findUniqueOrThrow({ where: { id: product.id } }))
      .stock,
  ).toBe(0);
});
