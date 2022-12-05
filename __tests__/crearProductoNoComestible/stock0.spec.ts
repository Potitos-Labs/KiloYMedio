import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page
    .locator('nav:has-text("tiendasalud y bienestarrecetastalleres")')
    .getByRole("link", { name: "salud y bienestar" })
    .click();
  await expect(page).toHaveURL("http://localhost:3000/recipe");

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
  await page.getByPlaceholder("Nombre del producto").fill("Stock negativo");

  await page.getByPlaceholder("Descripción").click();

  await page.getByPlaceholder("Descripción").fill("stock negativo");

  await page.getByPlaceholder("Precio/U").click();

  await page.getByPlaceholder("Precio/U").fill("2");

  await page.getByPlaceholder("Stock(U)").click();

  await page.getByPlaceholder("Stock(U)").fill("0");

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .click();

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .setInputFiles("unnamed.jpg");

  await page.getByRole("button", { name: "Ninguno" }).click();

  await page.getByText("Productos de limpieza").click();

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page.getByText("Stock debe ser mayor a 0").click();
});
