import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Sandra@Potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("minifluzizogood123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "cesta" }).click();
  await expect(page).toHaveURL("http://localhost:3000/cart");

  await page.getByText("cepillo de dientes").nth(1).click();

  await page.locator('p:has-text("1 u")').click();

  await page.getByText("3.50 €").nth(1).click();

  await page.getByText("cepillo de dientes").nth(2).click();

  await page.getByText("1 u").nth(2).click();

  await page.getByText("3.50 €").nth(2).click();
});
