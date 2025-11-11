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
		</div>
	);
}
