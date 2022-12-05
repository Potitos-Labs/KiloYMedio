import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Sandra@Potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("contraseña123");

  await page.getByPlaceholder("Contraseña").press("Enter");
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "explorar tienda" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByRole("button", { name: "0.57 € añadir" }).click();

  await page.getByText("aceite de oliva virgen extra").first().click();

  await page.getByRole("link", { name: "Ver cesta" }).click();
  await expect(page).toHaveURL("http://localhost:3000/cart");

  await page.getByText("aceite de oliva virgen extra").nth(1).click();

  await page.getByRole("link", { name: "recetas" }).click();
  await expect(page).toHaveURL("http://localhost:3000/recipe");

  await page.getByRole("link", { name: "ver receta completa" }).first().click();
  await expect(page).toHaveURL(
    "http://localhost:3000/recipe/clbb1fm930086wzy8fghybkxu",
  );

  await page.getByRole("button", { name: "0.53 € añadir" }).click();

  await page.getByText("harina de trigo").first().click();

  await page.getByRole("link", { name: "Ver cesta" }).click();
  await expect(page).toHaveURL("http://localhost:3000/cart");

  await page.getByText("harina de trigo").nth(1).click();
});
