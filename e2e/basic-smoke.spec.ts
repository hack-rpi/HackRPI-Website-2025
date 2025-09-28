import { test, expect } from "@playwright/test";

/**
 * Basic smoke tests to verify E2E setup is working
 * These tests verify that the most basic functionality works
 */
test.describe("Basic Smoke Tests", () => {
	test("homepage loads successfully", async ({ page }) => {
		// Navigate to home
		await page.goto("/");
		
		// Page should load
		await expect(page).toHaveTitle(/HackRPI/);
		
		// Main sections should be visible
		await expect(page.getByTestId("hero-section")).toBeVisible();
		// Use more specific selector to avoid duplicates
		await expect(page.getByTestId("hero-section").getByTestId("event-date")).toBeVisible();
	});
	
	test("navigation bar is present", async ({ page }) => {
		await page.goto("/");
		
		// Navigation should be visible
		const nav = page.getByRole("navigation").first();
		await expect(nav).toBeVisible();
		
		// Should have navigation links
		const links = nav.getByRole("link");
		const count = await links.count();
		expect(count).toBeGreaterThan(0);
	});
	
	test("event page loads", async ({ page }) => {
		await page.goto("/event");
		
		// Should load event page
		await expect(page).toHaveURL(/event/);
		
		// Event location should be visible - use first() to avoid strict mode
		await expect(page.getByTestId("event-location")).toBeVisible();
		// Check that location text exists in the test-id element specifically
		await expect(page.getByTestId("event-location")).toContainText("Darrin Communications Center");
	});
	
	test("sponsors section exists", async ({ page }) => {
		await page.goto("/");
		
		// Scroll to sponsors
		const sponsorsSection = page.getByTestId("sponsors-section");
		await sponsorsSection.scrollIntoViewIfNeeded();
		
		// Sponsors section should be visible
		await expect(sponsorsSection).toBeVisible();
	});
	
	test("FAQ section is accessible", async ({ page }) => {
		await page.goto("/");
		
		// FAQ section should exist - use first() to avoid duplicates
		const faqSection = page.getByTestId("faq-section").first();
		await faqSection.scrollIntoViewIfNeeded();
		await expect(faqSection).toBeVisible();
	});
	
	test("mobile menu works", async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");
		
		// Wait for page to load
		await page.waitForLoadState("networkidle");
		
		// Look for hamburger menu button - target the button containing the image
		const menuButton = page.getByRole("button").filter({ has: page.getByAltText("Hamburger Menu") }).first();
		
		if (await menuButton.count() > 0) {
			// Click the hamburger menu with force to bypass any overlapping elements
			await menuButton.click({ force: true });
			
			// Wait for menu to slide in - check for menu links visibility
			// The mobile menu slides in from the left with navigation links
			await expect(page.getByRole("link", { name: "Sponsor Us" }).first()).toBeVisible();
			await expect(page.getByRole("link", { name: "Code of Conduct" }).first()).toBeVisible();
		} else {
			// If no hamburger menu, navigation might be visible directly
			await expect(page.getByRole("navigation").first()).toBeVisible();
		}
	});
});
