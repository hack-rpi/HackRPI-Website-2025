import { defineConfig, devices } from "@playwright/test";

/**
 * Streamlined Playwright configuration that focuses on our critical
 * customer journeys. One Chromium project keeps runs fast and stable
 * while still catching meaningful regressions.
 */
export default defineConfig({
	testDir: "./e2e",
	timeout: 30_000,
	expect: {
		timeout: 5_000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI
		? [["github"], ["junit", { outputFile: "test-results/junit.xml" }]]
		: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
	use: {
		baseURL: process.env.BASE_URL || "http://localhost:3000",
		trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
		screenshot: "only-on-failure",
		video: "off",
		viewport: { width: 1280, height: 720 },
		locale: "en-US",
		timezoneId: "America/New_York",
	},
	projects: [
		{
			name: "chromium",
			use: devices["Desktop Chrome"],
		},
	],
	...(process.env.PLAYWRIGHT_SKIP_WEB_SERVER
		? {}
		: {
			webServer: {
				command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
				url: process.env.BASE_URL || "http://localhost:3000",
				reuseExistingServer: !process.env.CI,
				timeout: 120_000,
			},
		}),
});
