/**
 * Playwright-specific test helpers for E2E testing
 * @module utils/test-helpers/playwright
 */

/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// Import Playwright types conditionally
import type { Page, Locator } from "@playwright/test";
// Use the actual implementation in test environments
import { expect } from "@playwright/test";
import { generateTestUser, sleep } from "./common";

/**
 * Fills out the registration form with generated or provided user data
 * @param page The Playwright Page object
 * @param userData Optional user data overrides
 * @returns The user data used to fill the form
 */
export async function fillRegistrationForm(page: Page, userData = {}) {
	const user = generateTestUser(userData);

	// Fill out the form
	await page.fill('input[name="firstName"]', user.firstName);
	await page.fill('input[name="lastName"]', user.lastName);
	await page.fill('input[name="email"]', user.email);
	await page.fill('input[name="phoneNumber"]', user.phoneNumber);
	await page.fill('input[name="school"]', user.school);

	return user;
}

/**
 * Wait for and verify a toast message
 * @param page The Playwright Page object
 * @param messageText Expected text content of the toast
 * @param timeout Optional timeout in milliseconds
 */
export async function expectToastMessage(page: Page, messageText: string, timeout = 5000) {
	const toast = page.locator('.toast, [role="alert"]').filter({ hasText: messageText });
	await expect(toast).toBeVisible({ timeout });
}

/**
 * Navigates through the main HackRPI page sections
 * @param page The Playwright Page object
 */
export async function navigateMainSections(page: Page) {
	// Navigation sections to test
	const sections = [
		{ link: "About", selector: "#about" },
		{ link: "Schedule", selector: "#schedule" },
		{ link: "FAQ", selector: "#faq" },
		{ link: "Sponsors", selector: "#sponsors" },
		{ link: "Team", selector: "#team" },
	];

	for (const section of sections) {
		// Click the navigation link
		await page.click(`text=${section.link}`);

		// Wait for the section to be visible
		await expect(page.locator(section.selector)).toBeVisible();

		// Verify we scrolled to the section
		const isInViewport = await page.evaluate((selector: string) => {
			const element = document.querySelector(selector);
			if (!element) return false;

			const rect = element.getBoundingClientRect();
			return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
		}, section.selector);

		expect(isInViewport).toBeTruthy();
	}
}

/**
 * Tests responsive behavior at different screen sizes
 * @param page The Playwright Page object
 * @param url The URL to test
 * @param expectedResponsiveChanges Array of selectors that should appear/disappear at different viewports
 */
export async function testResponsiveness(
	page: Page,
	url: string,
	expectedResponsiveChanges: {
		selector: string;
		viewports: {
			size: { width: number; height: number };
			visible: boolean;
		}[];
	}[],
) {
	await page.goto(url);

	for (const element of expectedResponsiveChanges) {
		for (const viewport of element.viewports) {
			// Resize the viewport
			await page.setViewportSize(viewport.size);

			// Wait for layout changes to take effect
			await sleep(300);

			// Check visibility
			const locator = page.locator(element.selector);
			if (viewport.visible) {
				await expect(locator).toBeVisible();
			} else {
				await expect(locator).toBeHidden();
			}
		}
	}
}

/**
 * Takes screenshots of key pages for visual comparison
 * @param page The Playwright Page object
 * @param basePath Base path to store screenshots
 */
export async function captureVisualSnapshots(page: Page, basePath = "e2e/visual/snapshots") {
	const pagesToCapture = [
		{ url: "/", name: "home" },
		{ url: "/resources", name: "resources" },
		{ url: "/event", name: "event" },
		{ url: "/sponsor-us", name: "sponsor-us" },
	];

	for (const pageInfo of pagesToCapture) {
		await page.goto(pageInfo.url);
		await sleep(500); // Wait for animations
		await page.screenshot({ path: `${basePath}/${pageInfo.name}.png`, fullPage: true });
	}
}
