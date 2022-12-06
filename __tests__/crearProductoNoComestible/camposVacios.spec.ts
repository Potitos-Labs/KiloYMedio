import { test, expect } from "@playwright/test";

test("Campos vacíos", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Constrasena123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: "crear producto" }).click();
  await expect(page).toHaveURL("/product/create");

  await page.getByRole("tab", { name: "No comestible" }).click();

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page
    .locator('label:has-text("Nombre *El campo no puede estar vacío")')
    .getByRole("paragraph")
    .click();

  await page
    .locator('label:has-text("Descripción *El campo no puede estar vacío")')
    .getByRole("paragraph")
    .click();

  await page
    .locator('label:has-text("Precio *Introduce un número")')
    .getByRole("paragraph")
    .click();

  await page
    .locator('label:has-text("Stock *Introduce un número")')
    .getByRole("paragraph")
    .click();

  await page.getByText("Required").click();
});
