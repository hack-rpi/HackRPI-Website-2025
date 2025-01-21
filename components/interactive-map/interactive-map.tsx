import { Link } from "@/data/nav-bar-links";
import Image from "next/image";
import NextLink from "next/link";
import interactiveMap from "@/public/interactive-navigation/WebInteractiveMap.svg";

const links: Link[] = [
	{ href: "/event", children: ":)" },
	{ href: "/event/schedule", children: ":(" },
	{ href: "/event/prizes", children: ":O" },
	{ href: "/resources", children: ":D" },
	{ href: "/last-year", children: ":P" },
	{ href: "/sponsor-us", children: ":>" },
];

export default function InteractiveNavigationMap() {
	return (
		<div className="relative w-full aspect-square flex items-center justify-center h-fit p-8 ">
			<Image src={interactiveMap} alt="Map" className="rounded-md w-full" />
			<div className="absolute z-10 flex flex-col text-lg lg:text-xl xl:text-2xl 2xl:text-4xl top-8 lg:top-10 2xl:top-12 left-[17.6%] lg:left-[16.1%] xl:left-[15.7%] 2xl:left-[14.5%]">
				{links.map((link) => (
					<NextLink
						key={link.href}
						href={link.href}
						className="text-white  font-bold flex items-center group mb-3 lg:mb-6 xl:mb-8 2xl:mb-10"
					>
						<div className="w-4 lg:w-6 xl:w-7 2xl:w-10 aspect-square rounded-full mr-2 xl:mr-4 border-4 lg:border-[5px] xl:border-[6px] 2xl:border-[8px] border-subway-red bg-[#48566aff] group-hover:bg-white transition-colors duration-300"></div>

						<span className="">{link.children}</span>
					</NextLink>
				))}
			</div>
			<SubwayStops />
		</div>
	);
}

/**
 * I know this is a bit of a mess, but it works so... ¯\_(ツ)_/¯
 * If it works it works ¯\_(ツ)_/¯
 */

function SubwayStops() {
	const subwayStopStyle =
		"absolute w-4 lg:w-6 xl:w-7 2xl:w-10 aspect-square rounded-full mr-2 xl:mr-4 border-4 lg:border-[5px] xl:border-[6px] 2xl:border-[8px] bg-[#48566aff] hover:bg-white transition-colors duration-300";
	return (
		<div className="absolute w-full h-full">
			<div
				className={`${subwayStopStyle} border-subway-blue    top-[30.2%]    lg:top-[29.5%]    xl:top-[29%]      2xl:top-[28.5%]    left-[45%]    lg:left-[45%]    xl:left-[45%]    2xl:left-[45%] `}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-blue    top-[30.2%]    lg:top-[29.5%]    xl:top-[29%]      2xl:top-[28.5%]    left-[30%]    lg:left-[30%]    xl:left-[30%]    2xl:left-[30%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-blue    top-[30.2%]    lg:top-[29.5%]    xl:top-[29%]      2xl:top-[28.5%]    right-[34.5%] lg:right-[34.2%] xl:right-[33%]   2xl:right-[32.8%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-blue    top-[30.2%]    lg:top-[29.5%]    xl:top-[29%]      2xl:top-[28.5%]    right-[24.5%] lg:right-[23.8%] xl:right-[22.4%] 2xl:right-[22.1%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-purple  bottom-[15.9%] lg:bottom-[14.2%] xl:bottom-[13.5%] 2xl:bottom-[12.5%] left-[40%]    lg:left-[40%]    xl:left-[40%]    2xl:left-[40%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-purple  bottom-[15.9%] lg:bottom-[14.2%] xl:bottom-[13.5%] 2xl:bottom-[12.5%] left-[55%]    lg:left-[55%]    xl:left-[55%]    2xl:left-[55%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-purple  bottom-[15.9%] lg:bottom-[14.2%] xl:bottom-[13.5%] 2xl:bottom-[12.5%] left-[85%]    lg:left-[85%]    xl:left-[85%]    2xl:left-[85%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-purple  bottom-[8.5%]  lg:bottom-[6.5%]  xl:bottom-[5%]    2xl:bottom-[5%]    left-[10%]    lg:left-[8.1%]   xl:left-[06.7%]  2xl:left-[6.7%] `}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-red     top-[69%]      lg:top-[69%]      xl:top-[69%]      2xl:top-[71%]      left-[22.5%]  lg:left-[20%]    xl:left-[19%]    2xl:left-[20.5%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-red     top-[76%]      lg:top-[76%]      xl:top-[76%]      2xl:top-[78%]      left-[29%]    lg:left-[27%]    xl:left-[26%]    2xl:left-[27.5%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-yellow  top-[10%]      lg:top-[10%]      xl:top-[10%]      2xl:top-[10%]      left-[59.5%]  lg:left-[60.2%]  xl:left-[60.7%]  2xl:left-[60.4%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-yellow  top-[40%]      lg:top-[40%]      xl:top-[40%]      2xl:top-[40%]      left-[59.5%]  lg:left-[60.2%]  xl:left-[60.7%]  2xl:left-[60.4%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-yellow  top-[52.5%]    lg:top-[52.5%]    xl:top-[52.5%]    2xl:top-[52.5%]    left-[63%]    lg:left-[63.9%]  xl:left-[64%]    2xl:left-[63.9%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-yellow  bottom-[23.5%] lg:bottom-[23%]   xl:bottom-[22%]   2xl:bottom-[21%]   left-[66%]    lg:left-[67.3%]  xl:left-[67.3%]  2xl:left-[67.4%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-green   top-[10%] 		 lg:top-[10%]      xl:top-[10%]      2xl:top-[10%]      right-[24.5%] lg:right-[23.8%] xl:right-[22.6%] 2xl:right-[22.1%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-green   top-[40%] 		 lg:top-[40%]      xl:top-[40%]      2xl:top-[40%]      right-[24.5%] lg:right-[23.8%] xl:right-[22.6%] 2xl:right-[22.1%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-green   top-[52.5%]  	 lg:top-[52.5%]    xl:top-[52.5%]    2xl:top-[52.5%]    right-[18.5%] lg:right-[17.5%] xl:right-[16.1%] 2xl:right-[15.6%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-green   top-[65%] 		 lg:top-[65%]      xl:top-[65%]      2xl:top-[65.0%]    right-[18.5%] lg:right-[17.5%] xl:right-[16.1%] 2xl:right-[15.7%]`}
			></div>
			<div
				className={`${subwayStopStyle} border-subway-green   bottom-[15.9%] lg:bottom-[14.2%] xl:bottom-[13.5%] 2xl:bottom-[12.5%] right-[23.5%] lg:right-[22.8%] xl:right-[21%]   2xl:right-[21%]`}
			></div>
		</div>
	);
}
