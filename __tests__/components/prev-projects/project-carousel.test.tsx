import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectCarousel, { ProjectCarouselProps } from "@/components/prev-projects/project-carousel";

// Mock Image component
jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

// Mock the react-multi-carousel module
jest.mock("react-multi-carousel", () => {
	return {
		__esModule: true,
		default: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
	};
});

// Mock the react-multi-carousel styles
jest.mock("react-multi-carousel/lib/styles.css", () => ({}));

describe("ProjectCarousel Component", () => {
	// Sample projects data for testing
	const mockProjects: ProjectCarouselProps[] = [
		{
			prizeCategory: "First Place",
			title: "Project Alpha",
			authors: ["John Doe", "Jane Smith"],
			description: "A revolutionary project that does amazing things",
			imageUrl: "/images/project1.jpg",
		},
		{
			prizeCategory: "Second Place",
			title: "Project Beta",
			authors: ["Bob Johnson", "Alice Williams"],
			description: "An innovative solution to a common problem",
			imageUrl: "/images/project2.jpg",
		},
	];

	it("renders carousel with all projects", () => {
		render(<ProjectCarousel projects={mockProjects} />);

		// Check if carousel component is rendered
		expect(screen.getByTestId("carousel")).toBeInTheDocument();

		// Check if both projects are rendered
		expect(screen.getByText("Project Alpha")).toBeInTheDocument();
		expect(screen.getByText("Project Beta")).toBeInTheDocument();
	});

	it("displays project details correctly", () => {
		render(<ProjectCarousel projects={mockProjects} />);

		// Check first project details
		expect(screen.getByText("First Place")).toBeInTheDocument();
		expect(screen.getByText("Project Alpha")).toBeInTheDocument();
		expect(screen.getByText("John Doe, Jane Smith")).toBeInTheDocument();
		expect(screen.getByText("A revolutionary project that does amazing things")).toBeInTheDocument();

		// Check second project details
		expect(screen.getByText("Second Place")).toBeInTheDocument();
		expect(screen.getByText("Project Beta")).toBeInTheDocument();
		expect(screen.getByText("Bob Johnson, Alice Williams")).toBeInTheDocument();
		expect(screen.getByText("An innovative solution to a common problem")).toBeInTheDocument();
	});

	it("renders project images with correct attributes", () => {
		render(<ProjectCarousel projects={mockProjects} />);

		// Check if images are rendered with correct attributes
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(2);

		expect(images[0]).toHaveAttribute("src");
		expect(images[0]).toHaveAttribute("alt", "Project Alpha");

		expect(images[1]).toHaveAttribute("src");
		expect(images[1]).toHaveAttribute("alt", "Project Beta");
	});

	it("applies correct styling to project cards", () => {
		render(<ProjectCarousel projects={mockProjects} />);

		// Get the project wrapper divs
		const projectWrappers = screen
			.getAllByText(/Project (Alpha|Beta)/)
			.map((element) => element.closest("div")?.closest("div"));

		// Check if project wrappers have the correct class
		projectWrappers.forEach((wrapper) => {
			if (wrapper) {
				expect(wrapper.classList.contains("w-full") || wrapper.classList.contains("w-11/12")).toBeTruthy();
			}
		});

		// Check the outer container has flex styling
		const cardsContainers = screen
			.getAllByText(/Project (Alpha|Beta)/)
			.map((element) => element.closest("div")?.closest("div")?.closest("div"));

		cardsContainers.forEach((container) => {
			if (container) {
				expect(container).toHaveClass("w-full");
			}
		});
	});

	it("handles empty projects array gracefully", () => {
		render(<ProjectCarousel projects={[]} />);

		// Should still render carousel but with no projects
		expect(screen.getByTestId("carousel")).toBeInTheDocument();
		expect(screen.queryByText("Project Alpha")).not.toBeInTheDocument();
	});
});
