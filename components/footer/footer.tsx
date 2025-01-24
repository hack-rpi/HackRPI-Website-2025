import NextImage from "next/image";
import logo from "@/public/HackRPI_Logo_Yellow_Arrow.png";
import SocialLinks from "../socials-links/social-links";
import RegistrationLink from "../themed-components/registration-link";

export default function Footer() {
	return (
		<div className="flex flex-col items-start md:items-center justify-center w-full min-h-fit  z-10 bg-hackrpi-secondary-light-blue pl-4 md:pl-0">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-center w-11/12 md:w-full h-fit md:h-40 my-1">
				<div className="w-1/4 md:w-1/6 h-full mr-4">
					<NextImage src={logo} alt="HackRPI Logo" className="h-full object-contain" />
				</div>
				<div className="w-full md:w-2/6 h-full mr-1 my-4">
					<div className=" w-11/12 flex flex-col justify-around items-start h-full">
						<div className="mb-4">
							<h2 className="text-2xl tracking-wider font-sans font-thin">
								<span className="font-bold tracking-normal">HackRPI</span> Retro V. Modern
							</h2>
							<p>Darrin Communications Center @ Rensselaer Polytechnic Institute</p>
							<p>110 8th St, Troy, NY 12180</p>
						</div>
					</div>
				</div>
				<div className="w-3/4 md:w-1/3 md:border-l-2 border-l-white h-full">
					<div className="w-11/12 h-full flex flex-col items-start justify-around md:ml-4">
						<RegistrationLink className="text-xl mb-4" />
						<SocialLinks />
					</div>
				</div>
			</div>
			<div className="flex flex-col items-start md:items-center justify-center w-fit pb-4 mb">
				<p>
					Made with <span className="text-red-600">❤️</span> by HackRPI.
				</p>
				<p>&copy; 2025 HackRPI</p>
			</div>
		</div>
	);
}
