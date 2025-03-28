/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

// Mock CSS import
jest.mock("@/app/globals.css", () => ({}), { virtual: true });

// Mock the components used in the Resources page
jest.mock("@/components/nav-bar/nav-bar", () => {
	return function MockNavBar() {
		return <div data-testid="nav-bar">NavBar Component</div>;
	};
});

jest.mock("@/components/footer/footer", () => {
	return function MockFooter() {
		return <div data-testid="footer">Footer Component</div>;
	};
});

jest.mock("@/components/themed-components/hackrpi-link", () => {
	return function MockHackRPILink({
		href,
		children,
		className,
	}: {
		href: string;
		children: React.ReactNode;
		className?: string;
	}) {
		return (
			<a data-testid="hackrpi-link" href={href} className={className}>
				{children}
			</a>
		);
	};
});

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		return <img {...props} data-testid="mock-image" />;
	},
}));

// Import the component after all mocks are defined
import ResourcesPage from "@/app/resources/page";

describe("Resources Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the main layout components", () => {
		render(<ResourcesPage />);

		// Check if the main structural components are rendered
		expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("renders all resource section headings", () => {
		render(<ResourcesPage />);

		// Verify all section headings are present
		expect(screen.getByText("Web Development")).toBeInTheDocument();
		expect(screen.getByText("Intro to Git and GitHub")).toBeInTheDocument();
		expect(screen.getByText("Mapping Data using Leaflet.js")).toBeInTheDocument();
		expect(screen.getByText("Desktop Development")).toBeInTheDocument();
		expect(screen.getByText("Submitting Your Project")).toBeInTheDocument();

		// For headings that appear multiple times, use a more specific selector
		const claudeHeading = screen.getAllByText("Anthropic Claude's Computer Use API")[0];
		expect(claudeHeading).toBeInTheDocument();
		expect(claudeHeading.tagName).toBe("H2"); // Should be a heading element

		const wolframHeading = screen.getByText("Wolfram|One API", { selector: "h2" });
		expect(wolframHeading).toBeInTheDocument();
	});

	it("renders embedded presentation iframes", () => {
		render(<ResourcesPage />);

		// Count the number of iframes for embedded presentations
		const iframes = document.querySelectorAll("iframe");
		expect(iframes.length).toBe(5); // Five presentation iframes
	});

	it("renders external resource links correctly", () => {
		render(<ResourcesPage />);

		// Check if the links to external resources exist
		const hackrpiLinks = screen.getAllByTestId("hackrpi-link");

		// Find Claude link specifically
		const claudeLink = hackrpiLinks.find((link) => link.getAttribute("href")?.includes("docs.anthropic.com"));
		expect(claudeLink).toBeDefined();
		expect(claudeLink).toHaveAttribute("href", "https://docs.anthropic.com/en/docs/build-with-claude/computer-use");

		// Find Wolfram link specifically
		const wolframLink = hackrpiLinks.find((link) => link.getAttribute("href")?.includes("wolfram.com"));
		expect(wolframLink).toBeDefined();
		expect(wolframLink).toHaveAttribute("href", "https://account.wolfram.com/redeem/zHackRPI1124");
	});

	it("renders explanatory text for the Wolfram API", () => {
		render(<ResourcesPage />);

		// Check if the explanatory text for Wolfram API is present
		expect(screen.getByText(/This URL will take you to a sign-in page/)).toBeInTheDocument();
		expect(screen.getByText(/Wolfram\|One is a powerful computational software/)).toBeInTheDocument();
	});

	it("renders explanatory text for the Claude API", () => {
		render(<ResourcesPage />);

		// Check if the explanatory text for Claude API is present
		expect(screen.getByText(/The upgraded Claude 3.5 Sonnet model is capable of/)).toBeInTheDocument();
	});

	it("applies correct layout and styling classes", () => {
		render(<ResourcesPage />);

		// Verify the main container has the correct classes
		const webDevElement = screen.getByText("Web Development");
		const mainContainer = webDevElement.closest("div")?.parentElement?.parentElement;

		if (mainContainer) {
			expect(mainContainer).toHaveClass("flex", "flex-col", "w-full", "h-fit", "min-h-screen");
		} else {
			fail("Could not find main container element");
		}

		// Verify the resource grid has correct classes
		const resourceGrid = webDevElement.closest("div")?.parentElement;

		if (resourceGrid) {
			expect(resourceGrid).toHaveClass("flex", "flex-wrap", "justify-center", "gap-12");
		} else {
			fail("Could not find resource grid element");
		}
	});
});
