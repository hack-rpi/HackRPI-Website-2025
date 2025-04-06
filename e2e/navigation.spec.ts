import { test, expect } from "@playwright/test";
import { navigateMainSections } from "../utils/test-helpers/playwright";

/**
 * Navigation tests for the HackRPI website
 * These tests verify that users can navigate between pages correctly
 */
test.describe("Navigation", () => {
	// Before each test, start from the home page
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should navigate to main sections from navbar", async ({ page }) => {
		// Get the navigation element
		const nav = page.getByRole("navigation");

		// Find all links in the navigation
		const navLinks = nav.getByRole("link");

		// Get the count of navigation links
		const count = await navLinks.count();

		// There should be multiple navigation links
		expect(count).toBeGreaterThan(0);

		// Test clicking on each navigation link
		for (let i = 0; i < count; i++) {
			// Get the current link
			const link = navLinks.nth(i);

			// Get the href attribute
			const href = await link.getAttribute("href");

			// Skip external links
			if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
				continue;
			}

			// Click the link
			await link.click();

			// Wait for navigation to complete
			await page.waitForLoadState("networkidle");

			// We should have navigated to a new URL
			if (href && href !== "/") {
				expect(page.url()).toContain(href);
			}

			// Go back to the home page for the next iteration
			await page.goto("/");
		}
	});

	test("should handle mobile navigation menu", async ({ page }) => {
		// Resize to mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		// Check if there's a hamburger menu
		const hamburgerMenu = page.getByRole("button", { name: /menu/i });

		// If there's a hamburger menu, click it to open the navigation
		if (await hamburgerMenu.isVisible()) {
			await hamburgerMenu.click();

			// Navigation should be visible now
			const mobileNav = page.getByRole("navigation");
			await expect(mobileNav).toBeVisible();

			// Find links in the mobile navigation
			const mobileNavLinks = mobileNav.getByRole("link");
			const count = await mobileNavLinks.count();

			// There should be multiple navigation links
			expect(count).toBeGreaterThan(0);

			// Test clicking the first link
			const firstLink = mobileNavLinks.first();
			const href = await firstLink.getAttribute("href");

			// Skip if it's an external link
			if (href && !href.startsWith("http")) {
				await firstLink.click();

				// Wait for navigation to complete
				await page.waitForLoadState("networkidle");

				// We should have navigated to a new URL
				if (href !== "/") {
					expect(page.url()).toContain(href);
				}
			}
		}
		// If there's no hamburger menu, it means the navigation is already visible
		else {
			const nav = page.getByRole("navigation");
			await expect(nav).toBeVisible();
		}
	});

	// Using our shared utility function for main section navigation
	test("should navigate to all main sections using shared utility", async ({ page }) => {
		// Use the shared navigation utility
		await navigateMainSections(page);
	});
});
