"use client";

import NavBar from "@/components/nav-bar/nav-bar";
import "@/app/globals.css";
import { podiumPrizes, majorPrizes, minorPrizes } from "@/data/prizes";
import Podium from "@/components/prizes/podium";
import MajorPrizes from "@/components/prizes/major_prizes";
import MinorPrizes from "@/components/prizes/minor_prizes";

export default function Page() {
	return (
		<div className="flex flex-col w-full h-fit min-h-screen items-center justify-center">
			<div className="flex flex-col w-full flex-grow flex-shrink basis-auto mt-24 items-center">
				<h1 className="text-4xl sm:text-6xl font-bold font-sans my-4 text-center">$5500+ In Prizes</h1>
				<Podium podiumPrizes={podiumPrizes} />
				<hr className="w-11/12 desktop:w-3/4 lg:w-2/3 2xl:w-3/5 mx-auto my-4 border-gray-300" />
				<MajorPrizes majorPrizes={majorPrizes} />
				<hr className="w-11/12 desktop:w-3/4 lg:w-2/3 2xl:w-3/5 mx-auto my-4 border-gray-300" />
				<MinorPrizes minorPrizes={minorPrizes} />
			</div>
		</div>
	);
}
