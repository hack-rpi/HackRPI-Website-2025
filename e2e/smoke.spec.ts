import { test, expect } from "@playwright/test";

/**
 * Smoke tests for the HackRPI website
 * These tests verify that core pages load correctly
 */
test.describe("Smoke tests", () => {
	test("homepage should load", async ({ page }) => {
		// Navigate to the home page
		await page.goto("/");

		// The page should have a title
		await expect(page).toHaveTitle(/HackRPI/);

		// There should be a navigation element
		const nav = page.getByRole("navigation").first();
		await expect(nav).toBeVisible();

		// Take a screenshot for visual reference
		await page.screenshot({ path: "./e2e-results/homepage.png", fullPage: true });
	});

	test("should have appropriate meta tags", async ({ page }) => {
		// Navigate to the home page
		await page.goto("/");

		// Check for important meta tags
		const descriptionMeta = page.locator('meta[name="description"]');
		await expect(descriptionMeta).toBeAttached();

		// Check for Open Graph tags - Next.js formats OG tags with 'property="og:title"' or 'content=""'
		const ogTitleMeta = page.locator('meta[property="og:title"], meta[content*="HackRPI"]').first();
		await expect(ogTitleMeta).toBeAttached();
	});

	test("should be accessible", async ({ page }) => {
		// Navigate to the home page
		await page.goto("/");

		// Check for proper heading structure
		const h1 = page.locator("h1").first();
		await expect(h1).toBeVisible();

		// Check for image alt texts
		const images = page.locator('img:not([alt=""])');
		const imagesCount = await images.count();

		// There should be no images without alt text
		const imagesWithoutAlt = page.locator("img:not([alt])");
		const imagesWithoutAltCount = await imagesWithoutAlt.count();
		expect(imagesWithoutAltCount).toBe(0);
	});
});
