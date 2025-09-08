import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Optimized Playwright configuration for HackRPI 2025
 * Following September 2025 best practices for E2E testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	// Test directory
	testDir: "./e2e",
	
	// Test execution settings optimized for reliability and speed
	timeout: 30 * 1000, // 30 seconds default, can be overridden per test
	expect: {
		timeout: 10 * 1000, // 10 seconds for assertions
		toHaveScreenshot: { 
			maxDiffPixels: 100,
			threshold: 0.2 
		}
	},
	
	// Parallelization settings - optimized for CI/local balance
	fullyParallel: true,
	workers: process.env.CI 
		? 2 // Conservative for CI stability
		: "50%", // Use 50% of available CPUs locally
	
	// Prevent test.only in CI
	forbidOnly: !!process.env.CI,
	
	// Smart retry strategy - only retry actual failures, not test code issues
	retries: process.env.CI ? 1 : 0,
	
	// Enhanced reporting for better debugging
	reporter: [
		["list"], // Console output
		["html", { 
			open: process.env.CI ? "never" : "on-failure",
			outputFolder: "playwright-report"
		}],
		["junit", { 
			outputFile: "test-results/junit.xml",
			stripANSIControlSequences: true
		}],
		["json", { 
			outputFile: "test-results/results.json"
		}],
		// GitHub Actions annotations
		process.env.GITHUB_ACTIONS ? ["github"] : null,
	].filter(Boolean) as any,
	
	// Global test configuration
	use: {
		// Base URL for the application
		baseURL: process.env.BASE_URL || "http://localhost:3000",
		
		// Artifact collection strategy
		trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
		screenshot: {
			mode: "only-on-failure",
			fullPage: false // Faster screenshots
		},
		video: process.env.CI ? "retain-on-failure" : "off",
		
		// Network settings
		offline: false,
		httpCredentials: process.env.HTTP_CREDENTIALS ? {
			username: process.env.HTTP_USERNAME!,
			password: process.env.HTTP_PASSWORD!
		} : undefined,
		
		// Browser context options
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: false,
		bypassCSP: false,
		
		// Locale and timezone for consistency
		locale: "en-US",
		timezoneId: "America/New_York",
		
		// Permissions - removed clipboard as it's not supported in all browsers
		// permissions: ["clipboard-read", "clipboard-write"],
		
		// User agent for bot detection bypass
		userAgent: "Mozilla/5.0 (Playwright E2E Tests) Chrome/120.0.0.0",
		
		// Action options
		actionTimeout: 10 * 1000,
		navigationTimeout: 30 * 1000,
	},
	
	// Test projects with smart organization
	projects: [
		// === SETUP PROJECT ===
		{
			name: "setup",
			testMatch: /setup\/.*\.setup\.ts$/,
		},
		
		// === MAIN BROWSER TESTS ===
		{
			name: "chromium",
			use: { 
				...devices["Desktop Chrome"],
				// Chrome-specific flags for better performance
				launchOptions: {
					args: ["--disable-blink-features=AutomationControlled"]
				}
			},
			dependencies: [],
		},
		
		// === CRITICAL PATH TESTS (Multi-browser) ===
		{
			name: "critical-chromium",
			testMatch: /critical\/.*\.spec\.ts$/,
			use: devices["Desktop Chrome"],
		},
		{
			name: "critical-firefox",
			testMatch: /critical\/.*\.spec\.ts$/,
			use: devices["Desktop Firefox"],
		},
		{
			name: "critical-webkit",
			testMatch: /critical\/.*\.spec\.ts$/,
			use: devices["Desktop Safari"],
		},
		
		// === MOBILE TESTS ===
		{
			name: "mobile-ios",
			testMatch: /mobile\/.*\.spec\.ts$/,
			use: devices["iPhone 14 Pro"],
		},
		{
			name: "mobile-android",
			testMatch: /mobile\/.*\.spec\.ts$/,
			use: devices["Pixel 7"],
		},
		
		// === AUTHENTICATED TESTS ===
		{
			name: "authenticated",
			testMatch: /auth\/.*\.spec\.ts$/,
			use: {
				...devices["Desktop Chrome"],
				storageState: "./e2e/storage/authenticated.json",
			},
			dependencies: ["setup"],
		},
		
		// === PERFORMANCE TESTS ===
		{
			name: "performance",
			testMatch: /performance\/.*\.spec\.ts$/,
			use: {
				...devices["Desktop Chrome"],
				// Enable performance metrics collection
				launchOptions: {
					args: ["--enable-precise-memory-info"]
				}
			},
		},
		
		// === ACCESSIBILITY TESTS ===
		{
			name: "accessibility",
			testMatch: /accessibility\/.*\.spec\.ts$/,
			use: {
				...devices["Desktop Chrome"],
				// Force color scheme for consistent testing
				colorScheme: "light",
			},
		},
		
		// === VISUAL REGRESSION TESTS ===
		{
			name: "visual",
			testMatch: /visual\/.*\.spec\.ts$/,
			use: {
				...devices["Desktop Chrome"],
				// Consistent viewport for visual tests
				viewport: { width: 1920, height: 1080 },
				// Disable animations for consistent screenshots
				launchOptions: {
					args: ["--force-prefers-reduced-motion"]
				}
			},
		},
		
		// === API TESTS (Headless) ===
		{
			name: "api",
			testMatch: /api\/.*\.spec\.ts$/,
			use: {
				// API tests don't need a full browser
				headless: true,
				viewport: null,
			},
		},
	],
	
	// Web server configuration with smart defaults
	webServer: {
		command: process.env.CI 
			? "npm run build && npm run start" 
			: "npm run dev",
		url: process.env.BASE_URL || "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 2 * 60 * 1000, // 2 minutes
		stdout: process.env.DEBUG ? "pipe" : "ignore",
		stderr: "pipe",
		// Health check endpoint
		ignoreHTTPSErrors: false,
	},
	
	// Output directory for test artifacts
	outputDir: "./test-results",
	
	// Global setup/teardown
	globalSetup: require.resolve("./e2e/global-setup.ts"),
	globalTeardown: undefined,
	
	// Metadata for test runs
	metadata: {
		environment: process.env.CI ? "ci" : "local",
		branch: process.env.GITHUB_REF_NAME || "local",
		commit: process.env.GITHUB_SHA || "local",
		runId: process.env.GITHUB_RUN_ID || Date.now().toString(),
	},
	
	// Preserve test output
	preserveOutput: process.env.CI ? "failures-only" : "always",
	
	// Update snapshots in CI with special flag
	updateSnapshots: process.env.UPDATE_SNAPSHOTS ? "all" : "missing",
	
	// Grep patterns for selective test execution
	grep: process.env.TEST_GREP ? new RegExp(process.env.TEST_GREP) : undefined,
	grepInvert: process.env.TEST_GREP_INVERT ? new RegExp(process.env.TEST_GREP_INVERT) : undefined,
});
