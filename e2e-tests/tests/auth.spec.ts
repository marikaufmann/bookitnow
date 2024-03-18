import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(page.getByText("Signed in!")).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});


test("should allow user to register", async ({ page }) => {
  const testEmail = `test_email${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign Up" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Sign up", exact: true }).click();

  await expect(page.getByText("Registered successfully!")).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});

test("should allow user to sign out", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(page.getByText("Signed in!")).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await page.getByRole("button", { name: "Sign Out" }).click();

  await expect(page.getByRole("link", { name: "Sign Up" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
