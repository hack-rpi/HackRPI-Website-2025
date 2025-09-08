import { test, expect } from "@playwright/test";

/**
 * Critical HackRPI workflows that must work for the event to be successful
 * These tests run on all browsers in CI to ensure core functionality
 */
test.describe("Critical HackRPI Workflows", () => {
	// Use proper test fixtures for better isolation
	test.beforeEach(async ({ page }) => {
		// Set up proper viewport and wait for network idle
		await page.setViewportSize({ width: 1280, height: 720 });
	});

	test("participant can complete full registration flow", async ({ page }) => {
		// Navigate to home and verify event information is visible
		await page.goto("/");
		
		// Verify critical event information
		await expect(page.getByTestId("event-date")).toContainText(/November \d+-\d+, 202\d/);
		await expect(page.getByTestId("event-location")).toContainText("DCC @ RPI");
		
		// Navigate to registration
		await page.getByRole("link", { name: /register/i }).click();
		await expect(page).toHaveURL(/register/);
		
		// Fill out registration form with unique data
		const timestamp = Date.now();
		const testEmail = `participant-${timestamp}@test.hackrpi.com`;
		
		await page.getByLabel("First Name").fill("Test");
		await page.getByLabel("Last Name").fill("Participant");
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("School").fill("Rensselaer Polytechnic Institute");
		await page.getByLabel("Graduation Year").selectOption("2025");
		await page.getByLabel("Major").fill("Computer Science");
		
		// Dietary restrictions and accommodations
		await page.getByLabel("Dietary Restrictions").selectOption("vegetarian");
		
		// MLH agreements
		await page.getByLabel(/I agree to the MLH Code of Conduct/i).check();
		await page.getByLabel(/I agree to share my information/i).check();
		
		// Submit registration
		await page.getByRole("button", { name: "Complete Registration" }).click();
		
		// Verify success
		await expect(page.getByTestId("registration-success")).toBeVisible();
		await expect(page.getByText(/check your email/i)).toBeVisible();
	});

	test("participant can view and filter event schedule", async ({ page }) => {
		await page.goto("/event/schedule");
		
		// Verify schedule loads
		await expect(page.getByTestId("schedule-container")).toBeVisible();
		
		// Test day filtering
		await page.getByRole("button", { name: "Saturday" }).click();
		await expect(page.getByTestId("schedule-day-saturday")).toBeVisible();
		await expect(page.getByTestId("schedule-day-sunday")).not.toBeVisible();
		
		// Test event type filtering
		await page.getByRole("button", { name: "Workshops" }).click();
		const workshopCards = page.getByTestId("event-card-workshop");
		await expect(workshopCards.first()).toBeVisible();
		
		// Click on a workshop to see details
		await workshopCards.first().click();
		await expect(page.getByTestId("event-modal")).toBeVisible();
		await expect(page.getByTestId("event-location")).toBeVisible();
		await expect(page.getByTestId("event-time")).toBeVisible();
		
		// Add to personal schedule
		await page.getByRole("button", { name: "Add to My Schedule" }).click();
		await expect(page.getByText(/added to your schedule/i)).toBeVisible();
	});

	test("team formation and management workflow", async ({ page }) => {
		// Assume user is logged in (use auth state)
		await page.goto("/dashboard");
		
		// Navigate to team management
		await page.getByRole("link", { name: "Manage Team" }).click();
		await expect(page).toHaveURL(/teams/);
		
		// Create a new team
		await page.getByRole("button", { name: "Create Team" }).click();
		await page.getByLabel("Team Name").fill("Retro Coders");
		await page.getByLabel("Project Idea").fill("AI-powered schedule optimizer");
		await page.getByRole("button", { name: "Create" }).click();
		
		// Verify team creation and get team code
		await expect(page.getByTestId("team-code")).toBeVisible();
		const teamCode = await page.getByTestId("team-code").textContent();
		expect(teamCode).toMatch(/^TEAM-[A-Z0-9]{6}$/);
		
		// Verify team member list shows creator
		await expect(page.getByTestId("team-member-list")).toContainText("Test Participant");
		await expect(page.getByTestId("team-size")).toContainText("1/4");
	});

	test("project submission workflow", async ({ page }) => {
		// Navigate to project submission (assumes authenticated)
		await page.goto("/dashboard/submit-project");
		
		// Fill project details
		await page.getByLabel("Project Title").fill("RetroChat - Modern Messaging");
		await page.getByLabel("Description").fill("A retro-themed messaging app with modern features");
		await page.getByLabel("GitHub Repository").fill("https://github.com/testuser/retrochat");
		await page.getByLabel("Demo URL").fill("https://retrochat.demo.com");
		
		// Select categories
		await page.getByLabel("Best Overall").check();
		await page.getByLabel("Best UI/UX").check();
		
		// Select technologies used
		await page.getByLabel("React").check();
		await page.getByLabel("TypeScript").check();
		await page.getByLabel("Tailwind CSS").check();
		
		// Upload presentation (mock file upload)
		const fileInput = page.getByLabel("Upload Presentation");
		await fileInput.setInputFiles({
			name: "presentation.pdf",
			mimeType: "application/pdf",
			buffer: Buffer.from("mock pdf content"),
		});
		
		// Submit project
		await page.getByRole("button", { name: "Submit Project" }).click();
		
		// Verify submission success
		await expect(page.getByTestId("submission-success")).toBeVisible();
		await expect(page.getByText(/project submitted successfully/i)).toBeVisible();
		await expect(page.getByTestId("submission-id")).toBeVisible();
	});

	test("sponsor showcase interaction", async ({ page }) => {
		await page.goto("/");
		
		// Scroll to sponsors section
		await page.getByTestId("sponsors-section").scrollIntoViewIfNeeded();
		
		// Verify sponsor tiers are visible
		await expect(page.getByTestId("sponsor-tier-platinum")).toBeVisible();
		await expect(page.getByTestId("sponsor-tier-gold")).toBeVisible();
		await expect(page.getByTestId("sponsor-tier-silver")).toBeVisible();
		
		// Click on a sponsor for more information
		const firstSponsor = page.getByTestId("sponsor-card").first();
		await firstSponsor.click();
		
		// Verify sponsor modal/details appear
		await expect(page.getByTestId("sponsor-modal")).toBeVisible();
		await expect(page.getByTestId("sponsor-website-link")).toBeVisible();
		await expect(page.getByTestId("sponsor-careers-link")).toBeVisible();
	});

	test("MLH badge and compliance verification", async ({ page }) => {
		await page.goto("/");
		
		// Verify MLH trust badge is present
		const mlhBadge = page.getByAltText(/MLH.*trust badge/i);
		await expect(mlhBadge).toBeVisible();
		
		// Verify MLH badge links to correct season
		const mlhLink = page.getByRole("link", { name: /Major League Hacking 2025/i });
		await expect(mlhLink).toHaveAttribute("href", /mlh\.io.*2025/);
		
		// Verify Code of Conduct link
		const cocLink = page.getByRole("link", { name: /code of conduct/i });
		await expect(cocLink).toBeVisible();
	});

	test("announcement system functionality", async ({ page }) => {
		await page.goto("/announcements");
		
		// Verify announcements load
		await expect(page.getByTestId("announcements-list")).toBeVisible();
		
		// Test filtering by category
		await page.getByRole("button", { name: "Filter" }).click();
		await page.getByLabel("Workshop").check();
		await page.getByRole("button", { name: "Apply" }).click();
		
		// Verify filtered results
		const announcements = page.getByTestId("announcement-card");
		await expect(announcements.first()).toBeVisible();
		
		// Verify announcement timestamps are displayed
		await expect(page.getByTestId("announcement-timestamp").first()).toBeVisible();
		
		// Test real-time updates (mock WebSocket)
		await page.evaluate(() => {
			// Simulate new announcement via WebSocket
			window.dispatchEvent(new CustomEvent("new-announcement", {
				detail: { title: "Lunch is served!", category: "food" }
			}));
		});
		
		// Verify new announcement appears
		await expect(page.getByText("Lunch is served!")).toBeVisible({ timeout: 3000 });
	});
});
