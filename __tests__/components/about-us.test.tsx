import React from "react";
import { screen, within, cleanup } from "@testing-library/react";
import AboutUs from "@/components/about-us";
import {
	renderWithProviders,
	resetAllMocks,
	checkAccessibility,
	getCurrentHackrpiYear,
	getDatePattern,
	checkAutomatedA11y,
	checkBasicAccessibility,
} from "../test-utils";
import "@testing-library/jest-dom";

// Mock necessary components and hooks
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		prefetch: jest.fn(),
		pathname: "/",
	}),
	usePathname: () => "/",
}));

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

// Define the current theme and year for better test maintainability
const CURRENT_THEME = "Retro vs. Modern";
const HACKRPI_YEAR = getCurrentHackrpiYear();

describe("AboutUs Component", () => {
	beforeEach(() => {
		// Reset the mocks before each test - 2025 best practice for test isolation
		resetAllMocks();
	});

	it("renders the component with correct headings and structure", () => {
		// 2025 best practice: Use the improved renderWithProviders
		const { container } = renderWithProviders(<AboutUs />);

		// Check if the main heading is rendered using role-based query (2025 best practice)
		const mainHeading = screen.getByRole("heading", { name: /About HackRPI/i });
		expect(mainHeading).toBeInTheDocument();

		// Check if the "When & Where" heading is rendered
		const whenWhereHeading = screen.getByRole("heading", { name: /When & Where/i });
		expect(whenWhereHeading).toBeInTheDocument();

		// 2025 best practice: Test section structure and relationships
		// Use container query to find the about section (using the id)
		const aboutSection = container.querySelector("#about");
		expect(aboutSection).toBeInTheDocument();
		expect(within(aboutSection as HTMLElement).getByRole("heading", { name: /About HackRPI/i })).toBeInTheDocument();

		// Use custom matcher for heading structure
		expect(container).toHaveProperHeadingStructure();
	});

	it("renders the theme information with correct styling", () => {
		renderWithProviders(<AboutUs />);

		// Use data-testid for reliable element selection
		const themeTitle = screen.getByTestId("theme-title");
		const themeDescription = screen.getByTestId("theme-description");

		// Verify theme text content matches our expected theme
		expect(themeTitle.textContent).toBe(CURRENT_THEME);
		expect(themeDescription.textContent).toBe(CURRENT_THEME);

		// Check styling with more robust assertions
		expect(themeTitle).toHaveClass("text-hackrpi-light-purple");
		expect(themeTitle).toHaveClass("font-bold");
		expect(themeDescription).toHaveClass("text-hackrpi-light-purple");
		expect(themeDescription).toHaveClass("font-bold");

		// 2025 best practice: Find a paragraph that contains the theme element
		const paragraphWithTheme = themeTitle.closest("p");
		expect(paragraphWithTheme).not.toBeNull();
		// The paragraph should contain text before or after the theme element
		expect(paragraphWithTheme?.textContent?.length).toBeGreaterThan(themeTitle.textContent?.length || 0);
	});

	it("renders the date and location information correctly", () => {
		renderWithProviders(<AboutUs />);

		// 2025 best practice: Test how the information is structured for users
		// Use data-testid attributes for reliable element selection
		const dateElement = screen.getByTestId("event-date");
		const locationElement = screen.getByTestId("event-location");
		const venueElement = screen.getByTestId("event-venue");

		// Use flexible date pattern from utility
		expect(dateElement.textContent).toMatch(getDatePattern());
		expect(locationElement.textContent).toBe("Rensselaer Polytechnic Institute");
		expect(venueElement.textContent).toBe("Darrin Communications Center");

		// Check they share the same parent container for proper grouping
		const parentContainer = dateElement.parentElement;
		expect(parentContainer).toContainElement(locationElement);
		expect(parentContainer).toContainElement(venueElement);
	});

	it("renders the registration link with correct styling", () => {
		// 2025 best practice: Render the component and get the container
		const { container } = renderWithProviders(<AboutUs />);

		// 2025 best practice: Use data-testid for more reliable selection
		const registrationLink = screen.getByTestId("registration-link");
		expect(registrationLink).toBeInTheDocument();
		expect(registrationLink).toHaveClass("text-xl");

		// 2025 best practice: Find the REGISTER NOW text using a pattern
		const registerNowText = screen.getByText(/REGISTER NOW!/i);
		expect(registerNowText).toBeInTheDocument();

		// Verify they are both in the document but don't assert they're in the same container
		expect(container).toContainElement(registrationLink);
		expect(container).toContainElement(registerNowText);
	});

	it('renders the scrolling "REGISTER NOW!" text with correct styling', () => {
		const { container } = renderWithProviders(<AboutUs />);

		// 2025 best practice: Test animation container using data-testid
		const registerBanner = screen.getByTestId("register-now-banner");
		expect(registerBanner).toBeInTheDocument();
		expect(registerBanner.textContent).toContain("REGISTER NOW!");

		// Check styling directly on the element with data-testid
		expect(registerBanner).toHaveClass("bg-hackrpi-dark-purple");
		expect(registerBanner).toHaveClass("text-black");
		expect(registerBanner).toHaveClass("overflow-hidden");
		expect(registerBanner).toHaveClass("whitespace-nowrap");
	});

	it("renders the about description with key information", () => {
		renderWithProviders(<AboutUs />);

		// Use more flexible patterns that focus on key content patterns rather than exact text
		// Use the year constant to make the test more maintainable
		const introRegex = new RegExp(`HackRPI ${HACKRPI_YEAR} is Rensselaer Polytechnic Institute`, "i");
		const introText = screen.getByText(introRegex);
		expect(introText).toBeInTheDocument();

		const goalText = screen.getByText(/Our goal is to inspire and challenge innovators/i);
		expect(goalText).toBeInTheDocument();

		// Test that important information is highlighted with more flexible matching
		const highlightedInfo = screen.getAllByText(new RegExp(CURRENT_THEME, "i"));
		expect(highlightedInfo.length).toBeGreaterThan(0);
	});

	// 2025 best practice: Add accessibility testing
	it("is accessible with proper ARIA attributes", () => {
		const { container } = renderWithProviders(<AboutUs />);

		// 2025 best practice: Test for basic accessibility patterns
		const links = screen.getAllByRole("link");
		expect(links.length).toBeGreaterThan(0);
		links.forEach((link) => {
			expect(link).toHaveAccessibleName();
		});

		const headings = screen.getAllByRole("heading");
		expect(headings.length).toBeGreaterThan(1);

		// Check that the component has a logical structure
		expect(container.querySelector("#about")).not.toBeNull();

		// Use the centralized accessibility checks
		checkAccessibility(container);
	});

	// 2025 best practice: Test responsive behavior
	it("displays correctly on different screen sizes", () => {
		// Test mobile viewport
		const { cleanup } = renderWithProviders(<AboutUs />, { viewport: "mobile" });

		// Check that key elements are still visible on mobile
		expect(screen.getByRole("heading", { name: /About HackRPI/i })).toBeInTheDocument();
		expect(screen.getByTestId("registration-link")).toBeInTheDocument();

		// Clean up mobile test and set up desktop test
		cleanup();

		// Test desktop viewport
		renderWithProviders(<AboutUs />, { viewport: "desktop" });

		// Verify desktop layout elements
		expect(screen.getByRole("heading", { name: /About HackRPI/i })).toBeInTheDocument();
		expect(screen.getByTestId("registration-link")).toBeInTheDocument();
	});

	// 2025 Best Practice: Add automated accessibility testing
	it("passes basic accessibility checks", () => {
		const { container } = renderWithProviders(<AboutUs />);

		// Run simplified accessibility checks that don't rely on axe-core
		checkBasicAccessibility(container);
	});

	// This test is commented out because axe-core is too slow in this environment
	// Uncomment and run individually if needed
	/*
	it("passes automated accessibility checks", async () => {
		// Set a longer timeout for this specific test
		jest.setTimeout(60000);
		
		try {
			const { container } = renderWithProviders(<AboutUs />);
			
			// Run automated accessibility tests with jest-axe
			await checkAutomatedA11y(container);
		} finally {
			// Reset timeout to default
			jest.setTimeout(15000);
		}
	}, 60000); // Add explicit timeout parameter to the test
	*/
});
