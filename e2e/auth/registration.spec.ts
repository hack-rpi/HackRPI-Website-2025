import { test, expect } from "@playwright/test";

/**
 * Tests for the authenticated registration flow
 * These tests assume the user is already logged in
 */
test.describe("Authenticated Registration Flow", () => {
	test("registered user can access participant dashboard", async ({ page }) => {
		// Navigate to the dashboard
		await page.goto("/dashboard");

		// Verify we're on the dashboard page
		await expect(page).toHaveURL(/dashboard/);

		// Verify user-specific elements are present
		await expect(page.getByTestId("user-welcome")).toBeVisible();
	});

	test("registered user can update their profile", async ({ page }) => {
		// Navigate to the profile page
		await page.goto("/profile");

		// Update profile information
		await page.getByLabel("School").fill("Rensselaer Polytechnic Institute");
		await page.getByLabel("Major").selectOption("Computer Science");
		await page.getByRole("button", { name: "Save Profile" }).click();

		// Verify the save was successful
		await expect(page.getByText("Profile updated successfully")).toBeVisible();
	});

	test("registered user can join a team", async ({ page }) => {
		// Navigate to the teams page
		await page.goto("/teams");

		// Join a team
		await page.getByRole("button", { name: "Join Team" }).click();
		await page.getByLabel("Team Code").fill("HACK-RPI-2025");
		await page.getByRole("button", { name: "Submit" }).click();

		// Verify team joining was successful
		await expect(page.getByText("You have joined the team")).toBeVisible();
	});
});
