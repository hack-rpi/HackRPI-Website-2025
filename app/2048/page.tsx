"use client";

import { useState } from "react";
// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect } from "react";
import NavBar from "@/components/nav-bar/nav-bar";
import Board from "@/components/game/board";
import GameOver from "@/components/game/game-over";
import HackRPIButton from "@/components/themed-components/hackrpi-button";

import { create_leaderboard_entry, is_game_ready } from "@/app/actions";

import "@/app/globals.css";

export default function Page() {
	const [grid, setGrid] = useState<number[][]>([
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]);

	const [score, setScore] = useState(0);
	const [gameOver, setIsGameOver] = useState(false);
	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;

	const initializeGame = () => {
		let newGrid = [...grid];
		newGrid = placeRandomTile(newGrid);
		newGrid = placeRandomTile(newGrid);
		setGrid(newGrid);
	};

	const placeRandomTile = (grid: number[][]): number[][] => {
		const emptyTiles: Array<[number, number]> = [];

		grid.forEach((row, rowIndex) => {
			row.forEach((tile, colIndex) => {
				if (tile === 0) {
					emptyTiles.push([rowIndex, colIndex]);
				}
			});
		});

		if (emptyTiles.length > 0) {
			const randomIndex = Math.floor(Math.random() * emptyTiles.length);
			const [row, col] = emptyTiles[randomIndex];
			grid[row][col] = Math.random() > 0.5 ? 2 : 4;
		}

		return grid;
	};

	const addRandomTile = (grid: number[][]): number[][] => {
		const emptyPositions: [number, number][] = [];

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (grid[i][j] === 0) {
					emptyPositions.push([i, j]);
				}
			}
		}

		if (emptyPositions.length === 0) {
			return grid;
		}

		const [row, col] = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];

		const newValue = Math.random() < 0.9 ? 2 : 4;

		grid[row][col] = newValue;

		return grid;
	};

	const handleSwipe = (
		startx: number,
		starty: number,
		endx: number,
		endy: number,
		setGrid: (gridUpdater: (prevGrid: number[][]) => number[][]) => void,
	) => {
		const deltax = endx - startx;
		const deltay = endy - starty;

		setGrid((prevGrid: number[][]) => {
			let newGrid = [...prevGrid];
			let moved = false;

			if (deltax > 0 && Math.abs(deltax) > Math.abs(deltay)) {
				const rightGrid = moveRight(newGrid);
				moved = JSON.stringify(rightGrid) !== JSON.stringify(newGrid);
				newGrid = rightGrid;
			} else if (deltax < 0 && Math.abs(deltax) > Math.abs(deltay)) {
				const leftGrid = moveLeft(newGrid);
				moved = JSON.stringify(leftGrid) !== JSON.stringify(newGrid);
				newGrid = leftGrid;
			} else if (deltay < 0 && Math.abs(deltax) < Math.abs(deltay)) {
				const upGrid = moveUp(newGrid);
				moved = JSON.stringify(upGrid) !== JSON.stringify(newGrid);
				newGrid = upGrid;
			} else if (deltay > 0 && Math.abs(deltax) < Math.abs(deltay)) {
				const downGrid = moveDown(newGrid);
				moved = JSON.stringify(downGrid) !== JSON.stringify(newGrid);
				newGrid = downGrid;
			}

			if (moved) {
				newGrid = addRandomTile(newGrid);
			}

			setIsGameOver(isGameOver(newGrid));

			return newGrid;
		});
	};

	// Handle touch start
	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
	};

	// Handle touch move
	const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		endX = event.touches[0].clientX;
		endY = event.touches[0].clientY;
	};

	const handleTouchEnd = () => {
		handleSwipe(startX, startY, endX, endY, setGrid);
	};

	const handleKeyPress = (
		e: KeyboardEvent,
		grid: number[][],
		setGrid: (gridUpdater: (prevGrid: number[][]) => number[][]) => void,
	) => {
		setGrid((prevGrid: number[][]) => {
			let newGrid = [...prevGrid];
			let moved = false;

			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
				e.preventDefault();
			}

			switch (e.key) {
				case "ArrowUp":
					// eslint-disable-next-line
					const upGrid = moveUp(newGrid);
					moved = JSON.stringify(upGrid) !== JSON.stringify(newGrid);
					newGrid = upGrid;
					break;
				case "ArrowDown":
					// eslint-disable-next-line
					const downGrid = moveDown(newGrid);
					moved = JSON.stringify(downGrid) !== JSON.stringify(newGrid);
					newGrid = downGrid;
					break;
				case "ArrowLeft":
					// eslint-disable-next-line
					const leftGrid = moveLeft(newGrid);
					moved = JSON.stringify(leftGrid) !== JSON.stringify(newGrid);
					newGrid = leftGrid;
					break;
				case "ArrowRight":
					// eslint-disable-next-line
					const rightGrid = moveRight(newGrid);
					moved = JSON.stringify(rightGrid) !== JSON.stringify(newGrid);
					newGrid = rightGrid;
					break;
				default:
					return prevGrid;
			}

			if (moved) {
				newGrid = addRandomTile(newGrid);
			}

			setIsGameOver(isGameOver(newGrid));

			return newGrid;
		});
	};

	const moveLeft = (grid: number[][]): number[][] => {
		let newScore = 0;
		const newGrid = grid.map((row) => {
			const filteredRow = row.filter((tile) => tile !== 0);

			for (let i = 0; i < filteredRow.length - 1; i++) {
				if (filteredRow[i] === filteredRow[i + 1]) {
					filteredRow[i] *= 2;
					newScore += filteredRow[i] / 2;
					filteredRow[i + 1] = 0;
					i++;
				}
			}

			const mergedRow = filteredRow.filter((tile) => tile !== 0);

			while (mergedRow.length < row.length) {
				mergedRow.push(0);
			}

			return mergedRow;
		});

		setScore((prevScore) => prevScore + newScore);
		return newGrid;
	};

	const moveRight = (grid: number[][]): number[][] => {
		return grid.map((row) => {
			const reversedRow = row.slice().reverse();
			const newRow = moveLeft([reversedRow])[0];
			return newRow.reverse();
		});
	};

	const moveUp = (grid: number[][]): number[][] => {
		const newGrid: number[][] = Array.from({ length: grid.length }, () => new Array(grid[0].length).fill(0));
		let newScore = 0;

		for (let col = 0; col < grid[0].length; col++) {
			const filteredColumn = grid.map((row) => row[col]).filter((tile) => tile !== 0);

			for (let i = 0; i < filteredColumn.length - 1; i++) {
				if (filteredColumn[i] === filteredColumn[i + 1]) {
					filteredColumn[i] *= 2;
					newScore += filteredColumn[i] / 2;
					filteredColumn[i + 1] = 0;
					i++;
				}
			}

			const mergedColumn = filteredColumn.filter((tile) => tile !== 0);

			while (mergedColumn.length < grid.length) {
				mergedColumn.push(0);
			}

			for (let row = 0; row < grid.length; row++) {
				if (!newGrid[row]) {
					newGrid[row] = [];
				}
				newGrid[row][col] = mergedColumn[row];
			}
		}

		setScore((prevScore) => prevScore + newScore);
		return newGrid;
	};

	const moveDown = (grid: number[][]): number[][] => {
		const newGrid: number[][] = Array.from({ length: grid.length }, () => new Array(grid[0].length).fill(0));
		let newScore = 0;

		for (let col = 0; col < grid[0].length; col++) {
			const filteredColumn = grid.map((row) => row[col]).filter((tile) => tile !== 0);

			for (let i = filteredColumn.length - 1; i > 0; i--) {
				if (filteredColumn[i] === filteredColumn[i - 1]) {
					filteredColumn[i] *= 2;
					newScore += filteredColumn[i] / 2;
					filteredColumn[i - 1] = 0;
					i++;
				}
			}

			const mergedColumn = filteredColumn.filter((tile) => tile !== 0);

			while (mergedColumn.length < grid.length) {
				mergedColumn.unshift(0);
			}

			for (let row = 0; row < grid.length; row++) {
				newGrid[row][col] = mergedColumn[row];
			}
		}

		setScore((prevScore) => prevScore + newScore);
		return newGrid;
	};

	const resetGame = () => {
		const newGrid = Array(4)
			.fill(null)
			.map(() => Array(4).fill(0));

		for (let i = 0; i < 2; i++) {
			addRandomTile(newGrid);
		}

		setScore(0);
		return newGrid;
	};

	const handleReset = () => {
		setGrid(resetGame());
	};

	const isGameOver = (grid: number[][]): boolean => {
		for (const row of grid) {
			if (row.includes(0)) return false;
		}

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (
					(j < grid[i].length - 1 && grid[i][j] === grid[i][j + 1]) ||
					(i < grid.length - 1 && grid[i][j] === grid[i + 1][j])
				) {
					return false;
				}
			}
		}

		return true;
	};

	const handleCloseGameOver = () => {
		setIsGameOver(false);
		setGrid(resetGame());
	};

	const handleSubmit = async (username: string) => {
		const response = await create_leaderboard_entry({
			username,
			score,
		});

		if (response.status === 200) {
			handleCloseGameOver();
		} else {
			alert(response.message);
		}
	};

	const handleExit = () => {
		setIsGameOver(false);
	};
	const [gameReady, setGameReady] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const checkGameReady = async () => {
			const response = await is_game_ready();
			setGameReady(response);
		};

		const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e, grid, setGrid);

		window.addEventListener("keydown", handleKeyDown);

		window.addEventListener("load", () => {
			document.body.style.paddingTop = "1px";
		});

		checkGameReady();
		initializeGame();
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	if (gameReady === false) {
		return (
			<div
				className="flex flex-col items-start desktop:items-center justify-start w-full h-screen"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<NavBar showOnScroll={false}></NavBar>

				<div className="flex-grow flex-shrink basis-auto flex flex-col w-full items-center justify-center">
					<div className="flex-grow items-center justify-center basis-auto flex flex-col">
						<p className="text-white mt-24 text-2xl w-11/12 text-center">
							2048 Will be available to play at 9:00 AM November 9th to 11:00 AM November 11th.
						</p>
						<div className="flex items-center justify-around">
							<h1 className="flex-1 items-center justify-center text-center basis-auto text-6xl font-bold mt-4 p-0">
								2048
							</h1>
						</div>
					</div>
					<div className="flex-grow mt-24"></div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="flex flex-col items-start desktop:items-center justify-start w-full h-screen"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<NavBar showOnScroll={false}></NavBar>

			<div className="flex-grow mt-30"></div>
			<div className="flex-grow flex-shrink basis-auto flex flex-col w-full items-center justify-center">
				<div className="flex-grow items-center justify-center basis-auto flex flex-col">
					<p className="text-white mt-24">Use arrow keys or swipe to move blocks.</p>
					<div className="flex items-center justify-around">
						<HackRPIButton className="flex-1 w-100" onClick={handleReset}>
							Reset Game
						</HackRPIButton>
						<h1 className="flex-1 items-center justify-center text-center basis-auto text-6xl font-bold m-0 p-0">
							2048
						</h1>
						<h2 className="flex-1 text-center m-0 p-0 w-100 text-4xl">Score: {score}</h2>
					</div>
					<div className="flex w-full items-center justify-center">
						<Board grid={grid} />
					</div>
					{gameOver && <GameOver onSubmitClose={handleSubmit} onExitClose={handleExit} />}
				</div>
			</div>
			<div className="flex-grow mt-24"></div>
		</div>
	);
}
