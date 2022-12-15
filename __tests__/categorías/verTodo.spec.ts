import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page.getByRole("button", { name: "VER TODO" }).click();

  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByText("aceite de oliva virgen extra").click();

  await page.getByText("almendras").click();

  await page.getByText("cepillo de dientes").click();
});
