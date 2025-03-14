import { chromium, FullConfig } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * Global setup for HackRPI E2E tests
 * - Creates authenticated session state
 * - Sets up test data directories
 */
async function globalSetup(config: FullConfig) {
	// Ensure storage directory exists
	const storageDir = path.join(__dirname, "storage");
	if (!fs.existsSync(storageDir)) {
		fs.mkdirSync(storageDir, { recursive: true });
	}

	// Only create auth state if it doesn't exist or we're in CI
	const storageStatePath = path.join(storageDir, "authenticated.json");
	if (!fs.existsSync(storageStatePath) || process.env.CI) {
		await setupAuthenticatedState(storageStatePath, config);
	}

	console.log("Global setup complete");
}

/**
 * Creates an authenticated session for testing protected routes
 */
async function setupAuthenticatedState(storageStatePath: string, config: FullConfig) {
	// Use the baseURL from the configuration
	const baseURL = config.projects[0]?.use?.baseURL || "http://localhost:3000";

	// Launch browser
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	// Mock authentication if needed or perform real login
	// For HackRPI, you could log in using the actual auth flow, or set cookies/localStorage directly

	try {
		// Navigate to the site
		await page.goto(baseURL);

		// ------------------------------------------------------------------
		// EXAMPLE AUTHENTICATION - REPLACE WITH ACTUAL AUTH FLOW FOR HACKRPI
		// ------------------------------------------------------------------

		// Example 1: Using localStorage for auth (common for JWT)
		await page.evaluate(() => {
			localStorage.setItem("hack_rpi_auth_token", "mock-auth-token");
			localStorage.setItem(
				"hack_rpi_user",
				JSON.stringify({
					id: "test-user-id",
					name: "Test User",
					email: "test@hackrpi.com",
					role: "participant",
				}),
			);
		});

		// Example 2: Using cookies for auth
		// await context.addCookies([
		//   {
		//     name: 'session_id',
		//     value: 'mock-session-id',
		//     domain: 'localhost',
		//     path: '/',
		//     httpOnly: true,
		//     secure: false,
		//     sameSite: 'Lax'
		//   }
		// ]);

		// Example 3: Actual form login
		// await page.goto(`${baseURL}/login`);
		// await page.fill('input[name="email"]', 'test@hackrpi.com');
		// await page.fill('input[name="password"]', 'test-password');
		// await page.click('button[type="submit"]');
		// await page.waitForURL(`${baseURL}/dashboard`);

		// ------------------------------------------------------------------
		// END OF EXAMPLE AUTHENTICATION
		// ------------------------------------------------------------------

		// Verify we're authenticated
		// This depends on how your site indicates authentication

		// Save the authentication state
		await context.storageState({ path: storageStatePath });
		console.log(`Authentication state saved to: ${storageStatePath}`);
	} finally {
		// Clean up
		await browser.close();
	}
}

export default globalSetup;
