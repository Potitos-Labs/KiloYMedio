import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();
  await page.getByPlaceholder("E-mail").fill("Pilar@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Contrasena1234");

  await page.getByPlaceholder("Contraseña").press("Enter");
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("button", { name: "crear producto" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product/create");

  await page.getByRole("tab", { name: "No comestible" }).click();

  await page.getByPlaceholder("Nombre del producto").click();

  await page.getByPlaceholder("Nombre del producto").fill("Cepillo");

  await page.getByPlaceholder("Descripción").click();

  await page.getByPlaceholder("Descripción").fill("ESto es un cepillo");

  await page.getByPlaceholder("Precio/U").click();

  await page.getByPlaceholder("Precio/U").fill("3.10");

  await page.getByRole("button", { name: "unit" }).click();

  await page.getByRole("option", { name: "unit" }).getByText("unit").click();

  await page.getByPlaceholder("Stock(U)").click();

  await page.getByPlaceholder("Stock(U)").fill("20");

  await page.getByRole("button", { name: "Ninguno" }).click();

  await page.getByRole("option", { name: "Cuidado personal" }).click();

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

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page.getByText("tienda").first().click();

  await page.getByRole("button", { name: "VER TODO" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByText("Cepillo").first().click();
  //await expect(page).toHaveURL( "http://localhost:3000/product/clb820qa2000ittmwotmt7jqa",º);
});
