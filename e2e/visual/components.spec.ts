import { test, expect } from "@playwright/test";

/**
 * Visual regression tests for key HackRPI UI components
 * These tests will capture screenshots for comparison
 */
test.describe("Visual Component Tests", () => {
	// For each test, we'll take a screenshot and compare it to a baseline
	test("schedule card component renders correctly", async ({ page }) => {
		// Navigate to the schedule page
		await page.goto("/schedule");

		// Wait for the component to be fully loaded
		await page.getByTestId("event-card").first().waitFor({ state: "visible" });

		// Take a screenshot of just the first event card
		await page.getByTestId("event-card").first().screenshot({
			path: "test-results/visual/event-card.png",
		});

		// Visual comparisons are handled automatically by Playwright's expect mechanism
		expect(await page.getByTestId("event-card").first().screenshot()).toMatchSnapshot("event-card.png");
	});

	test("sponsor showcase renders correctly", async ({ page }) => {
		// Navigate to the sponsors page
		await page.goto("/sponsors");

		// Wait for sponsors to load
		await page.getByTestId("sponsors-grid").waitFor({ state: "visible" });

		// Take a screenshot of the sponsors grid
		await page.getByTestId("sponsors-grid").screenshot({
			path: "test-results/visual/sponsors-grid.png",
		});

		// Compare with baseline
		expect(await page.getByTestId("sponsors-grid").screenshot()).toMatchSnapshot("sponsors-grid.png");
	});

	test("themed buttons render with correct HackRPI styling", async ({ page }) => {
		// Navigate to a page with various buttons
		await page.goto("/register");

		// Wait for the page to load
		await page.waitForLoadState("networkidle");

		// Screenshot the primary button
		await page.getByRole("button", { name: "Register" }).screenshot({
			path: "test-results/visual/primary-button.png",
		});

		// Compare against baseline
		expect(await page.getByRole("button", { name: "Register" }).screenshot()).toMatchSnapshot("primary-button.png");

		// You could also check other button variants:
		// - Secondary buttons
		// - Disabled state
		// - Hover state (requires interaction)
	});

	test("theme colors match HackRPI brand guidelines", async ({ page }) => {
		// Load a special test page that displays all theme colors
		await page.goto("/theme-test");

		// Screenshot the color palette
		await page.getByTestId("color-palette").screenshot({
			path: "test-results/visual/color-palette.png",
		});

		// Compare with baseline
		expect(await page.getByTestId("color-palette").screenshot()).toMatchSnapshot("color-palette.png");
	});
});
