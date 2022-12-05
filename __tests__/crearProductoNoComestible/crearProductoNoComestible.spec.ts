import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("daniel@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").press("CapsLock");

  await page.getByPlaceholder("Contraseña").fill("G");

  await page.getByPlaceholder("Contraseña").press("CapsLock");

  await page.getByPlaceholder("Contraseña").fill("");

  await page.getByPlaceholder("Contraseña").press("CapsLock");

  await page.getByPlaceholder("Contraseña").fill("C");

  await page.getByPlaceholder("Contraseña").press("CapsLock");

  await page.getByPlaceholder("Contraseña").fill("Contrasena12");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByRole("button", { name: "crear producto" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product/create");

  await page.getByRole("tab", { name: "No comestible" }).click();

  await page.getByPlaceholder("Nombre del producto").click();

  await page.getByPlaceholder("Nombre del producto").fill("Mapachito adorable");

  await page.getByPlaceholder("Descripción").click();

  await page
    .getByPlaceholder("Descripción")
    .fill("Este es un adorable mapache");

  await page.getByPlaceholder("Precio/U").click();

  await page.getByPlaceholder("Precio/U").fill("10");

  await page.getByPlaceholder("Stock(U)").click();

  await page.getByPlaceholder("Stock(U)").fill("200");

  await page.getByRole("button", { name: "Ninguno" }).click();

  await page.getByText("Accesorios").click();

  await page.getByRole("button", { name: "unit" }).click();

  await page.getByRole("option", { name: "grams" }).getByText("grams").click();

  await page.getByText("kilograms").click();

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .setInputFiles("unnamed.jpg");

  await new Promise((r) => setTimeout(r, 3000));

  await page.getByRole("button", { name: "Crear producto" }).click();

  await page.goto("http://localhost:3000/product");

  await page.getByText("Mapachito adorable").click();

  await expect(page.locator("id=Tittle")).toHaveText("Mapachito	adorable");

  await expect(page.locator("id=Description")).toHaveText(
    "Este es un adorable mapache",
  );

  await expect(page.locator("id=Price")).toHaveText("10€/Kg");
});
