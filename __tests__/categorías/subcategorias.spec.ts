import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page.getByRole("link", { name: "Harinas" }).click();
  await expect(page).toHaveURL("/product");

  await page.getByText("harina de almendra").click();
});
