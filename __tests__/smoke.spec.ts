import { expect, test } from "@playwright/test";

test.describe("Demo actual", () => {
  test("el catálogo, las recetas y los talleres conservan el seed", async ({
    page,
  }) => {
    await page.goto("/product");
    await expect(
      page.getByRole("link", { name: /arroz integral/i }),
    ).toBeVisible();
    await page.getByPlaceholder("Buscar productos").fill("arroz integral");
    await page.getByPlaceholder("Buscar productos").press("Enter");
    await expect(
      page.getByRole("link", { name: /arroz integral/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /cepillo de dientes/i }),
    ).toHaveCount(0);
    await page.getByRole("link", { name: /arroz integral/i }).click();
    await expect(page).toHaveURL(/\/product\/[^/?]+$/);
    await expect(
      page.getByText("arroz 100% integral", { exact: true }),
    ).toBeVisible();
    await page.goto("/recipe");
    await expect(page.locator('a[href^="/recipe/"]').first()).toBeVisible();
    await page.goto("/workshops");
    await expect(page.locator("main")).toContainText(/repostería|cocina/i);
  });

  test("el acceso usa credenciales y rechaza una contraseña incorrecta", async ({
    page,
  }) => {
    await page.goto("/login");
    await expect(page.getByText(/Google/i)).toHaveCount(0);
    await page.getByPlaceholder("E-mail").fill("Sandra@Potitos.com");
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill("Incorrecta2026");
    await page
      .getByRole("button", { name: "Iniciar sesión", exact: true })
      .click();
    await expect(page.getByText("Email y/o contraseña inválido")).toBeVisible();
  });

  test("un visitante no puede subir imágenes", async ({ request, baseURL }) => {
    const response = await request.post("/api/images", {
      headers: { Origin: baseURL!, "Content-Type": "image/png" },
      data: Buffer.from("not an image"),
    });
    expect(response.status()).toBe(401);
  });

  test("un cliente se registra, sube una imagen a R2 y completa una compra demo", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/register");
    await page.getByPlaceholder("Nombre", { exact: true }).fill("Cliente Demo");
    await page
      .getByPlaceholder("E-mail")
      .fill(`demo-${crypto.randomUUID()}@example.com`);
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill("DemoPassword2026");
    await page.getByPlaceholder("Repetir contraseña").fill("DemoPassword2026");
    await page
      .getByRole("button", { name: "Crear cuenta", exact: true })
      .click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("link", { name: "perfil", exact: true }),
    ).toBeVisible();
    const session = await (await page.request.get("/api/auth/session")).json();
    expect(session.user.role).toBe("client");
    expect(session.user).not.toHaveProperty("passwordHash");
    await page.goto("/profile/edit");
    await expect(page.locator('input[name="name"]')).toHaveValue(
      "Cliente Demo",
    );
    await expect(page.locator('input[name="email"]')).toHaveValue(
      session.user.email,
    );
    await page.goto("/upload");
    const uploaded = page.waitForResponse(
      (r) => r.url().endsWith("/api/images") && r.request().method() === "POST",
    );
    await page.locator('input[type="file"]').setInputFiles({
      name: "demo.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=",
        "base64",
      ),
    });
    const image = await uploaded;
    expect(image.status()).toBe(201);
    const { url } = await image.json();
    const storedImage = await page.request.get(url);
    expect(storedImage.status()).toBe(200);
    expect(storedImage.headers()["content-type"]).toBe("image/png");
    await page.goto("/product");
    await page.getByRole("link", { name: /arroz integral/i }).click();
    await expect(page).toHaveURL(/\/product\/[^/?]+$/);
    await expect(
      page.getByText("arroz 100% integral", { exact: true }),
    ).toBeVisible();
    await page.getByText("añadir", { exact: true }).click();
    await expect(
      page.getByText("Producto añadido", { exact: true }),
    ).toBeVisible();
    await page.goto("/cart");
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: "arroz integral", exact: true }),
    ).toBeVisible();
    await page.goto("/checkout");
    await page.getByPlaceholder("Nombre", { exact: true }).fill("Cliente");
    await page.getByPlaceholder("Apellidos").fill("Demo");
    await page.getByText("Recogida en tienda", { exact: true }).click();
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(page.getByText(/Pago de demostración/)).toBeVisible();
    await page.getByPlaceholder("XXXX XXXX XXXX XXXX").fill("4242424242424242");
    await page.getByPlaceholder("Titular de la tarjeta").fill("Cliente Demo");
    await page.getByPlaceholder("Código de seguridad").fill("123");
    await page.getByPlaceholder("MM/YY").fill("12/99");
    await page
      .getByPlaceholder("Dirección", { exact: true })
      .fill("Calle Demo 1");
    const orderResponse = page.waitForResponse(
      (r) =>
        r.url().includes("checkout.createNewOrder") &&
        r.request().method() === "POST",
    );
    await page
      .getByRole("button", { name: "Finalizar compra", exact: true })
      .click();
    const order = await orderResponse;
    expect(order.status()).toBe(200);
    expect(order.request().postData()).not.toMatch(/4242|CVV|creditCard/);
    await expect(
      page.getByRole("heading", { name: "¡Compra completada!" }),
    ).toBeVisible({ timeout: 10_000 });
    await page.goto("/cart");
    await expect(
      page.getByText(/Todavía no tienes ningún producto/),
    ).toBeVisible();
  });

  test("el administrador puede acceder con su contraseña privada", async ({
    page,
  }) => {
    test.skip(
      !process.env.SEED_ADMIN_PASSWORD,
      "Configura la contraseña privada usada en el seed local.",
    );
    await page.goto("/login");
    await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill(process.env.SEED_ADMIN_PASSWORD!);
    await page
      .getByRole("button", { name: "Iniciar sesión", exact: true })
      .click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("button", { name: "crear producto", exact: true }),
    ).toBeVisible();
    const session = await (await page.request.get("/api/auth/session")).json();
    expect(session.user.role).toBe("admin");
    await page.goto("/product/create");
    await expect(page.getByText(/comestible/i).first()).toBeVisible();
  });
});
