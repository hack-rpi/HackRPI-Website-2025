import HackRPIButton from "../themed-components/hackrpi-button";

const GameOver = ({
	onSubmitClose,
	onExitClose,
}: {
	onSubmitClose: (username: string) => void;
	onExitClose: () => void;
}) => {
	const onSubmit = () => {
		const username = (document.getElementById("username")! as HTMLInputElement).value;
		onSubmitClose(username);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-0" onClick={onExitClose}>
			<div
				className="bg-[#292333] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center z-20"
				onClick={(event) => event.stopPropagation()}
			>
				<h2 className="text-lg font-bold">Game Over!</h2>
				<p className="">
					Abusing the game leaderboard may result in your score being removed or you being banned from playing entirely.
				</p>
				<label className="my-4 w-full">Username: </label>
				<input id="username" className="input input-primary w-full mb-4" placeholder="Username"></input>
				<HackRPIButton onClick={onSubmit}>Submit and Try Again</HackRPIButton>
			</div>
		</div>
	);
};

export default GameOver;
