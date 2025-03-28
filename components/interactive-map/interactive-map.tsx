import { Link } from "@/data/nav-bar-links";
// import Image from "next/image";
import NextLink from "next/link";

// Previously commented out because we didn't have the links yet
// Now uncommented and updated from main branch
const links: Link[] = [
	{ href: "/event", children: "Event Information" },
	{ href: "/event/schedule", children: "Schedule" },
	{ href: "/announcements", children: "Announcements" },
	{ href: "/event/prizes", children: "Prizes" },
	{ href: "/resources", children: "Resources" },
	{ href: "/last-year", children: "HackRPI XII" },
	{ href: "/sponsor-us", children: "Sponsor Us" },
];

const firsthalflink: Link[] = [
	{ href: "/event", children: "Event Information" },
	{ href: "/event/schedule", children: "Schedule" },
	{ href: "/announcements", children: "Announcements" },
	{ href: "/event/prizes", children: "Prizes" },
];
const secondhalflink: Link[] = [
	{ href: "/resources", children: "Resources" },
	{ href: "/last-year", children: "HackRPI X" },
	{ href: "/sponsor-us", children: "Sponsor Us" },
];

export default function InteractiveNavigationMap() {
	return (
		<div className="relative w-full aspect-square flex items-center justify-center h-fit p-8 ">
			<div className="absolute z-10 flex flex-col text-lg lg:text-xl xl:text-2xl 2xl:text-4xl top-8 lg:top-10 2xl:top-12 left-[17.6%] lg:left-[16.1%] xl:left-[15.7%] 2xl:left-[14.5%]">
				{firsthalflink.map((link) => (
					<NextLink
						key={link.href}
						href={link.href}
						className="font-bold font-retro flex items-center group mb-3 lg:mb-6 xl:mb-8 2xl:mb-10"
					>
						<span className="">{link.children}</span>
					</NextLink>
				))}
				{secondhalflink.map((link) => (
					<NextLink
						key={link.href}
						href={link.href}
						className="font-bold flex font-modern items-center group mb-3 lg:mb-6 xl:mb-8 2xl:mb-10"
					>
						<span className="">{link.children}</span>
					</NextLink>
				))}
			</div>
		</div>
	);
}
