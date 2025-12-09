const EVENT_CONFIG = {
	name: "HackRPI",
	year: "2025",
	fullName: "HackRPI 2025",
	themeTitle: "Retro vs. Modern",
	startTime: "noon on Saturday, November 15th",
	teamSize: "1–4 people",
	duration: "24 hours",
	region: "New York's Tech Valley",
	location: "Rensselaer Polytechnic Institute",
	venue: "Darrin Communications Center",
};

export default function AboutUs() {
	return (
		<div>
			<div
				id="about"
				className="w-11/12 lg:w-full mx-auto mt-12 mb-18 flex flex-col lg:flex-row items-start justify-start h-fit ml-0 pl-8 lg:pl-0"
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
						About {EVENT_CONFIG.fullName}
					</h1>

					<div className="w-11/12">
						<p className="pb-3 text-hackrpi-light-purple">
							{EVENT_CONFIG.fullName} is {EVENT_CONFIG.location}&apos;s annual intercollegiate hackathon hosted by
							students for students. Starting at {EVENT_CONFIG.startTime}, teams of {EVENT_CONFIG.teamSize} have{" "}
							{EVENT_CONFIG.duration} to build and submit projects relating to our theme,{" "}
							<span data-testid="theme-title" className="text-hackrpi-light-purple font-bold">
								{EVENT_CONFIG.themeTitle}
							</span>
							. After submitting their projects, participants demonstrate their work in front of a panel of professors,
							industry professionals, and fellow students.
						</p>

						<p className="pb-3 text-hackrpi-pink">
							<span data-testid="theme-description" className="text-hackrpi-primary-dark-purple font-bold">
								{EVENT_CONFIG.themeTitle}:
							</span>{" "}
							In a world where nostalgia meets innovation, our {EVENT_CONFIG.year} hackathon, {EVENT_CONFIG.themeTitle},
							invites creators to explore the contrasts and possibilities between the past and the future. Join us in
							shaping what comes next through a creative lens that honors the old while embracing the new.
						</p>

						<p className="pb-3 text-hackrpi-yellow">
							Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs in{" "}
							{EVENT_CONFIG.region} and beyond. All students from all schools are welcome to participate, regardless of
							their major or experience level. Whether you&apos;re a seasoned hacker or a first-time participant,{" "}
							{EVENT_CONFIG.fullName} is the perfect opportunity to learn new skills, meet new people, and have fun!
						</p>

						<p className="pb-3 text-hackrpi-light-purple">
							This year&apos;s event will be held at {EVENT_CONFIG.location} in the {EVENT_CONFIG.venue}.
						</p>
					</div>
				</div>
			</div>

			{/* Footer gradient section */}
			<div
				className="flex flex-col items-center"
				style={{
					backgroundImage: "linear-gradient(rgba(32, 0, 32, 1), #2b2234",
					backgroundSize: "100% 100%",
					width: "100vw",
					height: "25vh",
				}}
			/>
		</div>
	);
}