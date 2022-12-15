import { test, expect } from "@playwright/test";

test("errorPasswordMatch", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.locator("svg").first().click();

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd1234567");

  await page.locator("svg").nth(2).click();

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page.getByText("Las contraseñas no coinciden")).toHaveCount(1);
});
