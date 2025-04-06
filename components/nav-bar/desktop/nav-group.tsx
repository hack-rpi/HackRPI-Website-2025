import NextLink from "next/link";
import { Link as lin } from "@/data/nav-bar-links";
import Link from "next/link";

export default function NavGroup({ name, links }: { name: string; links: lin[] }) {
	return (
		/*<div className="dropdown dropdown-hover mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]">*/
		<div className="dropdown dropdown-hover mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]">
			<div
				tabIndex={0}
				role="button"
				className="text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px] focus:bg-[length:100%_4px]"
			>
				<Link href={links[0].href}>{name}</Link>
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content p-2 w-52 bg-hackrpi-dark-blue h-fit box border-r-2 border-b-2 border-l-2 border-hackrpi-yellow translate-y-3"
				style={{ zIndex: -1 }}
			>
				{links.map((link) => (
					<li key={link.href} className="my-1">
						<NavLink href={link.href}>{link.children}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function NavLink({
	href,
	children,
	onClick,
}: {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<NextLink
			className="w-full whitespace-nowrap p-0.5 h-8 text-center text-lg bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-[#e9bc59] to-[#d5345d] hover:bg-[length:100%_2px] focus:bg-[length:100%_4px]"
			href={href}
			onClick={onClick}
		>
			{children}
		</NextLink>
	);
}
