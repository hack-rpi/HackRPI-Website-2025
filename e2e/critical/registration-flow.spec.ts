import { test, expect } from "@playwright/test";

/**
 * Consolidated registration and authentication flow tests
 * Covers both new user registration and existing user login
 */
test.describe("Registration and Authentication", () => {
	test("new user can complete full registration", async ({ page }) => {
		await page.goto("/register");
		
		// Generate unique email
		const timestamp = Date.now();
		const email = `user-${timestamp}@test.hackrpi.com`;
		
		// Fill registration form
		await page.getByLabel("First Name").fill("Test");
		await page.getByLabel("Last Name").fill("User");
		await page.getByLabel("Email").fill(email);
		await page.getByLabel("Password").fill("SecurePass123!");
		await page.getByLabel("Confirm Password").fill("SecurePass123!");
		
		// School information
		await page.getByLabel("School").fill("Rensselaer Polytechnic Institute");
		await page.getByLabel("Graduation Year").selectOption("2025");
		await page.getByLabel("Major").fill("Computer Science");
		
		// Additional information
		await page.getByLabel("Phone").fill("518-555-0100");
		await page.getByLabel("Dietary Restrictions").selectOption("None");
		await page.getByLabel("T-Shirt Size").selectOption("M");
		
		// MLH agreements (critical for hackathon)
		await page.getByLabel(/I have read and agree to the MLH Code of Conduct/i).check();
		await page.getByLabel(/I authorize you to share my application/i).check();
		await page.getByLabel(/I want to receive MLH marketing emails/i).check();
		
		// Submit registration
		await page.getByRole("button", { name: /register/i }).click();
		
		// Verify success
		await expect(page.getByTestId("registration-success")).toBeVisible({ timeout: 10000 });
		await expect(page.getByText(/verification email/i)).toBeVisible();
		
		// Should redirect to email verification page
		await expect(page).toHaveURL(/verify-email|confirmation/);
	});
	
	test("existing user can sign in", async ({ page }) => {
		await page.goto("/login");
		
		// Use test credentials
		await page.getByLabel("Email").fill("existing@hackrpi.com");
		await page.getByLabel("Password").fill("TestPass123!");
		
		// Remember me option
		const rememberMe = page.getByLabel(/remember me/i);
		if (await rememberMe.isVisible()) {
			await rememberMe.check();
		}
		
		// Submit login
		await page.getByRole("button", { name: /sign in|log in/i }).click();
		
		// Verify successful login
		await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
		
		// Verify user is logged in
		await expect(page.getByTestId("user-welcome")).toBeVisible();
	});
	
	test("registration validates required fields", async ({ page }) => {
		await page.goto("/register");
		
		// Try to submit without filling required fields
		await page.getByRole("button", { name: /register/i }).click();
		
		// Should show validation errors
		const errors = page.locator('[aria-invalid="true"], .error, .text-red-500');
		await expect(errors.first()).toBeVisible();
		
		// Verify specific field validations
		await page.getByLabel("Email").fill("invalid-email");
		await page.getByLabel("Email").blur();
		await expect(page.getByText(/valid email/i)).toBeVisible();
		
		// Password validation
		await page.getByLabel("Password").fill("weak");
		await page.getByLabel("Password").blur();
		await expect(page.getByText(/password must/i)).toBeVisible();
		
		// Password mismatch
		await page.getByLabel("Password").fill("StrongPass123!");
		await page.getByLabel("Confirm Password").fill("DifferentPass123!");
		await page.getByLabel("Confirm Password").blur();
		await expect(page.getByText(/passwords.*match/i)).toBeVisible();
	});
	
	test("password reset flow works", async ({ page }) => {
		await page.goto("/login");
		
		// Click forgot password
		await page.getByRole("link", { name: /forgot password/i }).click();
		await expect(page).toHaveURL(/forgot-password|reset/);
		
		// Enter email
		await page.getByLabel("Email").fill("user@hackrpi.com");
		await page.getByRole("button", { name: /reset|send/i }).click();
		
		// Verify confirmation message
		await expect(page.getByText(/reset.*email.*sent/i)).toBeVisible();
	});
	
	test("social authentication options are available", async ({ page }) => {
		await page.goto("/login");
		
		// Check for social auth buttons
		const socialButtons = [
			{ name: /github/i, provider: "github" },
			{ name: /google/i, provider: "google" },
		];
		
		for (const button of socialButtons) {
			const socialBtn = page.getByRole("button", { name: button.name });
			if (await socialBtn.count() > 0) {
				await expect(socialBtn).toBeVisible();
				// Verify it has proper attributes for OAuth
				const href = await socialBtn.getAttribute("href");
				if (href) {
					expect(href).toContain(button.provider);
				}
			}
		}
	});
	
	test("authenticated user can access dashboard", async ({ page, context }) => {
		// Set up authenticated state
		await context.addCookies([{
			name: "session",
			value: "test-session-token",
			domain: "localhost",
			path: "/",
		}]);
		
		await page.evaluate(() => {
			localStorage.setItem("hack_rpi_auth_token", "test-token");
			localStorage.setItem("hack_rpi_user", JSON.stringify({
				id: "123",
				name: "Test User",
				email: "test@hackrpi.com"
			}));
		});
		
		// Navigate to dashboard
		await page.goto("/dashboard");
		
		// Should not redirect to login
		await expect(page).not.toHaveURL(/login/);
		
		// Dashboard elements should be visible
		await expect(page.getByTestId("dashboard-content")).toBeVisible();
	});
	
	test("unauthenticated user is redirected to login", async ({ page }) => {
		// Try to access protected route without auth
		await page.goto("/dashboard");
		
		// Should redirect to login
		await expect(page).toHaveURL(/login/, { timeout: 5000 });
		
		// Should show message about needing to log in
		const message = page.getByText(/log in|sign in.*required/i);
		if (await message.count() > 0) {
			await expect(message).toBeVisible();
		}
	});
	
	test("logout functionality works correctly", async ({ page, context }) => {
		// Set up authenticated state
		await context.addCookies([{
			name: "session",
			value: "test-session-token",
			domain: "localhost",
			path: "/",
		}]);
		
		await page.goto("/dashboard");
		
		// Find and click logout
		const logoutBtn = page.getByRole("button", { name: /log out|sign out/i });
		if (await logoutBtn.isVisible()) {
			await logoutBtn.click();
			
			// Should redirect to home or login
			await expect(page).toHaveURL(/^(\/|\/login)/);
			
			// Auth data should be cleared
			const authToken = await page.evaluate(() => localStorage.getItem("hack_rpi_auth_token"));
			expect(authToken).toBeNull();
		}
	});
});
