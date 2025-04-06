/**
 * Custom Jest matchers for the HackRPI Website testing suite
 * This extends Jest's expect functionality with application-specific matchers
 *
 * Best Practices 2025: Separating custom matchers into a dedicated file
 * improves maintainability and makes them easier to discover and reuse.
 */

import { customMatchers } from "../__mocks__/mockRegistry";

// Enhance TypeScript support for custom matchers
declare global {
	namespace jest {
		interface Matchers<R> {
			toHaveProperHeadingStructure(): R;
			toHaveProperSemanticsForSection(expectedRole: string): R;

			// Additional custom matchers specific to HackRPI Website
			toHaveAccessibleControls(): R;
			toBeResponsiveContainer(): R;
			toContainNavigationLinks(expectedCount: number): R;
			toHaveProperHackathonStructure(): R;
		}
	}
}

// Additional custom matchers specific to the HackRPI application
const additionalMatchers = {
	/**
	 * Verifies that an element has proper accessible controls
	 * for a hackathon application (buttons, links, etc.)
	 */
	toHaveAccessibleControls: (received: HTMLElement) => {
		const container = received;

		// Check for accessible interactive elements
		const buttons = container.querySelectorAll("button");
		const links = container.querySelectorAll("a");
		const formControls = container.querySelectorAll("input, select, textarea");

		// All interactive elements must have accessible names
		const inaccessibleButtons = Array.from(buttons).filter(
			(button) => !button.getAttribute("aria-label") && !button.textContent?.trim(),
		);

		const inaccessibleLinks = Array.from(links).filter(
			(link) => !link.getAttribute("aria-label") && !link.textContent?.trim(),
		);

		const inaccessibleControls = Array.from(formControls).filter((control) => {
			// Form control must have either a label, aria-label, or aria-labelledby
			const id = control.getAttribute("id");
			const hasVisibleLabel = id && container.querySelector(`label[for="${id}"]`);
			const hasAriaLabel = control.getAttribute("aria-label");
			const hasAriaLabelledBy = control.getAttribute("aria-labelledby");

			return !hasVisibleLabel && !hasAriaLabel && !hasAriaLabelledBy;
		});

		const hasAccessibilityIssues =
			inaccessibleButtons.length > 0 || inaccessibleLinks.length > 0 || inaccessibleControls.length > 0;

		if (hasAccessibilityIssues) {
			return {
				pass: false,
				message: () => {
					let message = "Found accessibility issues:\n";

					if (inaccessibleButtons.length > 0) {
						message += `- ${inaccessibleButtons.length} button(s) without accessible names\n`;
					}

					if (inaccessibleLinks.length > 0) {
						message += `- ${inaccessibleLinks.length} link(s) without accessible names\n`;
					}

					if (inaccessibleControls.length > 0) {
						message += `- ${inaccessibleControls.length} form control(s) without labels\n`;
					}

					return message;
				},
			};
		}

		return {
			pass: true,
			message: () => "Element has proper accessible controls",
		};
	},

	/**
	 * Verifies that an element has responsive container properties
	 * Important for testing HackRPI's responsive design
	 */
	toBeResponsiveContainer: (received: HTMLElement) => {
		const container = received;
		const style = window.getComputedStyle(container);

		// Check responsive container properties
		const hasWidthProperty = style.width.includes("%") || style.width === "100%" || style.maxWidth !== "none";

		const hasFlexOrGrid = style.display === "flex" || style.display === "grid" || style.display === "inline-flex";

		const hasPadding =
			parseInt(style.padding) > 0 || parseInt(style.paddingLeft) > 0 || parseInt(style.paddingRight) > 0;

		if (!hasWidthProperty || !hasFlexOrGrid || !hasPadding) {
			return {
				pass: false,
				message: () => {
					let message = "Element is not a responsive container:\n";

					if (!hasWidthProperty) {
						message += "- Missing responsive width property (%, max-width, etc.)\n";
					}

					if (!hasFlexOrGrid) {
						message += "- Not using flex or grid layout\n";
					}

					if (!hasPadding) {
						message += "- Missing padding which is needed for responsive layout\n";
					}

					return message;
				},
			};
		}

		return {
			pass: true,
			message: () => "Element is a responsive container",
		};
	},

	/**
	 * Verifies that a navigation component contains the expected
	 * number of navigation links for the HackRPI website
	 */
	toContainNavigationLinks: (received: HTMLElement, expectedCount: number) => {
		const container = received;
		const links = container.querySelectorAll('a[href], [role="link"]');

		if (links.length !== expectedCount) {
			return {
				pass: false,
				message: () => `Expected navigation to have exactly ${expectedCount} links, but found ${links.length}`,
			};
		}

		return {
			pass: true,
			message: () => `Navigation contains the expected ${expectedCount} links`,
		};
	},

	/**
	 * Verifies that a component has the proper structure expected
	 * for a hackathon-related component (schedule, registration, etc.)
	 */
	toHaveProperHackathonStructure: (received: HTMLElement) => {
		const container = received;

		// A hackathon component should have certain elements
		const hasHeading = container.querySelector("h1, h2, h3") !== null;
		const hasDescription = container.querySelector("p") !== null;
		const hasTimeElement =
			container.querySelector("time") !== null || container.textContent?.match(/\d+(am|pm|AM|PM|:\d+)/) !== null;

		if (!hasHeading || !hasDescription || !hasTimeElement) {
			return {
				pass: false,
				message: () => {
					let message = "Component is missing hackathon-specific structure:\n";

					if (!hasHeading) {
						message += "- Missing heading element\n";
					}

					if (!hasDescription) {
						message += "- Missing description paragraph\n";
					}

					if (!hasTimeElement) {
						message += "- Missing time information (time element or time text)\n";
					}

					return message;
				},
			};
		}

		return {
			pass: true,
			message: () => "Component has proper hackathon structure",
		};
	},
};

/**
 * Register all custom matchers with Jest
 * This function is called in jest.setup.js
 */
export function setupCustomMatchers(): void {
	expect.extend({
		// Existing matchers
		toHaveProperHeadingStructure: (received) => customMatchers.toHaveProperHeadingStructure(received),

		toHaveProperSemanticsForSection: (received, expected) =>
			customMatchers.toHaveProperSemanticsForSection(received, expected),

		// Additional matchers
		toHaveAccessibleControls: (received) => additionalMatchers.toHaveAccessibleControls(received),

		toBeResponsiveContainer: (received) => additionalMatchers.toBeResponsiveContainer(received),

		toContainNavigationLinks: (received, expected) => additionalMatchers.toContainNavigationLinks(received, expected),

		toHaveProperHackathonStructure: (received) => additionalMatchers.toHaveProperHackathonStructure(received),
	});
}

export default setupCustomMatchers;
