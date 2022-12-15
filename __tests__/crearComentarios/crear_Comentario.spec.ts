import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder("E-mail").click();
  await page.getByPlaceholder("E-mail").fill("Sandra@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Contrasena1234");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("link", { name: "recetas" }).click();
  await expect(page).toHaveURL("/recipe");

  await page.getByRole("link", { name: "ver receta completa" }).nth(2).click();

  await page.getByPlaceholder("tu opinión").click();

  await page.getByPlaceholder("tu opinión").fill("Me ha encantado!");

  await expect(page.locator("text=Me ha encantado!")).toHaveText(
    "Me ha encantado!",
  );

  await page.getByRole("button", { name: "enviar" }).click();

  await page.locator('input[name="rating-10"]').first().check();

  await page.getByPlaceholder("tu opinión").click();
  await page.getByPlaceholder("tu opinión").fill("No me ha gustado nada!");

  await expect(page.locator("text=No me ha gustado nada!")).toHaveText(
    "No me ha gustado nada!",
  );

  await page.getByRole("button", { name: "enviar" }).click();

  await expect(page.locator("id=average")).toHaveText("" + 6 / 2);
});
