import { test, expect } from "@playwright/test";
test("test", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "INICIAR SESIÓN" }).click();
  await expect(page).toHaveURL("/login");
  await page.getByPlaceholder("Correo electrónico").click();
  await page.getByPlaceholder("Correo electrónico").fill("Daniel@potitos.com");
  await page.getByPlaceholder("Correo electrónico").press("Tab");
  await page.getByPlaceholder("Contraseña").fill("123qwe!");
  await page.getByPlaceholder("Contraseña").press("Enter");
  await expect(page).toHaveURL("/");
  await page.hover("text=Productos");
  await page.getByRole("link", { name: "Ver productos" }).click();
  await expect(page).toHaveURL("/product");
  await page.getByLabel("Aceites").check();
});
