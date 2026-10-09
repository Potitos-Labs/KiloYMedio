import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page.getByRole("button", { name: "legumbre y arroces" }).click();

  await expect(page).toHaveURL("/product");

  await page.locator('span:has-text("Legumbres")').click();

  await page.getByText("aceite de oliva virgen extra").click();

  await page.getByText("Legumbres").click();

  await page.getByText("garbanzos").click();

  await page.getByText("lentejas").click();

  await page.getByLabel("Frutos secos").check();

  await page.getByText("almendras").click();

  await page.getByText("lentejas").click();

  await page.getByLabel("Cuidado personal").check();

  await page.getByText("jabón").click();
});
