import React from "react";
import { render, screen } from "@testing-library/react";
import Sponsors from "@/components/sponsors";

// Mock the next/image component
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
		<img src={src} alt={alt} className={className} data-testid="next-image" />
	),
}));

// Mock the sponsors data
jest.mock(
	"@/public/sponsors/sponsors.json",
	() => ({
		Obsidian: [
			{
				name: "Test Obsidian Sponsor",
				url: "https://example.com/obsidian",
				logoPath: "/test-obsidian.png",
			},
		],
		Gold: [
			{
				name: "Test Gold Sponsor",
				url: "https://example.com/gold",
				logoPath: "/test-gold.png",
			},
		],
		Silver: [
			{
				name: "Test Silver Sponsor",
				url: "https://example.com/silver",
				logoPath: "/test-silver.png",
			},
		],
		Bronze: [],
		Collaborators: [
			{
				name: "Test Collaborator",
				url: "https://example.com/collaborator",
				logoPath: "/test-collaborator.png",
			},
		],
	}),
	{ virtual: true },
);

describe("Sponsors Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the sponsors component with heading", () => {
		render(<Sponsors />);

		// Check if the main heading is rendered
		const heading = screen.getByText("Thank you to our sponsors that make HackRPI possible!");
		expect(heading).toBeInTheDocument();
	});

	it("renders sponsor tiers with correct headings", () => {
		render(<Sponsors />);

		// Check tier headings are rendered
		expect(screen.getByText("Obsidian")).toBeInTheDocument();
		expect(screen.getByText("Gold")).toBeInTheDocument();
		expect(screen.getByText("Silver")).toBeInTheDocument();
		expect(screen.getByText("Collaborators")).toBeInTheDocument();

		// Bronze should not appear as it has no sponsors
		expect(screen.queryByText("Bronze")).not.toBeInTheDocument();
	});

	it("renders sponsor logos with correct attributes", () => {
		render(<Sponsors />);

		// Check all images are rendered
		const images = screen.getAllByTestId("next-image");
		expect(images.length).toBe(4); // 4 sponsors total

		// Check alt text for images
		const altTexts = images.map((img) => img.getAttribute("alt"));
		expect(altTexts).toContain("Test Obsidian Sponsor");
		expect(altTexts).toContain("Test Gold Sponsor");
		expect(altTexts).toContain("Test Silver Sponsor");
		expect(altTexts).toContain("Test Collaborator");
	});

	it("renders sponsor links with correct URLs", () => {
		render(<Sponsors />);

		// Check if links point to correct URLs
		const links = screen.getAllByRole("link");

		// Extract href values
		const hrefs = links.map((link) => link.getAttribute("href"));

		// Check expected URLs are present
		expect(hrefs).toContain("https://example.com/obsidian");
		expect(hrefs).toContain("https://example.com/gold");
		expect(hrefs).toContain("https://example.com/silver");
		expect(hrefs).toContain("https://example.com/collaborator");
	});

	it("applies correct styling to the sponsor container", () => {
		render(<Sponsors />);

		// The main container should have the right background gradient class
		const container = screen.getByText("Thank you to our sponsors that make HackRPI possible!").parentElement
			?.parentElement;
		expect(container).toHaveClass("bg-gradient-to-b");
		expect(container).toHaveClass("from-hackrpi-dark-blue");
		expect(container).toHaveClass("via-hackrpi-orange");
		expect(container).toHaveClass("to-hackrpi-dark-blue");
	});

	it("applies hover effects to sponsor containers", () => {
		render(<Sponsors />);

		// Get sponsor containers and check for hover classes
		const sponsorContainers = screen.getAllByRole("link").map((link) => link.parentElement);

		sponsorContainers.forEach((container) => {
			expect(container).toHaveClass("hover:scale-110");
			expect(container).toHaveClass("hover:bg-opacity-15");
			expect(container).toHaveClass("transition-all");
		});
	});
});
