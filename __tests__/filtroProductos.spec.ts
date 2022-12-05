import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page.getByRole("button", { name: "VER TODO" }).click();
  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByText("Pastas").click();
  await page.waitForTimeout(400);
  await expect(page.getByText("macarrones")).toHaveCount(1);
  await expect(page.getByText("espaguetis")).toHaveCount(1);
  await expect(page.getByText("harina de trigo")).toHaveCount(0);

  await page.getByText("Harinas").click();
  await page.waitForTimeout(400);
  await expect(page.getByText("harina de trigo")).toHaveCount(1);
  await expect(page.getByText("harina de maíz")).toHaveCount(1);

  await page.getByText("Gluten").click();
  await page.waitForTimeout(400);
  await expect(page.getByText("macarrones")).toHaveCount(0);
  await expect(page.getByText("harina de trigo")).toHaveCount(0);
  await expect(page.getByText("harina de maíz")).toHaveCount(1);
});
