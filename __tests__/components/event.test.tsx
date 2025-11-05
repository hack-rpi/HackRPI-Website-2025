/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

// Mock CSS import
jest.mock("@/app/globals.css", () => ({}), { virtual: true });

// Mock the components used in the Event page
jest.mock("@/components/nav-bar/nav-bar", () => {
	return function MockNavBar({ showOnScroll }: { showOnScroll: boolean }) {
		return (
			<div data-testid="nav-bar" data-show-on-scroll={showOnScroll}>
				NavBar Component
			</div>
		);
	};
});

jest.mock("@/components/footer/footer", () => {
	return function MockFooter() {
		return <div data-testid="footer">Footer Component</div>;
	};
});

jest.mock("@/components/maps/maps", () => ({
	__esModule: true,
	default: () => <div data-testid="maps">Maps Component</div>,
	MapsDCCLow: () => <div data-testid="maps-dcc">DCC Map Component</div>,
}));

jest.mock("@/components/maps/google_maps", () => ({
	__esModule: true,
	default: () => <div data-testid="google-maps">Google Maps Component</div>,
}));

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
			<a data-testid={`hackrpi-link-${href.replace(/[^a-zA-Z0-9]/g, "-")}`} href={href} className={className}>
				{children}
			</a>
		);
	};
});

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		return <img {...props} data-testid="mock-image" alt={props.alt} src={props.src} />;
	},
}));

// Import the component after all mocks are defined
import EventPage from "@/app/(with-layout)/event/page";

describe("Event Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the main layout components", () => {
		render(<EventPage />);

		// Verify key structural headings render
		expect(screen.getByText("Location:")).toBeInTheDocument();
		expect(screen.getByText("Need Help?")).toBeInTheDocument();
	});

	it("renders the map component", () => {
		render(<EventPage />);

		// Check if the map component is rendered with the correct testId
		expect(screen.getByTestId("maps")).toBeInTheDocument();
	});

	it("displays event location information", () => {
		render(<EventPage />);

		// Check for the location heading and details
		expect(screen.getByText("Location:")).toBeInTheDocument();
		expect(screen.getByText("📍 Darrin Communications Center 📍")).toBeInTheDocument();
		expect(screen.getByText("Rensselaer Polytechnic Institute")).toBeInTheDocument();

		// Check for the address link
		const addressLink = screen.getByText("Darrin Communications Center, Troy, NY 12180");
		expect(addressLink).toBeInTheDocument();
		expect(addressLink).toHaveAttribute(
			"href",
			"https://maps.google.com/?q=Darrin+Communications+Center+51+College+Ave+Troy+NY+12180",
		);
	});

	it("displays parking information", () => {
		render(<EventPage />);

		// Check for the parking heading and details
		expect(screen.getByText("Free Parking")).toBeInTheDocument();
		expect(
			screen.getByText("Parking is available at North Hall Parking Lot, 2-minute walk to Darrin Communications Center"),
		).toBeInTheDocument();

		// Check for the parking address link
		const parkingLink = screen.getByText("North Lot, Troy, NY 12180");
		expect(parkingLink).toBeInTheDocument();
		expect(parkingLink).toHaveAttribute("href", "https://maps.google.com/?q=North+Lot+Troy+NY+12180");
	});

	it("displays project submission information", () => {
		render(<EventPage />);

		// Check for the project submission heading and details
		expect(screen.getByText("Project Submission and Judging")).toBeInTheDocument();

		// Check for the judging criteria section
		expect(screen.getByText("JUDGING CRITERIA")).toBeInTheDocument();

		// Check for the project submission section
		expect(screen.getByText("PROJECT SUBMISSION")).toBeInTheDocument();

		// Check for specific criteria headings - without colons now in the new design
		const criteriaHeadings = [
			"Practicality & Utility",
			"Creativity",
			"Technical Difficulty",
			"Effort",
			"User Experience",
			"Collaboration & Learning",
		];

		criteriaHeadings.forEach((heading) => {
			// Use getAllByText since some words might appear in descriptions too
			const elements = screen.getAllByText(heading, { exact: false });
			expect(elements.length).toBeGreaterThan(0);
		});
	});

	it("has proper styling and layout", () => {
		render(<EventPage />);

		// Check for the main container with proper background color
		const mainContainer = document.querySelector(".bg-hackrpi-dark-blue");
		expect(mainContainer).toBeInTheDocument();

		// Check for the help section with gradient background
		const helpSection = document.querySelector(".bg-gradient-to-r");
		expect(helpSection).toBeInTheDocument();
	});

	it("renders the Devpost submission link", () => {
		render(<EventPage />);

		// Check for the Devpost link - updated to 2025
		const devpostLink = screen.getByTestId("hackrpi-link-https---hackrpi2025-devpost-com-");
		expect(devpostLink).toBeInTheDocument();
		expect(devpostLink).toHaveAttribute("href", "https://hackrpi2025.devpost.com/");
		expect(devpostLink.textContent).toBe("SUBMIT ON DEVPOST");
	});

	it("renders mentoring and Discord information", () => {
		render(<EventPage />);

		// Check for the mentoring section
		expect(screen.getByText("MENTORING INFORMATION")).toBeInTheDocument();
		expect(screen.getByText("EVENT DISCORD")).toBeInTheDocument();

		// Check for the Discord link with specific testid
		const discordLink = screen.getByTestId("hackrpi-link-https---discord-gg-7b2zc8fe26");
		expect(discordLink).toHaveAttribute("href", "https://discord.gg/7b2zc8fe26");
	});
});
