/**
 * Shared test utilities for HackRPI Website
 * These utilities can be used by both Jest unit tests and Playwright E2E tests
 */

/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

/**
 * Formats date strings consistently across tests
 * @param date Date to format
 * @returns Formatted date string
 */
export function formatTestDate(date: Date): string {
	return date.toISOString().split("T")[0];
}

/**
 * Generates a random test email with a timestamp
 * @param prefix Optional prefix for the email
 * @returns Random email string
 */
export function generateTestEmail(prefix = "test"): string {
	const timestamp = Date.now();
	return `${prefix}-${timestamp}@example.com`;
}

/**
 * Generates random test data for form submissions
 * @param overrides Object with properties to override the defaults
 * @returns Test data object
 */
export function generateTestUser(overrides = {}) {
	return {
		firstName: "Test",
		lastName: "User",
		email: generateTestEmail(),
		phoneNumber: "5555555555",
		school: "Rensselaer Polytechnic Institute",
		...overrides,
	};
}

/**
 * Validates common HackRPI theme colors
 * @param colorValue Color value to validate
 * @returns Boolean indicating if it's a valid theme color
 */
export function isValidThemeColor(colorValue: string): boolean {
	const validColors = [
		"#9e40ee", // hackrpi-light-purple
		"#733dbe", // hackrpi-dark-purple
		"#e39036", // hackrpi-orange
		"#e9bc59", // hackrpi-yellow
		"#d5345d", // hackrpi-pink
		"#292333", // hackrpi-dark-blue
	];

	return validColors.includes(colorValue.toLowerCase());
}

/**
 * Sleep utility for tests that need explicit timing control
 * @param ms Milliseconds to sleep
 * @returns Promise that resolves after the specified delay
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates mock schedule data for testing
 * @returns Mock schedule data
 */
export function getMockScheduleData() {
	return [
		{
			day: "Friday",
			date: "2025-10-24",
			events: [
				{ time: "17:00", title: "Check-in Begins", location: "DCC Great Hall" },
				{ time: "18:30", title: "Opening Ceremony", location: "DCC 308" },
				{ time: "20:00", title: "Hacking Begins", location: "DCC Great Hall" },
			],
		},
		{
			day: "Saturday",
			date: "2025-10-25",
			events: [
				{ time: "09:00", title: "Breakfast", location: "DCC Great Hall" },
				{ time: "12:00", title: "Lunch", location: "DCC Great Hall" },
				{ time: "18:00", title: "Dinner", location: "DCC Great Hall" },
			],
		},
		{
			day: "Sunday",
			date: "2025-10-26",
			events: [
				{ time: "09:00", title: "Breakfast", location: "DCC Great Hall" },
				{ time: "12:00", title: "Hacking Ends", location: "DCC Great Hall" },
				{ time: "13:00", title: "Judging", location: "DCC Great Hall" },
				{ time: "15:00", title: "Closing Ceremony", location: "DCC 308" },
			],
		},
	];
}
