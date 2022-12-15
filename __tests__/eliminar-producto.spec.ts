import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByPlaceholder("E-mail").press("Tab");

  await page
    .locator(
      'form:has-text("¿Olvidaste tu contraseña?Iniciar sesiónIniciar sesión con Google") input[type="checkbox"]',
    )
    .press("Tab");

  await page.getByPlaceholder("Contraseña").fill("123");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("123qwe123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");

  await page.locator('a:has-text("tienda")').first().click();

  await page.getByRole("button", { name: "VER TODO" }).click();
  await expect(page).toHaveURL("/product");

  await page.getByRole("button", { name: "0.57 € añadir" }).click();

  await page.getByRole("link", { name: "cesta" }).click();
  await expect(page).toHaveURL("/cart");

  await page.getByText("4.10 €").nth(2);
  await page
    .getByRole("button", { name: "Eliminar del carrito" })
    .first()
    .click();
  await page.getByText("3.52 €").nth(2);
});
