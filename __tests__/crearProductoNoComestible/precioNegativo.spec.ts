import { test, expect } from "@playwright/test";

test("Precio negativo", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();
  await page.getByPlaceholder("Contraseña").fill("Contrasena12");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: "crear producto" }).click();
  await expect(page).toHaveURL("/product/create");

  await page.getByRole("tab", { name: "No comestible" }).click();

  await page.getByPlaceholder("Nombre del producto").click();

  await page.getByPlaceholder("Nombre del producto").fill("Precio negativo");

  await page.getByPlaceholder("Descripción").click();

  await page.getByPlaceholder("Descripción").fill("Prueba de precio negativo");

  await page.getByPlaceholder("Precio/U").click();

  await page.getByPlaceholder("Precio/U").fill("-20");

  await page.getByPlaceholder("Stock(U)").click();

  await page.getByPlaceholder("Stock(U)").fill("200");

  await page.getByRole("button", { name: "Ninguno" }).click();

  await page.getByRole("option", { name: "Productos de limpieza" }).click();

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .click();

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .setInputFiles("__tests__/crearProductoNoComestible/upload/file.jpg");

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page.getByText("Precio debe ser mayor a 0").click();
});
