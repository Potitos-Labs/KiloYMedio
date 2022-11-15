import { test, expect } from "@playwright/test";
test("test", async ({ page }) => {
  await page.goto("https://sprint2-kilo-y-medio.vercel.app/");
  await page.getByRole("link", { name: "INICIAR SESIÓN" }).click();
  await expect(page).toHaveURL("https://sprint2-kilo-y-medio.vercel.app/login");
  await page.getByPlaceholder("Correo electrónico").click();
  await page.getByPlaceholder("Correo electrónico").fill("Daniel@potitos.com");
  await page.getByPlaceholder("Correo electrónico").press("Tab");
  await page.getByPlaceholder("Contraseña").fill("123qwe!");
  await page.getByPlaceholder("Contraseña").press("Enter");
  await expect(page).toHaveURL("https://sprint2-kilo-y-medio.vercel.app/");
  await page.hover("text=Productos");
  await page.getByRole("link", { name: "Ver productos" }).click();
  await expect(page).toHaveURL(
    "https://sprint2-kilo-y-medio.vercel.app/product",
  );
  await page.getByLabel("Aceites").check();
});
