import { test, expect } from "@playwright/test";

test("errorPassword", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(
    page.getByText(
      "La contraseña debe tener como mínimo una longitud de 6, una minúscula y un número",
    ),
  ).toHaveCount(1);
});
