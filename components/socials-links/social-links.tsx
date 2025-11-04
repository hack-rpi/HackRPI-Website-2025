import Card, { CardProps } from "./socials-card";

const socialLinks: CardProps[] = [
	{
		svgPath: "/social/instagram.svg",
		link: "https://www.instagram.com/hack.rpi/",
		name: "Instagram",
		bgGradientFrom: "from-[#feda75]", // Light yellow/orange
		bgGradientVia: "via-[#d62976]", // Pink/magenta
		bgGradientTo: "to-[#4f5bd5]", // Deep blue/purple
	},
	{
		svgPath: "/social/discord.svg",
		link: "https://discord.gg/BkDVUmrufa",
		name: "Discord",
		bgGradientFrom: "from-[#5865F2]",
		bgGradientTo: "to-[#7289da]",
	},
	{
		svgPath: "/social/email.svg",
		link: "mailto:hackrpi@rpi.edu",
		name: "Email",
		bgGradientFrom: "to-[#0063b0]",
		bgGradientTo: "from-[#218cff]",
	},
	{
		svgPath: "/social/tiktok.svg",
		link: "https://www.tiktok.com/@hackrpi",
		name: "TikTok",
		bgGradientFrom: "from-[#ff0050]",
		bgGradientTo: "to-[#00f2ea]",
	},
	{
		svgPath: "/social/linkedin.svg",
		link: "https://www.linkedin.com/company/hackrpiorganizingteam/",
		name: "LinkedIn",
		bgGradientFrom: "from-[#0077B5]",
		bgGradientTo: "to-[#0077B5]",
	},
];

export default function SocialLinks() {
	return (
		<div className="flex flex-wrap w-full items-center">
			{socialLinks.map((socialLink) => (
				<Card key={socialLink.name} {...socialLink} />
			))}
		</div>
	);
}
