import Card, { CardProps } from "./socials-card";

const socialLinks: CardProps[] = [
	{
		svgPath: "/social/instagram.svg",
		link: "https://www.instagram.com/hack.rpi/",
		name: "Instagram",
		bgGradientFrom: "from-[#e9bc59]",
		bgGradientTo: "to-[#e39036]",
	},
	{
		svgPath: "/social/discord.svg",
		link: "https://discord.gg/Pzmdt7FYnu",
		name: "Discord",
		bgGradientFrom: "from-[#e9bc59]",
		bgGradientTo: "to-[#e39036]",
	},
	{
		svgPath: "/social/email.svg",
		link: "mailto:hackrpi@rpi.edu",
		name: "Email",
		bgGradientFrom: "to-[#292333]",
		bgGradientTo: "from-[#d5345d]",
	},
	{
		svgPath: "/social/tiktok.svg",
		link: "https://www.tiktok.com/@hackrpi",
		name: "TikTok",
		bgGradientFrom: "from-[#292333]",
		bgGradientTo: "to-[#d5345d]",
	},
	{
		svgPath: "/social/linkedin.svg",
		link: "https://www.linkedin.com/company/hackrpiorganizingteam/",
		name: "LinkedIn",
		bgGradientFrom: "from-[#733dbe]",
		bgGradientTo: "to-[#9e40ee]",
	},
];

export default function SocialLinks() {
	return (
		<div className="flex w-full items-center justify-between">
			{socialLinks.map((socialLink) => (
				<Card key={socialLink.name} {...socialLink} />
			))}
		</div>
	);
}
