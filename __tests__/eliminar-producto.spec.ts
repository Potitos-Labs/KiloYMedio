import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "INICIAR SESIÓN" }).click();

  await expect(page).toHaveURL("/login");
  await page.getByPlaceholder("Correo electrónico").click();

  await page.getByPlaceholder("Correo electrónico").fill("sandra@potitos.com");

  await page.getByPlaceholder("Correo electrónico").press("Tab");

  await page.getByPlaceholder("Contraseña").fill("123qwe123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");

  await page.hover("text=Productos");
  await page.getByRole("link", { name: "Todos los productos" }).click();
  await expect(page).toHaveURL("/product");

  await page.locator(".relative > div:nth-child(3) > .w-full").first().click();

  await page.locator("div:nth-child(2) > div:nth-child(3) > .w-full").click();

  await page.goto("/cart");
  await page
    .getByRole("button", { name: "Eliminar del carrito" })
    .nth(1)
    .click();
});
