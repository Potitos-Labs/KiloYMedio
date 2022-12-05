import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();
  await page.getByPlaceholder("E-mail").fill("Sandra@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Contrasena1234");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("link", { name: "recetas" }).click();
  await expect(page).toHaveURL("http://localhost:3000/recipe");

  await page.getByRole("link", { name: "ver receta completa" }).nth(2).click();
  await expect(page).toHaveURL(
    "http://localhost:3000/recipe/clbaz173h008dtt4c48rz6jnc",
  );

  await page.getByPlaceholder("tu opinión").click();

  await page
    .getByPlaceholder("tu opinión")
    .fill("Como me gusta a mi el porte navero!!! Vivan las navas oleeee");

  await expect(
    page.locator(
      "text=Como me gusta a mi el porte navero!!! Vivan las navas oleeee",
    ),
  ).toHaveText("Como me gusta a mi el porte navero!!! Vivan las navas oleeee");

  await page.getByRole("button", { name: "enviar" }).click();

  await page.locator('input[name="rating-10"]').first().check();

  await page.getByPlaceholder("tu opinión").click();
  await page
    .getByPlaceholder("tu opinión")
    .fill("Que se fastidien los naveros");

  await expect(page.locator("text=Que se fastidien los naveros")).toHaveText(
    "Que se fastidien los naveros",
  );

  await page.getByRole("button", { name: "enviar" }).click();

  await expect(page.locator("id=average")).toHaveText("" + 6 / 2);
});
