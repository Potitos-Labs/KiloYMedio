import { test, expect } from "@playwright/test";
import { slowLocator } from "../utils/slowMo";

test("test", async ({ page }) => {
  page.locator = slowLocator(page, 500);

  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("Sandra@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Contraseña_123");

  await page.locator("svg").first().click();

  await page.getByPlaceholder("Contraseña").click();

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
});
