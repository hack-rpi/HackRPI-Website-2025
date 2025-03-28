import React from "react";
import Image from "next/image";

export interface ProjectDisplayProps {
	title: string;
	authors: string[];
	prizeCategory: string;
	description: string;
	imageUrl: string;
	imageOnLeft: boolean;
}

export default function ProjectDisplay(props: ProjectDisplayProps) {
	return (
		<>
			<DesktopProjectDisplay {...props} />
			<MobileProjectDisplay {...props} />
		</>
	);
}

function DesktopProjectDisplay(props: ProjectDisplayProps) {
	return (
		<div
			className={`hidden xl:flex  ${props.imageOnLeft ? "flex-row-reverse" : "flex-row"} items-center justify-between`}
		>
			<div className="w-1/2">
				<h1 className="font-modern text-orange-400 text-left text-4xl text-shadow-md pb-4 ">{props.prizeCategory}</h1>
				<h2 className="font-modern collapse-title font-medium text-2xl text-retro-orange">{props.title}</h2>
				<hr />
				<p className="font-neutral2">{props.authors.join(", ")}</p>
				<hr />
				<p className="mt-2 font-neutral2">{props.description}</p>
			</div>
			<div className="w-2/5">
				<Image src={props.imageUrl} alt={props.title} height={500} width={500} />
			</div>
		</div>
	);
}

function MobileProjectDisplay(props: ProjectDisplayProps) {
	return (
		<div className="flex xl:hidden flex-col items-start justify-start w-fit">
			<div className="w-full flex items-center justify-center">
				<Image src={props.imageUrl} alt={props.title} height={500} width={500} className="" />
			</div>
			<div>
				<h1 className="font-modern text-retro-orange text-left text-4xl text-shadow-md pb-4">{props.prizeCategory}</h1>
				<h2 className="font-modern collapse-title font-medium text-2xl text-retro-orange">{props.title}</h2>
				<hr />
				<p className="font-sans font-white text-lg">{props.authors.join(", ")}</p>
				<hr />
				<p className="mt-2">{props.description}</p>
			</div>
		</div>
	);
}
