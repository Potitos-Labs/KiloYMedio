import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("Contraeña_123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByText("tienda").first().click();

  await page.getByRole("button", { name: "VER TODO" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.locator('[id="headlessui-menu-button-\\:r9\\:"]').click();

  await page.getByRole("menuitem", { name: "Eliminar" }).click();

  await page.getByRole("button", { name: "Cancelar" }).click();

  await page.locator('[id="headlessui-menu-button-\\:r9\\:"]').click();

  await page.getByRole("menuitem", { name: "Eliminar" }).click();

  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");
});
