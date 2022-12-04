import { test, expect } from "@playwright/test";
import { getClientTrpcMock } from "../src/utils/trpcMock";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Panchito Mandefua");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("panchito@mandefua.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.locator("svg").first().click();

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.locator("svg").nth(2).click();

  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.locator("svg").click();
  await expect(page).toHaveURL("http://localhost:3000/profile");

  const trpcClient = await getClientTrpcMock("admin");
  trpcClient.user.delete({ clientEmail: "panchito@mandefua.com" });
});
