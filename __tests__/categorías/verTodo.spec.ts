import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page.getByRole("button", { name: "VER TODO" }).click();

  await expect(page).toHaveURL("/product");

  await page.getByText("aceite de oliva virgen extra").click();

  await page.getByText("almendras").click();

  await page.getByText("cepillo de dientes").click();
});
