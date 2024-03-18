import { test, expect } from "@playwright/test";
import path from 'path'

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

test("should allow to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Test name");
  await page.locator("[name=city]").fill("Test city");
  await page.locator("[name=country]").fill("Test country");
  await page.locator("[name=description]").fill("Test description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "3");

  await page.getByText("Villas").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("0");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save"}).click();
  await expect(page.getByText("Hotel added successfully!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
});

test("should allow to edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByText("Dublin Getaways").first().click();
  await page.waitForSelector("[name=name]", { state: "attached" });
  await expect(page.locator("[name=name]")).toHaveValue("Dublin Getaways");
  await page.locator("[name=name]").fill("Dublin Getaways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel edited successfully!")).toBeVisible();
  await expect(page.getByText("Dublin Getaways UPDATED")).toBeVisible();
  await page.getByText("Dublin Getaways UPDATED").first().click();
  await expect(page.locator("[name=name]")).toHaveValue(
    "Dublin Getaways UPDATED"
  );
  await page.locator("[name=name]").fill("Dublin Getaways");
  await page.getByRole("button", { name: "Save" }).click();
});

test("should allow to delete hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Delete test name");
  await page.locator("[name=city]").fill("Test city");
  await page.locator("[name=country]").fill("Test country");
  await page.locator("[name=description]").fill("Test description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "3");

  await page.getByText("Villas").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("0");

  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel added successfully!")).toBeVisible();
  

  await page.getByText("Delete test name").click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Hotel deleted.")).toBeVisible();
  await expect(page.getByText("Delete test name")).toBeHidden();
});
