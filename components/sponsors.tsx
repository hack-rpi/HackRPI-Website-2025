import React, { useState } from "react";
import sponsorsJson from "@/public/sponsors/sponsors.json";
import { SponsorsJSON, sponsorTiers } from "@/types/sponsorsType";
import NextImage from "next/image";

const tierColors: Record<sponsorTiers, string> = {
	OBSIDIAN: "bg-gray-900 text-white",
	GOLD: "bg-yellow-500 text-black",
	SILVER: "bg-gray-300 text-black",
	BRONZE: "bg-orange-600 text-white",
	COLLABORATORS: " text-white",
};

const Sponsors = () => {
	const tierList: sponsorTiers[] = ["OBSIDIAN", "GOLD", "SILVER", "BRONZE", "COLLABORATORS"];
	const [sponsors] = useState<SponsorsJSON>(sponsorsJson);

	return (
		<div className="flex flex-col w-full justify-center items-start desktop:items-center pl-8 desktop:pl-0 bg-gradient-to-b from-hackrpi-dark-blue via-hackrpi-orange to-hackrpi-dark-blue py-8 ">
			<div className="w-11/12 desktop:w-2/3">
				<h2 className="pb-10 text-retro-orange font-modern font-bold text-left text-4xl">
					Thank you to our sponsors that make HackRPI possible!
				</h2>

				{tierList.map((tier) => {
					if (sponsors[tier].length === 0) return null;
					return (
						<div className="w-11/12" key={tier}>
							<div
								className={`px-1 py-1 border-4 border-dashed border-white inline-block mt-4 font-retro font-bold text-xl ${tierColors[tier]}`}
							>
								{tier}
							</div>
							<div className="border-b-4 border-hackrpi-white rounded-full border-double mt-2 h-6"></div>

							<div className="flex flex-row flex-wrap justify-around items-center">
								{sponsors[tier].map((sponsor) => {
									return (
										<div
											key={sponsor.name}
											className="w-fit h-fit p-4 m-4 hover:scale-110 bg-hackrpi-light-purple bg-opacity-0 hover:bg-opacity-15 rounded-md transition-all duration-700 flex items-center justify-center mx-4"
										>
											<a href={sponsor.url} target="_blank" rel="noreferrer">
												<NextImage
													src={`/sponsors/sponsor_logos${sponsor.logoPath}`}
													alt={sponsor.name}
													width={250}
													height={250}
													className="rounded-md"
												/>
											</a>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Sponsors;
