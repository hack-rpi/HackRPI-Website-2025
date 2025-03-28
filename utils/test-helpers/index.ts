/**
 * Test helpers index file
 * Exports all test utilities for easy importing
 */

// Export all shared utils that are safe for both Jest and Playwright
export * from "./common";
export * from "./dom";

// Environment detection - to prevent Playwright imports in Jest environment
const isPlaywrightEnvironment =
	(typeof process !== "undefined" && process.env.TEST_RUNNER === "playwright") ||
	(typeof navigator !== "undefined" && navigator.userAgent?.includes("Playwright"));

// Only export Playwright-specific utilities in Playwright environment
// This prevents Jest from trying to load @playwright/test
if (isPlaywrightEnvironment) {
	// This would be dynamically imported, but we'll leave it as a comment
	// since dynamic imports are async and would change the module interface
	// export * from './playwright';
}

// Environment-specific utilities should be imported directly
// Example:
// import { renderWithProviders } from 'utils/test-helpers/jest';
// import { expectToastMessage } from 'utils/test-helpers/playwright';
