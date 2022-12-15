import { test, expect } from "@playwright/test";
import { getClientTrpcMock } from "@utils/trpcMock";

test("createOnSiteWorkshop", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "iniciar sesión" }).first().click();
  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("alicia@potitos.com");

  await page.getByPlaceholder("Contraseña").click();

  await page.getByPlaceholder("Contraseña").fill("asdf123");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: "crear taller" }).click();
  await expect(page).toHaveURL("/workshops/create");

  await page.getByRole("tab", { name: "Presencial" }).click();

  await page.getByPlaceholder("Nombre del producto").click();

  await page.getByPlaceholder("Nombre del producto").fill("Masa flexible");

  await page.getByPlaceholder("Descripción").click();

  await page
    .getByPlaceholder("Descripción")
    .fill("Crear bisutería con masa flexible");

  await page.getByPlaceholder("Plazas").click();

  await page.getByPlaceholder("Plazas").fill("15");

  await page.getByPlaceholder("dia").fill("2022-12-15");

  await page
    .getByLabel(
      "Imagen *Sube una imagen .png o .jpg (max 1MB).Tamaño de imagen: 0   MB",
    )
    .setInputFiles("__tests__/talleres/upload/jewelry.jpg");

  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Crear taller" }).click();

  await expect(page).toHaveURL("/");

  await page.getByRole("link", { name: "talleres" }).click();
  await expect(page).toHaveURL("/workshops");

  await page.getByRole("button", { name: "VER MÁS" }).click();

  await page.getByRole("heading", { name: "Masa flexible" }).click();

  const trpcClient = await getClientTrpcMock("admin");
  await trpcClient.workshop.delete({ name: "Masa flexible" });
});
