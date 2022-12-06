import { test, expect } from "@playwright/test";

test("errorNameNumber", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra2");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(
    page.getByText("Este campo no puede contener números"),
  ).toHaveCount(1);
});
