import { NavGroup } from "@/data/nav-bar-links";
import { useState, useEffect } from "react";
import NextImg from "next/image";
import hackrpi_logo from "@/public/Retro_HackRPI_Logo.png";
import NavGroupComponent from "./nav-group";
import Link from "next/link";

export default function MobileNavBar({ links }: { links: NavGroup[] }) {
	const [navMenuOpen, setNavMenuOpen] = useState(false);

	useEffect(() => {
		document.onkeydown = (e) => {
			if (e.key === "Escape") {
				setNavMenuOpen(false);
			}
		};
		return () => {
			document.onkeydown = null;
		};
	}, []);

	return (
		<nav role="navigation" className="mobile-navigation">
			<div className="w-screen h-24 flex items-center justify-center fixed top-0 bg-gradient-to-r from-hackrpi-light-purple via-hackrpi-pink to-hackrpi-light-purple z-20">
				<div className="flex items-center justify-start w-1/3">
					<button onClick={() => setNavMenuOpen((prev) => !prev)} className="text-white text-4xl ml-8 ">
						<NextImg alt="Hamburger Menu" src="/menu-icon.svg" width={40} height={40} priority={true} />
					</button>
				</div>
				<div className="flex items-center justify-center w-1/3">
					<Link href="/" className="w-fit whitespace-nowrap">
						<NextImg alt="HackRPI Logo" src={hackrpi_logo} className="w-14 image-full" priority={true} />
					</Link>
				</div>
				<div className="flex items-center justify-center w-1/3"></div>
			</div>
			<div
				className={`fixed top-0 bottom-0 w-full bg-black bg-opacity-40 ${
					navMenuOpen ? "left-0" : "-left-full"
				} z-10 transition-all duration-300`}
				onClick={() => setNavMenuOpen(false)}
				id="home"
			></div>
			<div
				className={`fixed top-24 ${
					navMenuOpen ? "left-0" : "-left-3/4"
				} h-full bg-hackrpi-dark-blue w-3/4 z-20 transition-all overflow-y-auto`}
			>
				<div className="flex flex-col items-center justify-start h-full ">
					{links.map((link) => (
						<NavGroupComponent
							key={link.name}
							name={link.name}
							links={link.links}
							onLinkClick={() => setNavMenuOpen(false)}
						/>
					))}
					<Link
						href="/sponsor-us"
						className="w-11/12 whitespace-nowrap text-2xl px-2 pb-2 bg-[length:0%_4px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-primary-blue to-hackrpi-primary-blue hover:bg-[length:100%_4px]"
					>
						Sponsor Us
					</Link>
					{/* <Link
						href="/2048/leaderboard"
						className="w-11/12 whitespace-nowrap text-2xl p-2 bg-[length:0%_4px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-primary-blue to-hackrpi-primary-blue hover:bg-[length:100%_4px]"
					>
						2048 Leaderboard
					</Link> */}
					<Link
						href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
						className="w-11/12 whitespace-nowrap text-2xl p-2 bg-[length:0%_4px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-primary-blue to-hackrpi-primary-blue hover:bg-[length:100%_4px]"
						target="_blank"
					>
						Code of Conduct
					</Link>
				</div>
			</div>
		</nav>
	);
}
