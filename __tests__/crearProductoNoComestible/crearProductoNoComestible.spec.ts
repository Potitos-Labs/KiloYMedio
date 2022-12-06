import { test, expect } from "@playwright/test";
import { getClientTrpcMock } from "@utils/trpcMock";

test("Crear producto no comestible", async ({ page }) => {
  test.slow();
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Contrasena12");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("button", { name: "crear producto" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product/create");

  await page.getByRole("tab", { name: "No comestible" }).click();

  await page.getByPlaceholder("Nombre del producto").click();

  await page.getByPlaceholder("Nombre del producto").fill("Detergente solido");

  await page.getByPlaceholder("Descripción").click();

  await page
    .getByPlaceholder("Descripción")
    .fill("Detergente solido ecológico para lavar ropa");

  await page.getByPlaceholder("Precio/U").click();

  await page.getByPlaceholder("Precio/U").fill("10");

  await page.getByPlaceholder("Stock(U)").click();

  await page.getByPlaceholder("Stock(U)").fill("200");

  await page.getByRole("button", { name: "Ninguno" }).click();

  await page.getByText("Accesorios").click();

  await page.getByRole("button", { name: "unit" }).click();

  await page.getByRole("option", { name: "grams" }).getByText("grams").click();

  await page.getByText("kilograms").click();

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .setInputFiles("__tests__/crearProductoNoComestible/upload/file.jpg");

  await page.waitForTimeout(3000);

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page.waitForTimeout(2000);

  await page.goto("http://localhost:3000/product");

  await page.getByText("Detergente solido").click();

  await expect(page.locator("id=Tittle")).toHaveText("Detergente solido");

  await expect(page.locator("id=Description")).toHaveText(
    "Detergente solido ecológico para lavar ropa",
  );

  await expect(page.locator("id=Price")).toHaveText("10€/Kg");

  const trpcClient = await getClientTrpcMock("admin");
  const p = await trpcClient.product.getFilteredProducts({
    name: "Detergente solido",
    allergens: [],
    eCategories: [],
    neCategories: [],
  });
  if (p[0]?.id) await trpcClient.product.delete({ productId: p[0].id });
});
