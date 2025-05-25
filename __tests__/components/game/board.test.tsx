import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "@/components/game/board";

describe("Game Board Component", () => {
	it("renders an empty 4x4 grid correctly", () => {
		const emptyGrid = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		render(<Board grid={emptyGrid} />);

		// Check if we have 16 tiles (4x4 grid)
		const tiles = screen.getAllByTestId("tile");
		expect(tiles).toHaveLength(16);

		// Check if all tiles are empty (containing no text)
		tiles.forEach((tile) => {
			expect(tile).toHaveTextContent("");
		});
	});

	it("renders tiles with correct values", () => {
		const grid = [
			[2, 4, 8, 16],
			[32, 64, 128, 256],
			[512, 1024, 2048, 0],
			[0, 0, 0, 0],
		];

		render(<Board grid={grid} />);

		// Check if tiles display the correct values
		const tiles = screen.getAllByTestId("tile");

		// First row
		expect(tiles[0]).toHaveTextContent("2");
		expect(tiles[1]).toHaveTextContent("4");
		expect(tiles[2]).toHaveTextContent("8");
		expect(tiles[3]).toHaveTextContent("16");

		// Second row
		expect(tiles[4]).toHaveTextContent("32");
		expect(tiles[5]).toHaveTextContent("64");
		expect(tiles[6]).toHaveTextContent("128");
		expect(tiles[7]).toHaveTextContent("256");

		// Third row
		expect(tiles[8]).toHaveTextContent("512");
		expect(tiles[9]).toHaveTextContent("1024");
		expect(tiles[10]).toHaveTextContent("2048");
		expect(tiles[11]).toHaveTextContent("");

		// Fourth row (all empty)
		expect(tiles[12]).toHaveTextContent("");
		expect(tiles[13]).toHaveTextContent("");
		expect(tiles[14]).toHaveTextContent("");
		expect(tiles[15]).toHaveTextContent("");
	});

	it("preserves grid dimensions with non-standard grid sizes", () => {
		// Testing with a 3x3 grid
		const smallGrid = [
			[2, 4, 8],
			[16, 32, 64],
			[128, 256, 512],
		];

		render(<Board grid={smallGrid} />);

		// Check if we have 9 tiles (3x3 grid)
		const tiles = screen.getAllByTestId("tile");
		expect(tiles).toHaveLength(9);
	});

	it("handles very large numbers correctly", () => {
		const gridWithLargeNumber = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 4096], // larger than the defined cases in the Tile component
		];

		render(<Board grid={gridWithLargeNumber} />);

		// Check if the large number is displayed correctly
		const tiles = screen.getAllByTestId("tile");
		expect(tiles[15]).toHaveTextContent("4096");
	});

	it("applies correct structural styling", () => {
		const emptyGrid = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		render(<Board grid={emptyGrid} />);

		// Check if the board has the correct grid layout
		const board = screen.getAllByTestId("tile")[0].parentElement?.parentElement;
		expect(board).toHaveClass("grid");
		expect(board).toHaveClass("grid-cols-4");
		expect(board).toHaveClass("gap-2");
	});
});
