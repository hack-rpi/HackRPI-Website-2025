import { expect, test } from "@playwright/test";

/**
 * Lightweight smoke tests that exercise the core public experience.
 * These are intentionally minimal so failures map to real regressions
 * in production UI instead of gaps in unfinished flows.
 */
test.describe("HackRPI Public Experience", () => {
	test("home hero and key sections render", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/HackRPI/i);

		// Hero content
		const hero = page.getByTestId("hero-section");
		await expect(hero).toBeVisible();
		await expect(hero.getByTestId("event-date")).toContainText("November 15-16");
		await expect(hero.getByRole("link", { name: "Register Here!" }).first()).toBeVisible();

		// Sponsors & FAQ anchor sections should still render
		await page.getByTestId("sponsors-section").first().scrollIntoViewIfNeeded();
		await expect(page.getByTestId("sponsors-section").first()).toBeVisible();
		await page.getByTestId("faq-section").first().scrollIntoViewIfNeeded();
		await expect(page.getByTestId("faq-section").first()).toBeVisible();
	});

	test("desktop navigation links reach live pages", async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto("/");

		const nav = page.getByRole("navigation").first();
		await expect(nav).toBeVisible();

		// Verify event navigation points at the correct route
		await expect(nav.locator('a[href="/event"]').first()).toBeVisible();
		await expect(nav.locator('a[href="/sponsor-us"]').first()).toBeVisible();

		// Load the event page to ensure the route is healthy
		await page.goto("/event");
		await expect(page.getByTestId("event-location")).toContainText("Darrin Communications Center");
	});

	test("mobile navigation drawer exposes core links", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		const menuButton = page.getByRole("button").filter({ has: page.getByAltText("Hamburger Menu") }).first();
		await expect(menuButton).toBeVisible();
		await menuButton.click({ force: true });

		const sponsorLink = page.getByRole("link", { name: "Sponsor Us" }).first();
		await expect(sponsorLink).toBeVisible();
		await sponsorLink.click();
		await expect(page).toHaveURL(/sponsor-us/);
	});
});
