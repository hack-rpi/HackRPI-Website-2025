import { test, expect } from "@playwright/test";

/**
 * Mobile-specific navigation tests
 * Tests the responsive design of the HackRPI website
 */
test.describe("Mobile Navigation", () => {
	test("mobile menu works correctly", async ({ page }) => {
		// Go to home page
		await page.goto("/");

		// The mobile hamburger menu should be visible
		const mobileMenuButton = page.getByRole("button", { name: "Menu" });
		await expect(mobileMenuButton).toBeVisible();

		// Open the mobile menu
		await mobileMenuButton.click();

		// Verify navigation links are now visible
		await expect(page.getByRole("link", { name: "Schedule" })).toBeVisible();
		await expect(page.getByRole("link", { name: "Sponsors" })).toBeVisible();
		await expect(page.getByRole("link", { name: "FAQ" })).toBeVisible();

		// Navigate to the schedule page
		await page.getByRole("link", { name: "Schedule" }).click();

		// Verify we're on the schedule page
		await expect(page).toHaveURL(/schedule/);
	});

	test("schedule page is responsive on mobile", async ({ page }) => {
		// Navigate to the schedule page
		await page.goto("/schedule");

		// Check that the schedule component is visible and properly sized
		const scheduleComponent = page.getByTestId("schedule-container");
		await expect(scheduleComponent).toBeVisible();

		// No horizontal overflow should be present (no horizontal scrollbar)
		const scheduleWidth = await scheduleComponent.evaluate((el) => el.clientWidth);
		const viewportWidth = page.viewportSize()?.width;

		expect(scheduleWidth).toBeLessThanOrEqual(viewportWidth || 0);
	});

	test("registration form is usable on mobile", async ({ page }) => {
		// Navigate to the registration page
		await page.goto("/register");

		// Fill out the registration form
		await page.getByLabel("First Name").fill("Mobile");
		await page.getByLabel("Last Name").fill("Tester");
		await page.getByLabel("Email").fill("mobile-test@hackrpi.com");

		// Verify the form submit button is visible and clickable
		const submitButton = page.getByRole("button", { name: "Register" });
		await expect(submitButton).toBeVisible();

		// Ensure button is within viewport and clickable
		const buttonInViewport = await submitButton.evaluate((button) => {
			const rect = button.getBoundingClientRect();
			return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
		});

		expect(buttonInViewport).toBe(true);
	});
});
