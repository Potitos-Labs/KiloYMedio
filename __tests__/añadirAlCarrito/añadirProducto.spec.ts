import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Sandra@Potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("contraseña123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "explorar tienda" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByText("quicos").click();

  await page.getByRole("button", { name: "0.83 € añadir" }).nth(3).click();

  await page.getByRole("link", { name: "cesta" }).click();
  await expect(page).toHaveURL("http://localhost:3000/cart");

  await page.getByText("quicos").first().click();
});
