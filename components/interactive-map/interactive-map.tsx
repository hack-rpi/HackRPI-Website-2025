import { Link } from "@/data/nav-bar-links";
import Image from "next/image";
import NextLink from "next/link";

const links: Link[] = [
	{ href: "/event", children: "Event Information" },
	{ href: "/event/schedule", children: "Schedule" },
	{ href: "/event/prizes", children: "Prizes" },
	{ href: "/last-year", children: "HackRPI X" },
	{ href: "/sponsor-us", children: "Sponsor Us" },
	{ href: "https://discord.com/invite/8vAQpFWCYH", children: "Discord" },
];

export default function InteractiveNavigationMap() {
	return (
		<div className="relative w-full aspect-square flex items-center justify-center h-fit">
			<div className="absolute z-10 flex flex-col text-[15px] lg:text-[20px] xl:text-[24px] 2xl:text-[25px] top-8 lg:top-10 2xl:top-12 left-[17.6%] lg:left-[16.1%] xl:left-[15.7%] 2xl:left-[14.5%]">
				{links.map((link) => (
					<NextLink
						key={link.href}
						href={link.href}
						className="font-bold font-retro flex items-center group mb-1 lg:mb-2 xl:mb-4 2xl:mb-5 
              transition-all duration-300 ease-in-out hover:scale-110 hover:translate-x-1"
					>
						{/* Add icons for specific links */}
						{link.children === "Schedule" && (
							<Image
								src="/calender_pixel.png"
								alt="Calendar"
								width={60}
								height={60}
								className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
							/>
						)}
						{link.children === "Event Information" && (
							<Image
								src="/magnifying_glass.png"
								alt="Magnifying Glass"
								width={60}
								height={60}
								className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
							/>
						)}
						{link.children === "Prizes" && (
							<Image
								src="/pixel_trophy.png"
								alt="Trophy"
								width={60}
								height={60}
								className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
							/>
						)}
						{link.children === "HackRPI X" && (
							<Image
								src="/resources_pixel.png"
								alt="HackRPI X"
								width={60}
								height={60}
								className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
							/>
						)}
						{link.children === "Sponsor Us" && (
							<Image
								src="/money_pixel.png"
								alt="Sponsor Us"
								width={60}
								height={60}
								className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
							/>
						)}
						{link.children === "Discord" && (
							<Image
								src="/discord_bot_pixel (2).png"
								alt="Discord"
								width={60}
								height={60}
								className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
							/>
						)}

						{/* Text moves farther right */}
						<span className="transition-transform duration-300 ease-in-out group-hover:translate-x-4 group-hover:scale-110">
							{link.children}
						</span>
					</NextLink>
				))}
			</div>
		</div>
	);
}
