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

test("should allow to book a hotel", async ({ page }) => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Test city");
  await page.getByPlaceholder("Check in date").fill(formattedDate);
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Test name").click();
  await expect(page.getByText("1 Room / 3 nights")).toBeVisible();
  await page.getByRole("button", { name: "Book now" }).click();
  await expect(page.getByText("€ 300.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("111");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("11111");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Test name")).toBeVisible();
});
