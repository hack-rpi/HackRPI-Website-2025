import { Prize } from "@/data/prizes";
import Image from "next/image";

export default function MajorPrizes({ majorPrizes }: { majorPrizes: Prize[] }) {
	return (
		<div className="w-full desktop:w-3/4 lg:w-2/3 2xl:w-3/5 h-fit flex flex-col items-center justify-start">
			{majorPrizes.map((prize, index) => (
				<div
					className={`flex items-center desktop:items-center justify-between h-fit  ${
						index % 2 === 0
							? "flex-col-reverse desktop:flex-row"
							: "flex-col-reverse desktop:flex-row-reverse bg-hackrpi-light-purple"
					} w-full py-2 my-2 desktop:my-0`}
					key={index}
				>
					<div className="flex flex-col items-center justify-center mx-4 desktop:w-1/2">
						<h1 className="text-center text-3xl sm:text-4xl font-bold font-sans text-hackrpi-orange">{prize.name}</h1>
						<h2 className="text-center text-2xl font-sans font-bold text-hackrpi-yellow">{prize.amount}</h2>
						<p className="text-center w-5/6 sm:w-2/3 desktop:w-full">{prize.description}</p>
						{prize.description.includes("Photon") ?
              <a className="text-center w-5/6 sm:w-2/3 desktop:w-full border-2 border-black text-hackrpi-yellow" href="https://somethingreat.notion.site/hackrpi" target="_blank"><p className="">Read all about the Photon X HackRPI Track here</p></a>
              : ""
            }
					</div>
					<div className="h-full min-w-fit desktop:w-1/2 flex items-center justify-start desktop:justify-center my-2 ml-4">
						<Image
							src={prize.imagePath!}
							alt={prize.name}
							className="object-contain h-48 desktop:h-full w-fit max-w-60"
						/>
					</div>
				</div>
			))}
		</div>
	);
}
