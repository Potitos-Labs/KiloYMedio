import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("caramelos");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await page.getByPlaceholder("E-mail").fill("daniel@gmail.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("COnraseña_123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByText("Email y/o contraseña inválido").click();

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("caramelos_123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
});
