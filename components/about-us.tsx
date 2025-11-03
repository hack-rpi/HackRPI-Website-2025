import RegistrationLink from "@/components/themed-components/registration-link";

export default function AboutUs() {
	return (
		<div>
			<div
				id="about"
				className="w-11/12 lg:w-full mx-auto mt-12 mb-18 flex flex-col lg:flex-row items-start justify-start h-fit ml-0 pl-8 lg:pl-0 "
				style={{
					backgroundImage: "url('/aboutUs.jpeg')",
					backgroundSize: "100% 100%",
					width: "99vw",
					height: "110vh",
				}}
			>
				<div
					className="absolute"
					style={{
						top: "140%",
						left: "31%",
						width: "32%",
						height: "30%",
						overflowY: "auto",
						color: "white",
						backgroundColor: "rgba(32, 0, 32, 1)",
						padding: "1rem",
						borderRadius: "6px",
					}}
				>
					<h1 className="text-hackrpi-orange text-2xl md:text-4xl lg:text-5xl mb-2 font-bold font-sans-Helvetica">
						About HackRPI
					</h1>
					<div className="w-11/12">
						<p className="pb-3 text-hackrpi-light-purple">
							HackRPI 2025 is Rensselaer Polytechnic Institute&apos;s 12th annual intercollegiate hackathon hosted by
							students for students. Starting at noon on Saturday, November 15th, teams of 1-4 people have 24 hours to
							build and submit projects relating to our theme,{" "}
							<span data-testid="theme-title" className="text-hackrpi-light-purple font-bold">
								Retro vs. Modern
							</span>
							. After submitting their projects, participants demonstrate their projects in front of a panel of
							professors, industry professionals, and fellow students.
						</p>

						<p className="pb-3 text-hackrpi-pink">
							<span data-testid="theme-description" className="text-hackrpi-primary-dark-purple font-bold">
								Retro vs. Modern:
							</span>{" "}
							In a world where nostalgia meets innovation, our 12th annual hackathon, Retro vs Modern, invites creators
							to explore the contrasts and possibilities between the past and the future. Join us in shaping the future
							through a creative lens that honors the old while embracing the new.
						</p>

						<p className="pb-3 text-hackrpi-yellow">
							Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs in New
							York&apos;s Tech Valley and beyond. All students from all schools are welcome to participate, regardless
							of their major or experience level. Whether you&apos;re a seasoned hacker or a first-time participant,
							HackRPI is the perfect opportunity to learn new skills, meet new people, and have fun!
						</p>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col items-center"
				style={{
					backgroundImage: "linear-gradient(rgba(32, 0, 32, 1), #2b2234",
					backgroundSize: "100% 100%",
					width: "100vw",
					height: "25vh",
				}}
			>
				<div>
				<div className="w-full flex flex-col items-center lg:items-start lg:mt-0 h-full lg:ml-4">
						{/* Registration Banner */}
						<div
							data-testid="register-now-banner"
						className="w-full lg:w-11/12 bg-hackrpi-secondary-orange text-white text-xl h-fit overflow-hidden whitespace-nowrap font-bold lg:mt-16 pl-1"
						>
							REGISTER NOW!
						</div>
					<div className="w-full lg:w-11/12 flex justify-center lg:justify-start mt-3">
						<RegistrationLink className="text-xl" />
					</div>
						{/* Event Info Box */}
						<div className="w-full lg:w-11/12 bg-gray-900 text-white h-fit flex flex-col items-start justify-start font-modern">
							<div className="w-full h-2 bg-white mt-4" />

							<h2 className="flex items-center text-2xl xs:text-4xl font-semibold pl-2 mt-2 text-nowrap">
								When &amp; Where{" "}
								<svg
									className="fill-white ml-4 rotate-180 md:rotate-90 lg:rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									viewBox="0 0 11 11"
								>
									<path d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z" />
								</svg>
							</h2>

							<div className="w-11/12 flex flex-col md:flex-row lg:flex-col items-start justify-center md:justify-start md:items-center lg:items-start lg:justify-center">
								<div className="pl-2 text-md xs:text-xl mb-4 md:mb-8 lg:mb-4 mt-2 w-1/2 md:min-w-80">
									<p data-testid="event-date" className="w-fit text-nowrap">
										November 15-16, 2025
									</p>
									<p data-testid="event-location" className="w-fit text-nowrap">
										Rensselaer Polytechnic Institute
									</p>
									<p data-testid="event-venue" className="w-fit text-nowrap">
										Darrin Communications Center
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
