/**
 * Custom Jest matchers for the HackRPI Website testing suite
 * This extends Jest's expect functionality with application-specific matchers
 */
import { customMatchers } from "./mockRegistry";

// Enhance TypeScript support for custom matchers
declare global {
	namespace jest {
		interface Matchers<R> {
			toHaveProperHeadingStructure(): R;
			toHaveProperSemanticsForSection(expectedRole: string): R;
		}
	}
}

/**
 * Register all custom matchers with Jest
 * This function is called in jest.setup.js
 */
export function setupCustomMatchers(): void {
	expect.extend({
		/**
		 * Verifies that a component has a proper heading structure
		 * - Only one h1 per component/page
		 * - h3 elements only used after h2 elements
		 */
		toHaveProperHeadingStructure: (received) => customMatchers.toHaveProperHeadingStructure(received),

		/**
		 * Verifies that a section has proper semantic markup
		 * - Correct role attribute
		 * - Accessible name (via aria-label or aria-labelledby)
		 */
		toHaveProperSemanticsForSection: (received, expected) =>
			customMatchers.toHaveProperSemanticsForSection(received, expected),
	});
}

export default setupCustomMatchers;
