import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "recetas" }).click();
  await expect(page).toHaveURL("/recipe");

  await page.getByRole("link", { name: "ver receta completa" }).first().click();

  await page.getByPlaceholder("tu opinión").click();

  await page
    .getByPlaceholder("tu opinión")
    .fill("Este es mi comentario sin registrar");

  await page.getByRole("button", { name: "enviar" }).click();

  await expect(
    page.getByText("¡Necesita iniciar sesión para poner un comentario!"),
  ).toHaveText("¡Necesita iniciar sesión para poner un comentario!");
});
