import { test, expect } from "@playwright/test";

test("Producto repetido", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Constrasena1234");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("button", { name: "crear producto" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product/create");

  await page.getByRole("tab", { name: "No comestible" }).click();

  await page.getByPlaceholder("Nombre del producto").click();

  await page.getByPlaceholder("Nombre del producto").fill("Cepillo de dientes");

  await page.getByPlaceholder("Descripción").click();

  await page.getByPlaceholder("Descripción").fill("nombre repetido");

  await page.getByPlaceholder("Precio/U").click();

  await page.getByPlaceholder("Precio/U").fill("20");

  await page.getByRole("button", { name: "unit" }).click();

  await page.getByRole("option", { name: "kilograms" }).click();

  await page.getByPlaceholder("Stock(Kg)").click();

  await page.getByPlaceholder("Stock(Kg)").fill("20");

  await page.getByRole("button", { name: "Ninguno" }).click();

  await page.getByText("Productos de limpieza").click();

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .setInputFiles("__tests__/crearProductoNoComestible/upload/file.jpg");

  await page.waitForTimeout(3000);

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page.getByText("Este producto ya existe").click();
});
