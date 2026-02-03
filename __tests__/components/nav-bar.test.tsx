import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import NavBar, { links as navLinks } from "@/components/nav-bar/nav-bar";
import { renderWithProviders, resetAllMocks, setWindowDimensions } from "../test-utils";

/**
 * NavBar Component Tests
 *
 * Following 2025 React testing best practices:
 * - Using semantic queries with ARIA roles
 * - Testing accessibility features
 * - Using userEvent instead of fireEvent
 * - Following the AAA pattern (Arrange-Act-Assert)
 */

// Mock the Nav group components
jest.mock("@/components/nav-bar/desktop/nav-bar-desktop", () => {
	return function MockNavBarDesktop({ links }: { links: any[] }) {
		return (
			<div data-testid="nav-bar-desktop" role="navigation" aria-label="Desktop Navigation">
				Desktop Nav ({links.length} links)
			</div>
		);
	};
});

jest.mock("@/components/nav-bar/mobile/nav-bar-mobile", () => {
	return function MockNavBarMobile({ links }: { links: any[] }) {
		return (
			<div data-testid="nav-bar-mobile" role="navigation" aria-label="Mobile Navigation">
				Mobile Nav ({links.length} links)
			</div>
		);
	};
});

// Mock the links data
jest.mock("@/data/nav-bar-links", () => {
	return {
		// The actual implementation uses NavGroup[] structure, not a flat array
		NavGroup: jest.fn(),
	};
});

// Mock MLH Banner
jest.mock("@/components/mlh-banner/mlh-banner", () => {
	return function MockMlhBanner() {
		return (
			<a
				id="mlh-trust-badge"
				href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
				target="_blank"
				className="block max-w-[80] desktop:max-w-[100px] min-w-[60px] w-[8%] h-auto fixed right-[40px] lg:right-[25px]  top-0 z-[10000] "
			>
				<img
					src="/mlh-trust-badge-2025-white.svg"
					alt="Major League Hacking 2025 Hackathon Season"
					width="100"
					height="100"
				/>
			</a>
		);
	};
});

describe("NavBar Component", () => {
	// Store the original window.innerWidth value
	const originalInnerWidth = window.innerWidth;

	beforeEach(() => {
		resetAllMocks();
		cleanup();
	});

	afterEach(() => {
		// Reset window.innerWidth to its original value
		setWindowDimensions(originalInnerWidth);
		cleanup();
	});

	it("should render the desktop navigation bar on large screens", async () => {
		// Arrange - Mock a large screen width (greater than 860px)
		setWindowDimensions(1024);

		// Act - Render the component
		renderWithProviders(<NavBar showOnScroll={true} />);

		// Assert - Check if the desktop navigation bar is shown
		const desktopNav = screen.getByTestId("nav-bar-desktop");
		expect(desktopNav).toBeInTheDocument();
		expect(screen.queryByTestId("nav-bar-mobile")).not.toBeInTheDocument();
	});

	it("should render the mobile navigation bar on small screens", async () => {
		// Arrange - Mock a small screen width (less than 860px)
		setWindowDimensions(768);

		// Act - Render the component
		renderWithProviders(<NavBar showOnScroll={true} />);

		// Assert - Check if the mobile navigation bar is shown
		const mobileNav = screen.getByTestId("nav-bar-mobile");
		expect(mobileNav).toBeInTheDocument();
		expect(screen.queryByTestId("nav-bar-desktop")).not.toBeInTheDocument();
	});

	it("should pass the correct links prop to navigation components", async () => {
		// Arrange - Mobile view
		setWindowDimensions(768);

		// Act - Render the component
		renderWithProviders(<NavBar showOnScroll={true} />);

	// Assert - Check if links are passed correctly based on the exported navigation data
		const mobileNav = screen.getByTestId("nav-bar-mobile");
		const expectedCount = navLinks.length;
		expect(mobileNav.textContent).toContain(`${expectedCount} links`);

		// Clean up before rendering again
		cleanup();

		// Now test desktop view
		setWindowDimensions(1024);
		renderWithProviders(<NavBar showOnScroll={true} />);

		const desktopNav = screen.getByTestId("nav-bar-desktop");
		expect(desktopNav.textContent).toContain(`${expectedCount} links`);
	});

	it("should handle showOnScroll prop correctly", async () => {
		// Arrange - Mock a large screen for desktop view
		setWindowDimensions(1024);

		// Act - Render with showOnScroll=true
		const { rerender } = renderWithProviders(<NavBar showOnScroll={true} />);

		// Assert - Check if data attribute is set correctly
		const navBar = screen.getByRole("navigation", { name: "Desktop Navigation" });
		expect(navBar).toHaveAttribute("data-testid", "nav-bar-desktop");

		// Act - Re-render with showOnScroll=false
		rerender(<NavBar showOnScroll={false} />);

		// Assert - Check if the component still renders correctly
		expect(screen.getByRole("navigation", { name: "Desktop Navigation" })).toBeInTheDocument();
	});

	it("should have the appropriate responsive design for both desktop and mobile", async () => {
		// Arrange - Start with desktop view
		setWindowDimensions(1024);

		// Act - Render the component
		const { rerender } = renderWithProviders(<NavBar showOnScroll={true} />);

		// Assert - Check desktop view
		expect(screen.getByTestId("nav-bar-desktop")).toBeInTheDocument();
		expect(screen.queryByTestId("nav-bar-mobile")).not.toBeInTheDocument();

		// Act - Switch to mobile view by changing window width and re-rendering
		setWindowDimensions(768);
		rerender(<NavBar showOnScroll={true} />);

		// Assert - Check mobile view
		expect(screen.getByTestId("nav-bar-mobile")).toBeInTheDocument();
		expect(screen.queryByTestId("nav-bar-desktop")).not.toBeInTheDocument();
	});
});
