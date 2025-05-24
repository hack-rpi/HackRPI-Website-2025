import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tile from "@/components/game/tile";

describe("Game Tile Component", () => {
	it("renders an empty tile when value is 0", () => {
		render(<Tile value={0} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("");
		expect(tile).toHaveClass("bg-gray-200");
		expect(tile).toHaveClass("empty");
	});

	it("renders a tile with value 2 correctly", () => {
		render(<Tile value={2} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("2");
		expect(tile).toHaveClass("bg-radial-yellow-200");
		expect(tile).toHaveClass("text-gray-700");
		expect(tile).not.toHaveClass("empty");
	});

	it("renders a tile with value 4 correctly", () => {
		render(<Tile value={4} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("4");
		expect(tile).toHaveClass("bg-radial-yellow-300");
		expect(tile).toHaveClass("text-gray-600");
	});

	it("renders a tile with value 8 correctly", () => {
		render(<Tile value={8} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("8");
		expect(tile).toHaveClass("bg-radial-yellow-400");
		expect(tile).toHaveClass("text-gray-500");
	});

	it("renders a tile with value 16 correctly", () => {
		render(<Tile value={16} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("16");
		expect(tile).toHaveClass("bg-radial-yellow-500");
		expect(tile).toHaveClass("text-gray-400");
	});

	it("renders a tile with value 32 correctly", () => {
		render(<Tile value={32} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("32");
		expect(tile).toHaveClass("bg-radial-yellow-600");
		expect(tile).toHaveClass("text-gray-300");
	});

	it("renders a tile with value 64 correctly", () => {
		render(<Tile value={64} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("64");
		expect(tile).toHaveClass("bg-radial-yellow-700");
		expect(tile).toHaveClass("text-gray-200");
	});

	it("renders a tile with value 128 correctly", () => {
		render(<Tile value={128} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("128");
		expect(tile).toHaveClass("bg-radial-green-200");
		expect(tile).toHaveClass("text-gray-700");
	});

	it("renders a tile with value 256 correctly", () => {
		render(<Tile value={256} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("256");
		expect(tile).toHaveClass("bg-radial-green-300");
		expect(tile).toHaveClass("text-gray-600");
	});

	it("renders a tile with value 512 correctly", () => {
		render(<Tile value={512} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("512");
		expect(tile).toHaveClass("bg-radial-green-400");
		expect(tile).toHaveClass("text-gray-500");
	});

	it("renders a tile with value 1024 correctly", () => {
		render(<Tile value={1024} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("1024");
		expect(tile).toHaveClass("bg-radial-green-500");
		expect(tile).toHaveClass("text-gray-400");
	});

	it("renders a tile with value 2048 correctly", () => {
		render(<Tile value={2048} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("2048");
		expect(tile).toHaveClass("bg-radial-green-600");
		expect(tile).toHaveClass("text-gray-300");
	});

	it("renders a tile with unknown value correctly using the default case", () => {
		render(<Tile value={4096} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveTextContent("4096");
		expect(tile).toHaveClass("bg-black");
		expect(tile).toHaveClass("text-gray-100");
	});

	it("applies common styling to all tiles", () => {
		render(<Tile value={2} />);

		const tile = screen.getByTestId("tile");
		expect(tile).toHaveClass("flex");
		expect(tile).toHaveClass("justify-center");
		expect(tile).toHaveClass("items-center");
		expect(tile).toHaveClass("rounded-lg");
		expect(tile).toHaveClass("shadow-lg");
		expect(tile).toHaveClass("w-full");
		expect(tile).toHaveClass("h-full");
		expect(tile).toHaveClass("text-4xl");
		expect(tile).toHaveClass("font-bold");
	});
});
