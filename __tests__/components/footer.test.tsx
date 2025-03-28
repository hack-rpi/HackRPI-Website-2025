import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer/footer";

// Mock the components used in the Footer
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt, className }: { src: any; alt: string; className?: string }) => (
		<img src="mock-image-url" alt={alt} className={className} data-testid="next-image" />
	),
}));

// Mock logo import
jest.mock("@/public/HackRPI_Logo_Yellow_Arrow.png", () => ({
	default: "mock-logo-path",
}));

jest.mock("@/components/socials-links/social-links", () => {
	return function MockSocialLinks() {
		return <div data-testid="social-links">Social Links Component</div>;
	};
});

jest.mock("@/components/themed-components/registration-link", () => {
	return function MockRegistrationLink({ className }: { className?: string }) {
		return (
			<div data-testid="registration-link" className={className}>
				Registration Link
			</div>
		);
	};
});

describe("Footer Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the HackRPI logo", () => {
		render(<Footer />);

		// Check if the logo is rendered
		const logo = screen.getByTestId("next-image");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("alt", "HackRPI Logo");
	});

	it("renders the HackRPI title", () => {
		render(<Footer />);

		// Check if the title sections are rendered
		expect(screen.getByText("HackRPI")).toBeInTheDocument();
		expect(screen.getByText("Retro")).toBeInTheDocument();
		expect(screen.getByText("V.")).toBeInTheDocument();
		expect(screen.getByText("Modern")).toBeInTheDocument();
	});

	it("renders the location information", () => {
		render(<Footer />);

		// Check if the location details are rendered
		expect(screen.getByText("Darrin Communications Center @ Rensselaer Polytechnic Institute")).toBeInTheDocument();
		expect(screen.getByText("110 8th St, Troy, NY 12180")).toBeInTheDocument();
	});

	it("renders the registration link", () => {
		render(<Footer />);

		// Check if the registration link is rendered
		const registrationLink = screen.getByTestId("registration-link");
		expect(registrationLink).toBeInTheDocument();
		expect(registrationLink).toHaveClass("text-xl");
		expect(registrationLink).toHaveClass("mb-4");
	});

	it("renders the social links", () => {
		render(<Footer />);

		// Check if the social links component is rendered
		const socialLinks = screen.getByTestId("social-links");
		expect(socialLinks).toBeInTheDocument();
	});

	it("renders the copyright information", () => {
		render(<Footer />);

		// Check if the copyright text is rendered
		const madeWithElement = screen.getByText(/Made with/);
		expect(madeWithElement).toBeInTheDocument();

		// The heart emoji
		expect(screen.getByText("❤️")).toBeInTheDocument();

		// The byline - need to check text content of parent element
		expect(madeWithElement.textContent).toContain("by HackRPI");

		// Copyright notice
		expect(screen.getByText(/© 2025 HackRPI/)).toBeInTheDocument();
	});

	it("applies the correct styling", () => {
		const { container } = render(<Footer />);

		// Check if footer has the right classes
		const footerElement = container.firstChild as HTMLElement;

		// Check style properties
		expect(footerElement).toHaveStyle({
			background: expect.stringContaining("linear-gradient"),
		});

		// Check if the layout classes are applied
		expect(footerElement).toHaveClass("flex");
		expect(footerElement).toHaveClass("flex-col");
		expect(footerElement).toHaveClass("w-full");
	});
});
