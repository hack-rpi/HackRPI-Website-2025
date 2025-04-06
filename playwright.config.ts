import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Configuration for Playwright tests optimized for HackRPI website
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	// Directory where tests are located
	testDir: "./e2e",

	// Maximum time one test can run - increased for complex registration flows
	timeout: 45 * 1000,

	// Optimize workers for CI environments
	workers: process.env.CI ? (process.env.PLAYWRIGHT_WORKERS ? parseInt(process.env.PLAYWRIGHT_WORKERS) : 1) : undefined,

	// Enable this for maximum parallelism
	fullyParallel: true,

	// Fail the build on CI if you accidentally left test.only in the source code
	forbidOnly: !!process.env.CI,

	// Retry failed tests in CI to reduce flakiness - hackathon sites often have external dependencies
	retries: process.env.CI ? 2 : 0,

	// Reporter configuration for detailed test reports
	reporter: [["html", { open: "never" }], ["junit", { outputFile: "playwright-results.xml" }], ["list"]],

	// Global setup for auth and test data relevant to hackathon
	globalSetup: "./e2e/global-setup.ts",

	// Use shared context for all tests by default
	use: {
		// Base URL for all tests
		baseURL: "http://localhost:3000",

		// Capture screenshots only on failure
		screenshot: "only-on-failure",

		// Record video only on failure - useful for complex UI interactions
		video: "on-first-retry",

		// Store traces for debugging flaky tests
		trace: "on-first-retry",

		// Set viewport size to common desktop size
		viewport: { width: 1280, height: 720 },
	},

	// Testing projects tailored for HackRPI scenarios
	projects: [
		// Main project for most tests - using Chromium
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				// Allow hackathon registration tests more time
				actionTimeout: 15000,
			},
			testMatch: [/^(?!.*\/(mobile|auth|visual)\/).*\.spec\.ts$/],
		},

		// Authentication-specific tests
		{
			name: "authenticated",
			use: {
				...devices["Desktop Chrome"],
				// Storage state with authenticated user
				storageState: "./e2e/storage/authenticated.json",
			},
			testMatch: "**/auth/**/*.spec.ts",
			dependencies: ["setup"],
		},

		// Setup project that runs before auth tests
		{
			name: "setup",
			testMatch: "**/setup/**/*.setup.ts",
		},

		// Test specifically for mobile experiences (schedule, registration)
		{
			name: "mobile",
			use: {
				...devices["Pixel 7"],
			},
			testMatch: "**/mobile/**/*.spec.ts",
		},

		// Visual testing for critical components like event cards, schedule display
		{
			name: "visual",
			use: {
				...devices["Desktop Chrome"],
				screenshot: "on",
			},
			testMatch: "**/visual/**/*.spec.ts",
		},

		// For CI, we'll run only critical paths on additional browsers
		...(process.env.CI
			? [
					{
						name: "firefox-critical",
						use: { ...devices["Desktop Firefox"] },
						testMatch: "**/critical/**/*.spec.ts",
					},
					{
						name: "safari-critical",
						use: { ...devices["Desktop Safari"] },
						testMatch: "**/critical/**/*.spec.ts",
					},
				]
			: [
					// Include all browsers for local testing if desired
					{
						name: "firefox",
						use: { ...devices["Desktop Firefox"] },
					},
					{
						name: "webkit",
						use: { ...devices["Desktop Safari"] },
					},
				]),
	],

	// Faster web server configuration that's optimized for development vs CI
	webServer: {
		command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
		stdout: "pipe",
		stderr: "pipe",
	},

	// Folder for test outputs organized by test type
	outputDir: "test-results/",

	// Expect timeout increased for complex operations like form submissions
	expect: {
		timeout: 10000,
	},
});
