import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("navigation").getByText("tienda").click();

  await page
    .getByRole("button", { name: "Harinas, Levaduras y grano" })
    .click();

  await expect(page).toHaveURL("http://localhost:3000/product");

  await page.getByText("harina de almendra").click();

  await page.getByText("levadura nutricional").click();
});
