import { test, expect } from "@playwright/test";

/**
 * Critical path tests for HackRPI registration
 * These tests run on all browsers in CI to ensure core functionality works
 */
test.describe("Critical Registration Path", () => {
	test("new user can register for HackRPI", async ({ page }) => {
		// Start the registration process
		await page.goto("/register");

		// Fill out required information
		await page.getByLabel("First Name").fill("Test");
		await page.getByLabel("Last Name").fill("User");
		await page.getByLabel("Email").fill(`test-${Date.now()}@example.com`);
		await page.getByLabel("Password").fill("SecurePassword123!");
		await page.getByLabel("Confirm Password").fill("SecurePassword123!");

		// Check required checkbox
		await page.getByLabel(/I agree to the terms/).check();

		// Submit the form
		await page.getByRole("button", { name: "Register" }).click();

		// Verify successful registration
		await expect(page).toHaveURL(/verify-email/);
		await expect(page.getByText(/verification email/)).toBeVisible();
	});

	test("existing user can sign in", async ({ page }) => {
		// Go to sign in page
		await page.goto("/login");

		// Enter credentials
		await page.getByLabel("Email").fill("existing-user@hackrpi.com");
		await page.getByLabel("Password").fill("ExistingUserPass123!");

		// Submit form
		await page.getByRole("button", { name: "Sign In" }).click();

		// Verify successful login
		await expect(page).toHaveURL(/dashboard/);
		await expect(page.getByTestId("user-welcome")).toBeVisible();
	});

	test("user can access event schedule", async ({ page }) => {
		// This is a critical path - users must be able to see the schedule
		await page.goto("/schedule");

		// Verify the schedule loads
		await expect(page.getByTestId("schedule-container")).toBeVisible();
		await expect(page.getByTestId("event-card").first()).toBeVisible();

		// Verify event details
		await page.getByTestId("event-card").first().click();
		await expect(page.getByTestId("event-details")).toBeVisible();
	});
});
