import { Link } from "@/data/nav-bar-links";
import Image from "next/image";
import NextLink from "next/link";

const links: Link[] = [
	{ href: "/event", children: "Event Information" },
	{ href: "/event/schedule", children: "Schedule" },
	{ href: "/announcements", children: "Announcements" },
	{ href: "/event/prizes", children: "Prizes" },
	{ href: "/resources", children: "Resources" },
	{ href: "/last-year", children: "HackRPI X" },
	{ href: "/sponsor-us", children: "Sponsor Us" },
];

export default function InteractiveNavigationMap() {
	return (
		<div className="relative w-full aspect-square flex items-center justify-center h-fit p-8 ">
			<div className="absolute z-10 flex flex-col text-[15px] lg:text-[20px] xl:text-[24px] 2xl:text-[30px] top-8 lg:top-10 2xl:top-12 left-[17.6%] lg:left-[16.1%] xl:left-[15.7%] 2xl:left-[14.5%]">
				{links.map((link) => (
					<NextLink
						key={link.href}
						href={link.href}
						className= "font-bold font-retro flex items-center group mb-3 lg:mb-6 xl:mb-8 2xl:mb-10"
					>
						{/* Add icons for specific links */}
						{link.children === "Schedule" && (
							<Image
								src="/calender_pixel.png"
								alt="Calendar"
								width={60}
								height={60}
								className="mr-2"
							/>
						)}
						{link.children === "Event Information" && (
							<Image
								src="/magnifying_glass.png"
								alt="Magnifying Glass"
								width={60}
								height={60}
								className="mr-2"
							/>
						)}
						{link.children === "Announcements" && (
							<Image
								src="/megaphone_pixel.png"
								alt="Megaphone"
								width={60}
								height={60}
								className="mr-2"
							/>
						)}
						{link.children === "Prizes" && (
							<Image
								src="/pixel_trophy.png"
								alt="Trophy"
								width={60}
								height={60}
								className="mr-2"
							/>
						)}
						{link.children === "Resources" && (
							<Image
								src="/resources_pixel.png"
								alt="Resources"
								width={60}
								height={60}
								className="mr-2"
							/>
						)}
						<span>{link.children}</span>
					</NextLink>
				))}
			</div>
		</div>
	);
}