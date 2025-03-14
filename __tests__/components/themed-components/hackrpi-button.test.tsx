import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HackRPIButton from "@/components/themed-components/hackrpi-button";

describe("HackRPIButton Component", () => {
	test("renders children content correctly", () => {
		render(<HackRPIButton>Click Me</HackRPIButton>);
		expect(screen.getByText("Click Me")).toBeInTheDocument();
	});

	test("applies default styling when not active", () => {
		render(<HackRPIButton>Default Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Default Button/i });
		expect(button).toHaveClass("border-hackrpi-pink");
		expect(button).toHaveClass("text-white");
		expect(button).not.toHaveClass("bg-hackrpi-pink");
	});

	test("applies active styling when active prop is true", () => {
		render(<HackRPIButton active={true}>Active Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Active Button/i });
		expect(button).toHaveClass("bg-hackrpi-pink");
		expect(button).toHaveClass("text-hackrpi-orange");
		expect(button).toHaveClass("border-hackrpi-pink");
	});

	test("calls onClick handler when clicked", () => {
		const handleClick = jest.fn();

		render(<HackRPIButton onClick={handleClick}>Clickable Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Clickable Button/i });

		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("applies additional className from props", () => {
		render(<HackRPIButton className="custom-class">Custom Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Custom Button/i });
		expect(button).toHaveClass("custom-class");
	});

	test("includes accessible attributes", () => {
		render(<HackRPIButton ariaLabel="Test Button">Accessible Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: "Test Button" });
		expect(button).toHaveAttribute("aria-label", "Test Button");
	});

	test("sets aria-pressed attribute when active", () => {
		render(<HackRPIButton active={true}>Active Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Active Button/i });
		expect(button).toHaveAttribute("aria-pressed", "true");
	});

	test("includes SVG with correct styling when not active", () => {
		render(<HackRPIButton>Default Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Default Button/i });
		const svg = button.querySelector("svg");

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveClass("fill-hackrpi-pink");
		expect(svg).not.toHaveClass("fill-hackrpi-orange");
	});

	test("includes SVG with correct styling when active", () => {
		render(<HackRPIButton active={true}>Active Button</HackRPIButton>);
		const button = screen.getByRole("button", { name: /Active Button/i });
		const svg = button.querySelector("svg");

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveClass("fill-hackrpi-orange");
		expect(svg).not.toHaveClass("fill-hackrpi-pink");
	});
});
