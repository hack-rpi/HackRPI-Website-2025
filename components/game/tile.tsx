function Tile({ value }: { value: number }) {
	let bgColor;
	let textColor;

	switch (value) {
		case 0:
			bgColor = "bg-gray-200";
			break;
		case 2:
			bgColor = "bg-radial-yellow-200";
			textColor = "text-gray-700";
			break;
		case 4:
			bgColor = "bg-radial-yellow-300";
			textColor = "text-gray-600";
			break;
		case 8:
			bgColor = "bg-radial-yellow-400";
			textColor = "text-gray-500";
			break;
		case 16:
			bgColor = "bg-radial-yellow-500";
			textColor = "text-gray-400";
			break;
		case 32:
			bgColor = "bg-radial-yellow-600";
			textColor = "text-gray-300";
			break;
		case 64:
			bgColor = "bg-radial-yellow-700";
			textColor = "text-gray-200";
			break;
		case 128:
			bgColor = "bg-radial-green-200";
			textColor = "text-gray-700";
			break;
		case 256:
			bgColor = "bg-radial-green-300";
			textColor = "text-gray-600";
			break;
		case 512:
			bgColor = "bg-radial-green-400";
			textColor = "text-gray-500";
			break;
		case 1024:
			bgColor = "bg-radial-green-500";
			textColor = "text-gray-400";
			break;
		case 2048:
			bgColor = "bg-radial-green-600";
			textColor = "text-gray-300";
			break;
		default:
			bgColor = "bg-black";
			textColor = "text-gray-100";
	}

	return (
		<div
			data-testid="tile"
			className={`tile flex justify-center items-center rounded-lg shadow-lg w-full h-full ${bgColor} ${textColor} ${
				value ? "" : "empty"
			} text-4xl font-bold`}
		>
			{value !== 0 ? value : ""}
		</div>
	);
}

export default Tile;
