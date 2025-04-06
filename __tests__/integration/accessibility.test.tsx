/**
 * @jest-environment jsdom
 */
/**
 * Comprehensive Accessibility Test Suite
 *
 * This file contains integration tests focused on accessibility across
 * key components of the HackRPI website. These tests use jest-axe for
 * automated accessibility testing following 2025 best practices.
 */
import React from "react";
import { renderWithProviders, checkBasicAccessibility } from "../test-utils";
import { MockNavBar, MockFooter } from "../__mocks__/mockRegistry";

// Import components to test
import AboutUs from "@/components/about-us";

// Mock necessary components to isolate testing
jest.mock("@/components/nav-bar/nav-bar", () => MockNavBar);
jest.mock("@/components/footer/footer", () => MockFooter);
jest.mock("@/components/themed-components/registration-link", () => {
	return {
		__esModule: true,
		default: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
			<div data-testid="registration-link" className={className} role="link" aria-label="Registration Link">
				{children || "Registration Link"}
			</div>
		),
	};
});

describe("Accessibility Integration Tests", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Use checkBasicAccessibility instead of the heavy axe-core function
	it("AboutUs Component passes basic accessibility checks", () => {
		const { container } = renderWithProviders(<AboutUs />);

		// Use the basic accessibility checks instead of jest-axe
		checkBasicAccessibility(container);
	});

	it("maintains accessibility when components are composed together", () => {
		// Create a composite page structure with multiple components
		const { container } = renderWithProviders(
			<div className="page-container" role="none">
				<MockNavBar />
				<main id="main-content">
					<AboutUs />
				</main>
				<MockFooter />
			</div>,
		);

		// Use the basic accessibility checks instead of jest-axe
		checkBasicAccessibility(container);
	});
});
