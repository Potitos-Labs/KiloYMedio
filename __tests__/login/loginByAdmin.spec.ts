import { test, expect } from "@playwright/test";
import { slowLocator } from "../utils/slowMo";

test("test", async ({ page }) => {
  page.locator = slowLocator(page, 500);

  await page.goto("http://localhost:3000");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Daniel@potitos.com");

  await page.getByPlaceholder("E-mail").press("Tab");

  await page
    .locator(
      'form:has-text("¿Olvidaste tu contraseña?Iniciar sesiónIniciar sesión con Google") input[type="checkbox"]',
    )
    .press("Tab");

  await page.getByPlaceholder("Contraseña").fill("Caremelos_123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByText("(Admin)").click();
});
