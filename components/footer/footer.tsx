import NextImage from "next/image";
import logo from "@/public/Retro_HackRPI_Logo.png";
import SocialLinks from "../socials-links/social-links";
import RegistrationLink from "../themed-components/registration-link";
const currentYear = new Date().getFullYear();

export default function Footer() {
	return (
		<div className="rounded-lg w-full bg-gradient-to-br from-hackrpi-light-purple to-hackrpi-pink p-[6px]">
			<div
				className="flex flex-col items-start md:items-center justify-center w-full min-h-fit z-10 md:pl-0 blur-0 opacity-100"
				style={{ background: "#1C1820" }}
			>
				<div className="flex flex-col md:flex-row items-start justify-left w-11/12 md:w-full h-fit md:h-40 my-1 self-center mb-4">
					<div className="w-1/4 md:w-1/6 h-full self-center">
						<NextImage src={logo} alt="HackRPI Logo" className="h-full object-contain" />
					</div>

					<div className="w-full md:w-4/6 h-full my-4  text-center rounded-xl ">
						<div className="mb-4 text-xl font-bold font-sans adjustedFontSize">
							<h2 className="tracking-wider font-thin text-nowrap flex justify-center mb-4">
								<span className="font-bold tracking-normal text-orange-400 font-neutral">HackRPI</span>
								<span className="invisibleSpace">_</span>
								<span className="text-amber-400 font-retro"> Retro </span>
								<span className="invisibleSpace">_</span>
								<span className="text-amber-400 font-neutral font-bold"> V. </span>
								<span className="invisibleSpace">_</span>
								<span className="text-amber-400 font-modern"> Modern </span>
							</h2>
							<div className="text-2xl justify-l centerLocation flex flex-col items-center">
								<p>Darrin Communications Center </p>
								<p>@ Rensselaer Polytechnic Institute</p>
								<p>110 8th St, Troy, NY 12180</p>
							</div>
						</div>
					</div>

					<div className="md:w-1/6 h-full self-center">
						<div className="w-11/12 h-full flex flex-col items-start justify-around w-full">
							<SocialLinks />
						</div>
					</div>
				</div>

				<RegistrationLink className="text-xl mb-4 self-center" />
				<div className="flex flex-row items-start md:items-center justify-center space-x-2 w-fit pb-4 mb text-center self-center">
					<p>
						Made with <span className="text-red-600">❤️</span> by HackRPI.
					</p>
					<p>&copy; {currentYear} HackRPI</p>
				</div>
			</div>
		</div>
	);
}
