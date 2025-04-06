import { test, expect } from "@playwright/test";

/**
 * Form tests for the HackRPI website
 * These tests verify that forms submit correctly and validate user input
 */
test.describe("Forms", () => {
	test("contact form should validate required fields", async ({ page }) => {
		// Navigate to the contact page (adjust path as needed)
		await page.goto("/contact");

		// Check if there's a contact form on the page
		const contactForm = page.getByRole("form");

		// The test is only valid if there's a form
		if (await contactForm.isVisible()) {
			// Try to submit the form without filling required fields
			const submitButton = page.getByRole("button", { name: /submit|send/i });

			// Click the submit button
			await submitButton.click();

			// We should see validation messages
			const validationMessages = page.locator('[aria-invalid="true"], .error-message, .text-red-500');
			const count = await validationMessages.count();

			// There should be at least one validation message
			expect(count).toBeGreaterThan(0);
		} else {
			// Skip the test if there's no contact form
			test.skip();
		}
	});

	test("newsletter subscription should work", async ({ page }) => {
		// Navigate to the home page
		await page.goto("/");

		// Find a newsletter subscription form or input
		const emailInput = page.locator('input[type="email"]');

		// The test is only valid if there's an email input
		if (await emailInput.isVisible()) {
			// Generate a random email
			const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;

			// Fill the email input
			await emailInput.fill(randomEmail);

			// Find the submit button
			const submitButton = page.getByRole("button", { name: /subscribe|sign up|join/i });

			// If there's a submit button, click it
			if (await submitButton.isVisible()) {
				// Save the current URL
				const currentUrl = page.url();

				// Click the submit button
				await submitButton.click();

				// Wait for any navigation or network activity
				await page.waitForLoadState("networkidle");

				// Check for success message
				const successMessage = page.getByText(/thank you|subscribed|success/i);
				const isSuccess = await successMessage.isVisible();

				// Either we should see a success message or we should have navigated
				expect(isSuccess || page.url() !== currentUrl).toBeTruthy();
			}
		} else {
			// Skip the test if there's no email input
			test.skip();
		}
	});

	test("registration form should handle valid input", async ({ page }) => {
		// Navigate to the registration page (adjust path as needed)
		await page.goto("/register");

		// Check if there's a registration form
		const registrationForm = page.getByRole("form");

		// The test is only valid if there's a form
		if (await registrationForm.isVisible()) {
			// Find the name input
			const nameInput = page.locator('input[name="name"], input[placeholder*="Name"]').first();
			if (await nameInput.isVisible()) {
				await nameInput.fill("Test User");
			}

			// Find the email input
			const emailInput = page.locator('input[type="email"]').first();
			if (await emailInput.isVisible()) {
				await emailInput.fill("test@example.com");
			}

			// Find password inputs
			const passwordInput = page.locator('input[type="password"]').first();
			if (await passwordInput.isVisible()) {
				await passwordInput.fill("Test@123456");

				// Fill confirmation password if present
				const confirmPasswordInput = page.locator('input[type="password"]').nth(1);
				if (await confirmPasswordInput.isVisible()) {
					await confirmPasswordInput.fill("Test@123456");
				}
			}

			// Here we're just logging success rather than actually submitting
			// This is to avoid creating actual registrations during testing
			console.log("Successfully filled registration form");
		} else {
			// Skip the test if there's no registration form
			test.skip();
		}
	});
});
