/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { podiumPrizes, carouselPrizes } from "@/data/previous-prize-winners";

// Mock CSS import
jest.mock("@/app/globals.css", () => ({}), { virtual: true });

// Mock the components used in the Last Year page
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

jest.mock("@/components/prev-projects/project-display", () => {
	return function MockProjectDisplay({
		title,
		description,
		prizeCategory,
	}: {
		title: string;
		description: string;
		prizeCategory: string;
		authors?: string[];
		imageUrl?: string;
		imageOnLeft?: boolean;
	}) {
		return (
			<div data-testid="project-display">
				<div data-testid="project-name">{title}</div>
				<div data-testid="project-description">{description}</div>
				<div data-testid="project-winner">{prizeCategory}</div>
			</div>
		);
	};
});

jest.mock("@/components/prev-projects/project-carousel", () => {
	return function MockProjectCarousel({ projects }: { projects: any[] }) {
		return (
			<div data-testid="project-carousel">
				{projects.map((project, index) => (
					<div key={index} data-testid="carousel-project">
						{project.title}
					</div>
				))}
			</div>
		);
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
		return <img {...props} data-testid="mock-image" alt={props.alt} src={props.src} />;
	},
}));

// Import the component after all mocks are defined
import PastYearProjects from "@/app/last-year/page";

describe("Last Year Projects Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the main layout components", () => {
		render(<PastYearProjects />);

		// Check if the main structural components are rendered
		expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("renders page title", () => {
		render(<PastYearProjects />);

		// Check for the main headline
		expect(screen.getByText("Previous Projects From HackRPI XI")).toBeInTheDocument();
		expect(screen.getByText("A Memorable Time in HackRPI XI!")).toBeInTheDocument();
	});

	it("displays the jump to photos link", () => {
		render(<PastYearProjects />);

		// Check for the link to photos section
		const photoLink = screen.getByText("Jump to Photos");
		expect(photoLink).toBeInTheDocument();
		expect(photoLink).toHaveAttribute("href", "/last-year#photos");
	});

	it("renders the top projects using ProjectDisplay", () => {
		render(<PastYearProjects />);

		// Check if the top three projects are displayed
		const projectDisplays = screen.getAllByTestId("project-display");
		expect(projectDisplays).toHaveLength(3); // Top 3 projects

		// Verify the project names match those in the data
		const topProjects = podiumPrizes.slice(0, 3);
		const projectNames = screen.getAllByTestId("project-name");

		topProjects.forEach((project, index) => {
			expect(projectNames[index].textContent).toBe(project.title);
		});
	});

	it("renders the project carousel with other prize winners", () => {
		render(<PastYearProjects />);

		// Check if the project carousel is displayed
		const carousel = screen.getByTestId("project-carousel");
		expect(carousel).toBeInTheDocument();

		// Check if the carousel contains the expected number of projects
		const carouselProjects = screen.getAllByTestId("carousel-project");
		expect(carouselProjects).toHaveLength(carouselPrizes.length);
	});

	it("renders the photo gallery with images", () => {
		render(<PastYearProjects />);

		// Check for the images in the photo gallery
		const images = screen.getAllByTestId("mock-image");
		expect(images.length).toBeGreaterThan(10); // There should be many photos

		// Check if all images have alt text
		images.forEach((image) => {
			expect(image).toHaveAttribute("alt");
			expect(image.getAttribute("alt")).toContain("HackRPI");
		});
	});

	it("ensures images have proper paths", () => {
		render(<PastYearProjects />);

		// Check that all images have proper paths
		const images = screen.getAllByTestId("mock-image");
		images.forEach((image) => {
			const src = image.getAttribute("src");
			expect(src).toBeTruthy();
			expect(src).toContain("/lastYearPhotos/");
		});
	});

	it("has proper section separators", () => {
		render(<PastYearProjects />);

		// Check for horizontal separators between sections
		const horizontalRules = document.querySelectorAll("hr");
		expect(horizontalRules.length).toBeGreaterThan(2); // At least 3 separators (between top projects and carousel, before photos)
	});
});
