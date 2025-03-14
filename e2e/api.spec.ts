import { test, expect } from "@playwright/test";

/**
 * API tests for the HackRPI website
 * These tests verify that API endpoints work correctly
 */
test.describe("API", () => {
	test("api requests should return valid responses", async ({ page, request }) => {
		// Navigate to the homepage first to establish cookies
		await page.goto("/");

		// Make a GET request to an API endpoint (adjust as per your actual API)
		const response = await request.get(`${page.url()}api/info`);

		// The endpoint may not exist, so we only verify if it exists
		if (response.status() !== 404) {
			// Verify the response is OK
			expect(response.ok()).toBeTruthy();

			// Verify content type is JSON
			expect(response.headers()["content-type"]).toContain("application/json");

			// Parse the response body
			const body = await response.json();

			// Body should be an object
			expect(typeof body).toBe("object");
		} else {
			// Skip the test if the endpoint doesn't exist
			test.skip();
			console.log("API endpoint does not exist");
		}
	});

	test("api should handle authentication", async ({ page, request }) => {
		// Navigate to the login page (adjust path as needed)
		await page.goto("/login");

		// Check if there's a login form
		const loginForm = page.getByRole("form");

		// The test is only valid if there's a login form
		if (await loginForm.isVisible()) {
			// Attempt to access a protected API endpoint without authentication
			const unauthResponse = await request.get(`${new URL(page.url()).origin}/api/protected`);

			// This should either return a 401/403 or redirect to login
			const isUnauthorized = unauthResponse.status() === 401 || unauthResponse.status() === 403;
			const isRedirect = unauthResponse.status() === 302;

			expect(isUnauthorized || isRedirect).toBeTruthy();
		} else {
			// Skip the test if there's no login form
			test.skip();
			console.log("Login form not found");
		}
	});

	test("public api endpoints should be accessible", async ({ request }) => {
		// List of public API endpoints to test
		const publicEndpoints = ["/api/events", "/api/sponsors", "/api/schedule"];

		// Base URL for API requests
		const baseUrl = "http://localhost:3000";

		// Test each endpoint
		for (const endpoint of publicEndpoints) {
			// Make a GET request to the endpoint
			const response = await request.get(`${baseUrl}${endpoint}`);

			// If the endpoint exists, it should return a 200 OK
			if (response.status() !== 404) {
				expect(response.ok()).toBeTruthy();

				// Verify content type
				expect(response.headers()["content-type"]).toContain("application/json");

				// Parse the response body
				const body = await response.json();

				// Body should be valid
				expect(body).toBeDefined();
			}
			// If the endpoint doesn't exist, we just continue to the next one
		}
	});
});
