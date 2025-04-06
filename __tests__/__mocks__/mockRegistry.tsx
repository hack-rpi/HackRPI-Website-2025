/**
 * Centralized Mock Registry for HackRPI Website Testing
 * Created to improve test maintainability and reduce redundancies
 *
 * This file contains reusable mock implementations for common components
 * and browser APIs used throughout the test suite.
 */

import React from "react";
import "@testing-library/jest-dom";
import { screen, within } from "@testing-library/react";
import extendedMocks from "./extendedMocks";

/**
 * Mock for the RegistrationLink component
 * Used in both about-us.test.tsx and faq.test.tsx
 */
export const MockRegistrationLink = ({ className }: { className?: string }) => {
	return (
		<div data-testid="registration-link" className={className} role="link" aria-label="Registration Link">
			Registration Link
		</div>
	);
};

/**
 * Mock for the NavBar component
 * Used in navigation.test.tsx and other integration tests
 */
export const MockNavBar = ({
	showOnScroll = false,
	onAboutClick,
	onFAQClick,
	onHomeClick,
}: {
	showOnScroll?: boolean;
	onAboutClick?: () => void;
	onFAQClick?: () => void;
	onHomeClick?: () => void;
}) => {
	return (
		<nav data-testid="nav-bar" data-show-on-scroll={showOnScroll} role="navigation" aria-label="Main Navigation">
			<a
				href="/"
				role="link"
				aria-label="Home"
				onClick={(e) => {
					e.preventDefault();
					onHomeClick?.();
				}}
			>
				Home
			</a>
			<a href="/event" role="link" aria-label="Event">
				Event
			</a>
			<a href="/resources" role="link" aria-label="Resources">
				Resources
			</a>
			<a
				href="#about"
				role="link"
				aria-label="About"
				onClick={(e) => {
					e.preventDefault();
					onAboutClick?.();
				}}
			>
				About
			</a>
			<a
				href="#faq"
				role="link"
				aria-label="FAQ"
				onClick={(e) => {
					e.preventDefault();
					onFAQClick?.();
				}}
			>
				FAQ
			</a>
		</nav>
	);
};

/**
 * Mock for the Footer component
 */
export const MockFooter = () => {
	return (
		<footer data-testid="footer" role="contentinfo" aria-label="Site Footer">
			<div data-testid="footer-nav" role="navigation" aria-label="Footer Navigation">
				<a href="/privacy" role="link" aria-label="Privacy Policy">
					Privacy Policy
				</a>
				<a href="/terms" role="link" aria-label="Terms of Service">
					Terms of Service
				</a>
			</div>
			<p>© 2025 HackRPI. All rights reserved.</p>
		</footer>
	);
};

/**
 * Mock for the Title component
 */
export const MockTitle = () => {
	return (
		<header data-testid="title" role="banner" aria-label="HackRPI 2025">
			<h1>HackRPI 2025</h1>
			<p>November 15-16, 2025</p>
		</header>
	);
};

/**
 * Enhanced IntersectionObserver mock with full simulation capabilities
 * Combines the best aspects of both implementations from jest.setup.js and navigation.test.tsx
 */
export class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | Document | null = null;
	readonly rootMargin: string = "";
	readonly thresholds: ReadonlyArray<number> = [0];

	private callback: IntersectionObserverCallback;
	private elements = new Map<Element, boolean>();

	constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
		this.callback = callback;
		if (options) {
			this.root = options.root || null;
			this.rootMargin = options.rootMargin || "0px";
			this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0];
		}
	}

	observe(element: Element): void {
		this.elements.set(element, false);

		// Schedule a call to simulate intersection after a short delay
		setTimeout(() => {
			this.simulateIntersection(element, true);
		}, 50);
	}

	unobserve(element: Element): void {
		this.elements.delete(element);
	}

	disconnect(): void {
		this.elements.clear();
	}

	// Helper for tests to simulate intersection events
	simulateIntersection(element: Element, isIntersecting: boolean): void {
		if (this.elements.has(element)) {
			this.elements.set(element, isIntersecting);

			const entry = {
				isIntersecting,
				target: element,
				intersectionRatio: isIntersecting ? 1 : 0,
				boundingClientRect: element.getBoundingClientRect(),
				intersectionRect: isIntersecting ? element.getBoundingClientRect() : new DOMRect(),
				rootBounds: null,
				time: Date.now(),
			} as IntersectionObserverEntry;

			this.callback([entry], this as IntersectionObserver);
		}
	}

	// Simulate all observed elements intersecting or not
	simulateAllIntersections(isIntersecting: boolean): void {
		const entries: IntersectionObserverEntry[] = [];

		this.elements.forEach((_, element) => {
			this.elements.set(element, isIntersecting);

			entries.push({
				isIntersecting,
				target: element,
				intersectionRatio: isIntersecting ? 1 : 0,
				boundingClientRect: element.getBoundingClientRect(),
				intersectionRect: isIntersecting ? element.getBoundingClientRect() : new DOMRect(),
				rootBounds: null,
				time: Date.now(),
			} as IntersectionObserverEntry);
		});

		if (entries.length > 0) {
			this.callback(entries, this as IntersectionObserver);
		}
	}

	takeRecords(): IntersectionObserverEntry[] {
		const entries: IntersectionObserverEntry[] = [];

		this.elements.forEach((isIntersecting, element) => {
			entries.push({
				isIntersecting,
				target: element,
				intersectionRatio: isIntersecting ? 1 : 0,
				boundingClientRect: element.getBoundingClientRect(),
				intersectionRect: isIntersecting ? element.getBoundingClientRect() : new DOMRect(),
				rootBounds: null,
				time: Date.now(),
			} as IntersectionObserverEntry);
		});

		return entries;
	}
}

/**
 * Common accessibility checks that can be reused across component tests
 * This reduces duplication in individual test files
 */
export function commonAccessibilityChecks(element: HTMLElement) {
	// Check that all buttons have accessible names
	const buttons = element.querySelectorAll("button");
	buttons.forEach((button) => {
		expect(button).toHaveAccessibleName();
	});

	// Check that all links have accessible names
	const links = element.querySelectorAll("a");
	links.forEach((link) => {
		expect(link).toHaveAccessibleName();
	});

	// Check that all images have alt text
	const images = element.querySelectorAll("img");
	images.forEach((image) => {
		expect(image).toHaveAttribute("alt");
	});

	// Check that all form controls have labels
	const formControls = element.querySelectorAll("input, select, textarea");
	formControls.forEach((control) => {
		expect(control).toHaveAccessibleName();
	});
}

/**
 * Specialized accessibility checks for navigation components
 * Added in 2025 to improve accessibility testing specificity
 */
export function navigationAccessibilityChecks(element: HTMLElement) {
	// Basic accessibility checks first
	commonAccessibilityChecks(element);

	// Navigation-specific checks
	const nav = element.querySelector("nav") || element;

	// Check for proper navigation role
	expect(nav).toHaveAttribute("role", "navigation");

	// Check for aria-label on navigation
	expect(nav).toHaveAccessibleName();

	// Check for keyboard navigability - all interactive elements must be reachable
	const interactiveElements = nav.querySelectorAll("a, button");
	interactiveElements.forEach((el) => {
		expect(el).toHaveAttribute("tabindex", expect.not.stringMatching(/-1/));
	});
}

/**
 * Specialized accessibility checks for form components
 * Added in 2025 to improve accessibility testing specificity
 */
export function formAccessibilityChecks(element: HTMLElement) {
	// Basic accessibility checks first
	commonAccessibilityChecks(element);

	// Form-specific checks
	const form = element.querySelector("form") || element;

	// Check form elements for required attributes
	const inputs = form.querySelectorAll("input, select, textarea");
	inputs.forEach((input) => {
		// Every input should have an associated label with matching for/id
		if (input.id) {
			const label = form.querySelector(`label[for="${input.id}"]`);
			expect(label).not.toBeNull();
		}

		// Required fields should have aria-required
		if (input.hasAttribute("required")) {
			expect(input).toHaveAttribute("aria-required", "true");
		}
	});

	// Check submit buttons for proper labels
	const submitButtons = Array.from(form.querySelectorAll('button[type="submit"], input[type="submit"]'));
	expect(submitButtons.length).toBeGreaterThan(0);
	submitButtons.forEach((button) => {
		expect(button).toHaveAccessibleName();
	});
}

/**
 * Mock form submission event with full typing support
 */
export function createMockFormEvent(formData: Record<string, any> = {}) {
	return {
		preventDefault: jest.fn(),
		stopPropagation: jest.fn(),
		target: {
			checkValidity: jest.fn().mockReturnValue(true),
			reportValidity: jest.fn(),
			reset: jest.fn(),
			elements: Object.fromEntries(
				Object.entries(formData).map(([key, value]) => [key, { value, name: key, id: key }]),
			),
		},
		currentTarget: {
			checkValidity: jest.fn().mockReturnValue(true),
			reportValidity: jest.fn(),
			reset: jest.fn(),
			elements: Object.fromEntries(
				Object.entries(formData).map(([key, value]) => [key, { value, name: key, id: key }]),
			),
		},
	};
}

/**
 * Mock Data Factories
 * New in 2025: Provides consistent test data across all test files
 */
export const createMockData = {
	/**
	 * Creates a consistent FAQ item for tests
	 */
	faqItem: (index: number = 0, options: Partial<{ title: string; content: string }> = {}) => {
		const defaults = [
			{ title: "What is HackRPI?", content: "Teams of 1-4 have 24 hours to build a project" },
			{ title: "When is HackRPI?", content: "HackRPI takes place on November 15-16, 2025" },
			{ title: "Where is HackRPI?", content: "HackRPI takes place at Rensselaer Polytechnic Institute" },
		];

		const baseItem = defaults[index % defaults.length];
		return {
			title: options.title || baseItem.title,
			content: options.content || baseItem.content,
			id: `faq-${index}`,
		};
	},

	/**
	 * Creates a consistent schedule item for tests
	 */
	scheduleItem: (index: number = 0, options: Partial<{ title: string; time: string; description: string }> = {}) => {
		const defaults = [
			{ title: "Check-in", time: "9:00 AM", description: "Registration opens" },
			{ title: "Opening Ceremony", time: "10:00 AM", description: "Welcome and introductions" },
			{ title: "Hacking Begins", time: "11:00 AM", description: "Start your projects!" },
		];

		const baseItem = defaults[index % defaults.length];
		return {
			title: options.title || baseItem.title,
			time: options.time || baseItem.time,
			description: options.description || baseItem.description,
			id: `schedule-${index}`,
		};
	},

	/**
	 * Creates a consistent sponsor item for tests
	 */
	sponsorItem: (tier: "platinum" | "gold" | "silver" = "gold", index: number = 0) => {
		return {
			name: `Sponsor ${index + 1}`,
			tier,
			logo: `/sponsors/sponsor-${index + 1}.png`,
			url: `https://sponsor${index + 1}.example.com`,
			id: `sponsor-${tier}-${index}`,
		};
	},
};

/**
 * Export custom matchers for use in customMatchers.ts
 */
export const customMatchers = {
	toHaveProperHeadingStructure: (received: HTMLElement) => {
		const container = received;
		const h1Elements = container.querySelectorAll("h1");
		const h2Elements = container.querySelectorAll("h2");
		const h3Elements = container.querySelectorAll("h3");

		// Check if there's at most one h1 element
		if (h1Elements.length > 1) {
			return {
				pass: false,
				message: () => `Expected element to have at most 1 h1 element, found ${h1Elements.length}`,
			};
		}

		// Check if h3 elements are only used after h2 elements
		if (h3Elements.length > 0 && h2Elements.length === 0) {
			return {
				pass: false,
				message: () => "Expected h3 elements to only be used after h2 elements",
			};
		}

		return {
			pass: true,
			message: () => "Element has proper heading structure",
		};
	},

	toHaveProperSemanticsForSection: (received: HTMLElement, expectedRole: string) => {
		const element = received;
		const role = element.getAttribute("role");
		const hasAccessibleName = element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby");

		if (role !== expectedRole) {
			return {
				pass: false,
				message: () => `Expected element to have role="${expectedRole}", found role="${role}"`,
			};
		}

		if (!hasAccessibleName) {
			return {
				pass: false,
				message: () =>
					`Expected element with role="${role}" to have an accessible name via aria-label or aria-labelledby`,
			};
		}

		return {
			pass: true,
			message: () => `Element has proper semantics for a ${expectedRole} section`,
		};
	},
};

/**
 * Register custom matchers with Jest
 */
export function registerCustomMatchers() {
	expect.extend({
		toHaveProperHeadingStructure: (received) => customMatchers.toHaveProperHeadingStructure(received),
		toHaveProperSemanticsForSection: (received, expected) =>
			customMatchers.toHaveProperSemanticsForSection(received, expected),
	});
}

// Type definitions for the custom matchers
declare global {
	namespace jest {
		interface Matchers<R> {
			toHaveProperHeadingStructure(): R;
			toHaveProperSemanticsForSection(expectedRole: string): R;
		}
	}
}

// Re-export extended mocks
export const { MockSchedule, MockSponsors, MockRegistrationForm, MockLoadingSpinner, MockErrorBoundary } =
	extendedMocks;

export default {
	MockRegistrationLink,
	MockNavBar,
	MockFooter,
	MockTitle,
	MockIntersectionObserver,
	MockSchedule,
	MockSponsors,
	MockRegistrationForm,
	MockLoadingSpinner,
	MockErrorBoundary,
	commonAccessibilityChecks,
	navigationAccessibilityChecks,
	formAccessibilityChecks,
	createMockFormEvent,
	createMockData,
	registerCustomMatchers,
};
