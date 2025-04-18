import Tile from "./tile";

function Board({ grid }: { grid: number[][] }) {
	return (
		<div className="grid grid-cols-4 gap-2 w-150 h-144">
			{grid.map((row, rowIndex) =>
				row.map((tile, colIndex) => (
					<div key={`${rowIndex}-${colIndex}`} className="w-20 h-20 md:w-32 md:h-32">
						<Tile value={tile} />
					</div>
				)),
			)}
		</div>
	);
}

export default Board;
