import { test as setup } from "@playwright/test";

/**
 * Setup file that prepares authentication state for auth tests
 * This runs before any auth-specific tests to ensure proper test state
 */
setup("prepare authentication state", async ({ page }) => {
	// This could do any additional setup needed specifically for auth tests
	// For example, creating test users, setting up specific data, etc.

	// Navigate to the dashboard to verify auth is working
	await page.goto("/dashboard");

	// Additional setup could include:
	// - Creating specific user permissions
	// - Setting up test event data
	// - Preparing project submission data

	console.log("Authentication setup complete");
});
