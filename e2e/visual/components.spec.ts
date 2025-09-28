import { test, expect } from "@playwright/test";

/**
 * Visual regression tests for key HackRPI UI components
 * These tests will capture screenshots for comparison
 */
test.describe("Visual Component Tests", () => {
	// For each test, we'll take a screenshot and compare it to a baseline
	test.fixme("schedule card component renders correctly (Amplify events required)", async ({ page }) => {
		// Navigate to the schedule page
		await page.goto("/event/schedule");

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
		// Navigate to the homepage and scroll to sponsors section
		await page.goto("/");
		const sponsorsSection = page.getByTestId("sponsors-section");
		await sponsorsSection.scrollIntoViewIfNeeded();
		await sponsorsSection.waitFor({ state: "visible" });

		// Take a screenshot of the sponsors section
		await sponsorsSection.screenshot({
			path: "test-results/visual/sponsors-section.png",
		});

		// Compare with baseline
		expect(await sponsorsSection.screenshot()).toMatchSnapshot("sponsors-section.png");
	});

	test.fixme("themed buttons render with correct HackRPI styling (no /register route)", async ({ page }) => {
		await page.goto("/register");
	});

	test.fixme("theme colors match HackRPI brand guidelines (no /theme-test page)", async ({ page }) => {
		await page.goto("/theme-test");
	});
});
