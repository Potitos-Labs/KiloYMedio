import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page.getByRole("link", { name: "Harinas" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByText("harina de almendra").click();
});
