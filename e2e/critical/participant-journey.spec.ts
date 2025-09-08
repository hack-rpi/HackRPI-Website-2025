import { test, expect } from "@playwright/test";

/**
 * Complete participant journey test - End-to-end flow from registration to project submission
 * This is the most critical test as it validates the entire hackathon participant experience
 */
test.describe("Complete Participant Journey", () => {
	// Use a longer timeout for this comprehensive test
	test.setTimeout(90000);
	
	// Store data across test steps
	let participantEmail: string;
	let teamCode: string;
	let projectId: string;
	
	test("full hackathon participant experience flow", async ({ page, context }) => {
		// Generate unique test data
		const timestamp = Date.now();
		participantEmail = `participant-${timestamp}@test.hackrpi.com`;
		
		// ========================================
		// STEP 1: DISCOVER EVENT
		// ========================================
		await test.step("Discover HackRPI event", async () => {
			await page.goto("/");
			
			// Verify event branding and information
			await expect(page.getByTestId("hero-section")).toBeVisible();
			await expect(page.getByText(/November \d+-\d+, 202\d/)).toBeVisible();
			await expect(page.getByText("DCC @ RPI")).toBeVisible();
			
			// Check MLH trust badge
			const mlhBadge = page.getByAltText(/MLH.*trust badge/i);
			await expect(mlhBadge).toBeVisible();
			
			// View event theme
			await expect(page.getByText(/Retro.*Modern/i)).toBeVisible();
		});
		
		// ========================================
		// STEP 2: EXPLORE EVENT DETAILS
		// ========================================
		await test.step("Explore event information", async () => {
			// Check schedule preview
			await page.getByRole("link", { name: /schedule/i }).click();
			await expect(page.getByTestId("schedule-preview")).toBeVisible();
			
			// View prizes
			await page.getByRole("link", { name: /prizes/i }).click();
			await expect(page.getByTestId("prize-categories")).toBeVisible();
			
			// Check sponsors
			await page.getByRole("link", { name: /sponsors/i }).click();
			await expect(page.getByTestId("sponsor-tiers")).toBeVisible();
			
			// Read FAQ
			await page.getByRole("link", { name: /FAQ/i }).click();
			await expect(page.getByTestId("faq-section")).toBeVisible();
		});
		
		// ========================================
		// STEP 3: REGISTER FOR EVENT
		// ========================================
		await test.step("Complete registration", async () => {
			// Navigate to registration
			await page.getByRole("link", { name: /register/i }).click();
			await expect(page).toHaveURL(/register/);
			
			// Fill personal information
			await page.getByLabel("First Name").fill("Alex");
			await page.getByLabel("Last Name").fill("Hacker");
			await page.getByLabel("Email").fill(participantEmail);
			await page.getByLabel("Phone").fill("518-555-0123");
			
			// Educational information
			await page.getByLabel("School").fill("Rensselaer Polytechnic Institute");
			await page.getByLabel("Graduation Year").selectOption("2026");
			await page.getByLabel("Major").fill("Computer Science");
			await page.getByLabel("Level of Study").selectOption("Undergraduate");
			
			// Experience and interests
			await page.getByLabel("Number of Hackathons").selectOption("1-3");
			await page.getByLabel("Technical Interests").fill("AI/ML, Web Dev, Mobile");
			
			// Logistics
			await page.getByLabel("T-Shirt Size").selectOption("M");
			await page.getByLabel("Dietary Restrictions").selectOption("None");
			await page.getByLabel("Special Accommodations").fill("");
			
			// MLH Requirements
			await page.getByLabel(/I have read and agree to the MLH Code of Conduct/i).check();
			await page.getByLabel(/I authorize sharing my information with MLH/i).check();
			await page.getByLabel(/I want to receive MLH emails/i).check();
			
			// Submit registration
			await page.getByRole("button", { name: "Register for HackRPI" }).click();
			
			// Verify confirmation
			await expect(page.getByTestId("registration-confirmation")).toBeVisible();
			await expect(page.getByText(/confirmation email/i)).toBeVisible();
		});
		
		// ========================================
		// STEP 4: VERIFY EMAIL (SIMULATED)
		// ========================================
		await test.step("Verify email address", async () => {
			// Simulate email verification by navigating to verification link
			// In real scenario, this would involve checking actual email
			await page.goto(`/verify-email?token=test-${timestamp}`);
			
			// Verify success message
			await expect(page.getByText(/email verified/i)).toBeVisible();
			
			// Should redirect to dashboard
			await page.waitForURL(/dashboard/, { timeout: 5000 });
		});
		
		// ========================================
		// STEP 5: COMPLETE PROFILE
		// ========================================
		await test.step("Complete hacker profile", async () => {
			await page.goto("/dashboard/profile");
			
			// Add additional profile information
			await page.getByLabel("GitHub").fill("https://github.com/alexhacker");
			await page.getByLabel("LinkedIn").fill("https://linkedin.com/in/alexhacker");
			await page.getByLabel("Personal Website").fill("https://alexhacker.dev");
			
			// Add resume (mock file upload)
			const resumeInput = page.getByLabel("Upload Resume");
			await resumeInput.setInputFiles({
				name: "resume.pdf",
				mimeType: "application/pdf",
				buffer: Buffer.from("Mock resume content"),
			});
			
			// Skills
			await page.getByLabel("Programming Languages").fill("Python, JavaScript, Java, C++");
			await page.getByLabel("Frameworks").fill("React, Node.js, TensorFlow, Django");
			
			// Save profile
			await page.getByRole("button", { name: "Save Profile" }).click();
			await expect(page.getByText(/profile updated/i)).toBeVisible();
		});
		
		// ========================================
		// STEP 6: FORM OR JOIN TEAM
		// ========================================
		await test.step("Create a team", async () => {
			await page.goto("/dashboard/team");
			
			// Create new team
			await page.getByRole("button", { name: "Create Team" }).click();
			
			// Fill team details
			await page.getByLabel("Team Name").fill("Quantum Coders");
			await page.getByLabel("Team Description").fill("Building the future with quantum-inspired algorithms");
			await page.getByLabel("Looking For").fill("Frontend developer, UI/UX designer");
			
			// Set team preferences
			await page.getByLabel("Open to New Members").check();
			await page.getByLabel("Interested in Prizes").fill("Best Overall, Most Innovative");
			
			// Create team
			await page.getByRole("button", { name: "Create Team" }).click();
			
			// Get team code for sharing
			await expect(page.getByTestId("team-created-success")).toBeVisible();
			teamCode = await page.getByTestId("team-join-code").textContent() || "";
			expect(teamCode).toMatch(/^TEAM-[A-Z0-9]{6}$/);
			
			// Verify team dashboard
			await expect(page.getByTestId("team-members")).toContainText("1 / 4 members");
		});
		
		// ========================================
		// STEP 7: PRE-EVENT PREPARATION
		// ========================================
		await test.step("Prepare for the event", async () => {
			// View detailed schedule
			await page.goto("/event/schedule");
			
			// Add workshops to personal schedule
			const workshops = ["Intro to React", "AI/ML Basics", "Pitch Workshop"];
			for (const workshop of workshops) {
				const card = page.getByText(workshop).first();
				if (await card.isVisible()) {
					await card.click();
					await page.getByRole("button", { name: "Add to Schedule" }).click();
					await page.keyboard.press("Escape"); // Close modal
				}
			}
			
			// Download resources
			await page.goto("/resources");
			await expect(page.getByTestId("resource-list")).toBeVisible();
			
			// Join Discord (external link check)
			const discordLink = page.getByRole("link", { name: /discord/i });
			await expect(discordLink).toHaveAttribute("href", /discord/);
		});
		
		// ========================================
		// STEP 8: EVENT DAY - CHECK IN
		// ========================================
		await test.step("Check in at event", async () => {
			// Navigate to check-in
			await page.goto("/dashboard/check-in");
			
			// Display QR code for check-in
			await expect(page.getByTestId("check-in-qr")).toBeVisible();
			
			// Simulate successful check-in
			await page.getByRole("button", { name: "I've Checked In" }).click();
			await expect(page.getByTestId("check-in-confirmed")).toBeVisible();
			
			// Receive swag confirmation
			await expect(page.getByText(/collect your swag/i)).toBeVisible();
		});
		
		// ========================================
		// STEP 9: PARTICIPATE IN EVENT
		// ========================================
		await test.step("Active participation", async () => {
			// View live announcements
			await page.goto("/announcements");
			await expect(page.getByTestId("live-announcements")).toBeVisible();
			
			// Check meal times
			const meals = page.getByTestId("meal-schedule");
			await expect(meals).toBeVisible();
			
			// View mentor list
			await page.goto("/mentors");
			await expect(page.getByTestId("mentor-list")).toBeVisible();
			
			// Request mentor help (if available)
			const requestButton = page.getByRole("button", { name: /request mentor/i });
			if (await requestButton.isVisible()) {
				await requestButton.click();
				await page.getByLabel("Issue Description").fill("Need help with React state management");
				await page.getByRole("button", { name: "Submit Request" }).click();
			}
		});
		
		// ========================================
		// STEP 10: SUBMIT PROJECT
		// ========================================
		await test.step("Submit hackathon project", async () => {
			// Navigate to submission page
			await page.goto("/dashboard/submit");
			
			// Project information
			await page.getByLabel("Project Name").fill("QuantumChat");
			await page.getByLabel("Tagline").fill("Quantum-encrypted messaging for the modern age");
			
			// Detailed description
			await page.getByLabel("Description").fill(`
				QuantumChat is a revolutionary messaging platform that uses quantum-inspired 
				encryption algorithms to ensure unprecedented privacy and security. Built with 
				React, Node.js, and custom quantum simulation libraries.
			`);
			
			// Links
			await page.getByLabel("GitHub Repository").fill("https://github.com/team/quantumchat");
			await page.getByLabel("Demo URL").fill("https://quantumchat.demo");
			await page.getByLabel("Video Demo").fill("https://youtube.com/watch?v=demo123");
			
			// Technologies used
			const techs = ["React", "Node.js", "TypeScript", "WebSockets", "PostgreSQL"];
			for (const tech of techs) {
				await page.getByLabel(tech).check();
			}
			
			// Prize categories
			await page.getByLabel("Best Overall").check();
			await page.getByLabel("Most Innovative").check();
			await page.getByLabel("Best Use of AI").check();
			
			// Upload presentation
			const presentationInput = page.getByLabel("Presentation Deck");
			await presentationInput.setInputFiles({
				name: "QuantumChat-Presentation.pdf",
				mimeType: "application/pdf",
				buffer: Buffer.from("Mock presentation content"),
			});
			
			// Team members confirmation
			await page.getByLabel("All team members have reviewed this submission").check();
			
			// Submit project
			await page.getByRole("button", { name: "Submit Project" }).click();
			
			// Confirmation
			await expect(page.getByTestId("submission-success")).toBeVisible();
			projectId = await page.getByTestId("project-id").textContent() || "";
			expect(projectId).toBeTruthy();
			
			// Verify on Devpost (external submission)
			await expect(page.getByText(/also submit on Devpost/i)).toBeVisible();
		});
		
		// ========================================
		// STEP 11: JUDGING PREPARATION
		// ========================================
		await test.step("Prepare for judging", async () => {
			// View judging schedule
			await page.goto("/dashboard/judging");
			
			// Check assigned time slot
			await expect(page.getByTestId("judging-slot")).toBeVisible();
			
			// View judging criteria
			await page.getByRole("link", { name: /judging criteria/i }).click();
			await expect(page.getByTestId("criteria-list")).toBeVisible();
			
			// Prepare elevator pitch
			await page.goto("/dashboard/project/pitch");
			await page.getByLabel("Elevator Pitch").fill("QuantumChat brings quantum-level security to everyday messaging...");
			await page.getByRole("button", { name: "Save Pitch" }).click();
		});
		
		// ========================================
		// STEP 12: POST-EVENT
		// ========================================
		await test.step("Post-event activities", async () => {
			// View results (when available)
			await page.goto("/results");
			
			// Download certificate of participation
			const certificateButton = page.getByRole("button", { name: /download certificate/i });
			if (await certificateButton.isVisible()) {
				await certificateButton.click();
			}
			
			// Provide feedback
			await page.goto("/feedback");
			const feedbackForm = page.getByTestId("feedback-form");
			if (await feedbackForm.isVisible()) {
				await page.getByLabel("Overall Experience").selectOption("5");
				await page.getByLabel("Comments").fill("Amazing event! Well organized and great mentors.");
				await page.getByRole("button", { name: "Submit Feedback" }).click();
			}
		});
		
		// ========================================
		// VERIFICATION: Complete Journey Success
		// ========================================
		await test.step("Verify complete journey", async () => {
			// Return to dashboard
			await page.goto("/dashboard");
			
			// Verify all key elements are present
			await expect(page.getByText("Alex Hacker")).toBeVisible();
			await expect(page.getByText("Quantum Coders")).toBeVisible();
			await expect(page.getByText("QuantumChat")).toBeVisible();
			await expect(page.getByTestId("check-in-status")).toContainText("Checked In");
			
			console.log(`✅ Complete participant journey successful!
				Email: ${participantEmail}
				Team Code: ${teamCode}
				Project ID: ${projectId}
			`);
		});
	});
});