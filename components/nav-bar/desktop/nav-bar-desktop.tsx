import NextImg from "next/image";
import { NavGroup } from "@/data/nav-bar-links";
import logo from "@/public/Retro_HackRPI_Logo.png";
import RegistrationButton from "@/components/themed-components/registration-link";
import NavGroupComponent from "./nav-group";
import Link from "next/link";

export default function DesktopNavBar({ links }: { links: NavGroup[] }) {
	return (
		/*<div className="bg-gradient-to-r from-hackrpi-light-purple via-hackrpi-pink to-hackrpi-light-purple w-full h-16">*/
		<div className="bg-hackrpi-dark-blue w-full h-16">
			<div
				className="flex justify-center lg:justify-center items-center h-full border-b-2 border-hackrpi-yellow z-50"
				role="navigation"
			>
				<div className="flex items-center justify-center mr-4">
					<Link href="/" className="w-fit whitespace-nowrap">
						<NextImg alt="HackRPI Logo" aria-label="Home Page" src={logo} className="w-10 image-full" />
					</Link>
				</div>
				{/* Uncomment when ready to add registration button back */}
				{/* <div className="min-w-fit lg:w-8/12 flex items-center justify-start"> */}
				<div className="min-w-fit  flex items-center justify-start">
					{links.map((link) => (
						<NavGroupComponent key={link.name} name={link.name} links={link.links} />
					))}
					<Link
						href="/sponsor-us"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
					>
						Sponsor Us
					</Link>
					<Link
						href="/event"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
					>
						Event Info
					</Link>
					<Link
						href="/event/schedule"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
					>
						Schedule
					</Link>
					<Link
						href="/announcements"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
					>
						Announcements
					</Link>
					<Link
						href="/event/prizes"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
					>
						Prizes
					</Link>
					{/* <Link
						href="/2048/leaderboard"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
					>
						2048 Leaderboard
					</Link> */}
					<Link
						href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
						className="mx-2 whitespace-nowrap text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-hackrpi-yellow to-hackrpi-pink hover:bg-[length:100%_2px]"
						target="_blank"
					>
						Code of Conduct
					</Link>
				</div>
				<div className="w-fit flex items-center justify-around ml-2">
					<RegistrationButton className="w-fit whitespace-nowrap" />
				</div>
			</div>
		</div>
	);
}
