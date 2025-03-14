import { render, screen } from "@testing-library/react";
import HackRPILink from "@/components/themed-components/hackrpi-link";

// Mock Next.js Link component
jest.mock("next/link", () => {
	return ({
		children,
		href,
		className,
		target,
		...rest
	}: {
		children: React.ReactNode;
		href: string;
		className?: string;
		target?: string;
		[key: string]: any;
	}) => {
		return (
			<a href={href} className={className} target={target} {...rest}>
				{children}
			</a>
		);
	};
});

describe("HackRPILink Component", () => {
	test("renders children content correctly", () => {
		render(<HackRPILink href="/test">Click Me</HackRPILink>);
		expect(screen.getByText("Click Me")).toBeInTheDocument();
	});

	test("renders with correct link href", () => {
		render(<HackRPILink href="/test-page">Test Link</HackRPILink>);
		const link = screen.getByRole("link", { name: /Test Link/i });
		expect(link).toHaveAttribute("href", "/test-page");
	});

	test("applies default styling", () => {
		render(<HackRPILink href="/test">Default Link</HackRPILink>);
		const link = screen.getByRole("link", { name: /Default Link/i });
		expect(link).toHaveClass("border-hackrpi-pink");
		expect(link).toHaveClass("text-hackrpi-orange");
		expect(link).toHaveClass("font-pix");
	});

	test("applies additional className from props", () => {
		render(
			<HackRPILink href="/test" className="custom-class">
				Custom Link
			</HackRPILink>,
		);
		const link = screen.getByRole("link", { name: /Custom Link/i });
		expect(link).toHaveClass("custom-class");
	});

	test("applies target attribute when provided", () => {
		render(
			<HackRPILink href="/test" target="_blank">
				External Link
			</HackRPILink>,
		);
		const link = screen.getByRole("link", { name: /External Link/i });
		expect(link).toHaveAttribute("target", "_blank");
	});

	test("includes SVG with correct styling", () => {
		render(<HackRPILink href="/test">Default Link</HackRPILink>);
		const link = screen.getByRole("link", { name: /Default Link/i });
		const svg = link.querySelector("svg");

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveClass("fill-hackrpi-pink");
		expect(svg).toHaveClass("group-hover:fill-hackrpi-yellow");
	});

	test("has appropriate transition classes for hover effects", () => {
		render(<HackRPILink href="/test">Hover Link</HackRPILink>);
		const link = screen.getByRole("link", { name: /Hover Link/i });

		expect(link).toHaveClass("hover:bg-hackrpi-pink");
		expect(link).toHaveClass("hover:text-hackrpi-yellow");
		expect(link).toHaveClass("transition-colors");
	});

	test("has appropriate font styling", () => {
		render(<HackRPILink href="/test">Font Test</HackRPILink>);
		const link = screen.getByRole("link", { name: /Font Test/i });

		expect(link).toHaveClass("font-pix");
		expect(link).toHaveClass("font-medium");
		expect(link).toHaveClass("text-3xl");
	});

	test("combines default classes with custom class correctly", () => {
		render(
			<HackRPILink href="/test" className="px-4 py-2">
				Combined Classes
			</HackRPILink>,
		);
		const link = screen.getByRole("link", { name: /Combined Classes/i });

		// Should have both default and custom classes
		expect(link).toHaveClass("px-4");
		expect(link).toHaveClass("py-2");
		expect(link).toHaveClass("border-hackrpi-pink");
	});
});
