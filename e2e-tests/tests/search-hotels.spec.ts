import { expect, test } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByText("Signed in!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should show hotlel search result", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Test city");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Test city: 1 property found")).toBeVisible();
  await expect(page.getByText("Test name")).toBeVisible();
});

test("should allow to view hotel details", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Test city");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("link", { name: "Show prices" }).click();
  await expect(page.getByText("Test name")).toBeVisible();
  await expect(page).toHaveURL(/details/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
