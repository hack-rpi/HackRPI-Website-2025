"use client";

import React from "react";
import "@/app/globals.css";
import Footer from "../../components/footer/footer";
import NavBar from "@/components/nav-bar/nav-bar";
import MapsDCCLow from "@/components/maps/maps";
// import GoogleMapsWidget from "@/components/maps/google_maps"; // Commenting out for now, may be used in the future
import HackRPILink from "@/components/themed-components/hackrpi-link";
import Image from "next/image";

function EventPage() {
	return (
		<>
			<NavBar showOnScroll={false} />

			<div className="justify-center flex w-full flex-col  bg-hackrpi-dark-blue pt-24 desktop:pt-16">
				<div className="px-4 flex flex-wrap items-start justify-center mb-8">
					<div className="w-full desktop:w-1/2 p-4 min-w-[350px] sm:min-w-[450px]">
						<h1 className="font-semibold text-5xl text-hackrpi-orange mb-4 font-neutral">Location:</h1>
						<div className="text-2xl mb-10">
							<h3 className="text-hackrpi-orange text-3xl font-bold">📍 Darrin Communications Center 📍</h3>
							<h3 className="text-hackrpi-yellow font-bold"> Rensselaer Polytechnic Institute</h3>
							<p className="text-hackrpi-yellow">
								Address:{" "}
								<a
									href="https://maps.google.com/?q=Darrin+Communications+Center+51+College+Ave+Troy+NY+12180"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									Darrin Communications Center, Troy, NY 12180
								</a>
							</p>
						</div>

						<div className="w-full h-96">
							<iframe
								width="100%"
								height="100%"
								frameBorder="0"
								style={{ border: 0 }}
								src="https://maps.google.com/?q=Darrin+Communications+Center+51+College+Ave+Troy+NY+12180&output=embed"
								allowFullScreen
							></iframe>
						</div>

						<div className="text-2xl mt-10">
							<h3 className="font-bold text-4xl text-hackrpi-orange font-neutral">Free Parking</h3>
							<p className="text-hackrpi-yellow">
								Parking is available at North Hall Parking Lot, 2-minute walk to Darrin Communications Center
							</p>
							<p className="text-hackrpi-yellow">
								Parking Address:{" "}
								<a
									href="https://maps.google.com/?q=North+Lot+Troy+NY+12180"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									North Lot, Troy, NY 12180
								</a>
							</p>
						</div>
						<div className="mt-4 text-2xl text-hackrpi-yellow">
							<p>
								Be sure to check-in with our organizers at the organizing team table in the front of the DCC.
								Participants will be given a wrist band at check-in which will grant access to food, and activities.
								Check-in is open throughout the event!
							</p>
						</div>
					</div>

					{/* Right Side - Map */}
					<div className="w-full desktop:w-1/2 p-4 min-w-[350px] sm:min-w-[450px] desktop:mt-8">
						<MapsDCCLow />
					</div>
				</div>
				<div className="flex flex-row items-center justify-center bg-gradient-to-r from-hackrpi-pink via-hackrpi-light-purple to-hackrpi-pink w-full py-8">
					<h1 className="text-4xl text-white font-bold ml-4">Need Help?</h1>
					<div className="w-full flex items-start justify-start flex-col md:flex-row">
						<div className="container p-4">
							<h2 className=" font-semibold text-2xl mb-4 text-white">MENTORING INFORMATION</h2>
							<p className=" text-xl text-white">
								Mentors will be available throughout HackRPI to provide invaluable guidance and assistance to
								participants. Whether you need help with coding, debugging, refining your project idea, or navigating
								the challenges of a hackathon, our experienced mentors are here to support you every step of the way.
								With their expertise, you&apos;ll be able to overcome obstacles, learn new skills, and maximize your
								hackathon experience. Don&apos;t hesitate to seek out their advice and make the most of the mentorship
								opportunities available at HackRPI.
							</p>
						</div>

						<div className="container flex flex-col items-start p-4">
							<h2 className="font-semibold text-2xl mb-4 text-white">EVENT DISCORD</h2>
							<p className="text-xl mb-8 text-white">
								Join the HackRPI 2025 Discord server to stay connected and make the most of your hackathon experience!
								Have questions for the staff? Want to chat with other participants? Looking for a team? Join the
								conversation on Discord and get the support you need to succeed at HackRPI.
							</p>
							{/* //TODO: Change the discord link to 2025 HackRPI Discord */}
							<HackRPILink
								href="https://discord.gg/7b2zc8fe26"
								className="hover:bg-gradient-to-br hover:from-[#5865F2] hover:to-[#7289da] hover:bg-transparent hover:border-[#5865F2] w-20 h-20 flex items-center justify-center"
								target="_blank"
							>
								<Image src="/social/discord.svg" alt="Discord Logo" width={50} height={50} />
							</HackRPILink>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-start justify-start w-full" id="project-submission">
					<h1 className="p-4 text-4xl font-modern text-hackrpi-yellow">Project Submission and Judging</h1>
					<div className="flex flex-col md:flex-row">
						<div className="container p-4">
							<h1 className="font-semibold text-3xl mb-4 text-hackrpi-light-purple">JUDGING CRITERIA</h1>
							<p className="mb-2 text-hackrpi-light-purple">
								After coding ends, at noon on Sunday, you will have the opportunity to present your project to a panel
								of judges. These judges are industry professionals, professors, alumni, and fellow students who will
								evaluate your project based on the following criteria:
							</p>
							<ul className="text-lg list-disc list-inside text-hackrpi-yellow">
								<li className=" border-b border-gray-400 mb-2 text-hackrpi-pink">
									<strong className="text-hackrpi-pink">Practicality & Utility:</strong> What problem do you want to
									solve? How applicable is your hack to problems we&apos;re facing today? Any future plans?
								</li>
								<li className=" border-b border-gray-400 mb-2 text-hackrpi-light-purple">
									<strong className="text-hackrpi-light-purple">Creativity:</strong> How original is your hack? Is this
									a novel idea or something that many people have come across?
								</li>
								<li className=" border-b border-gray-400 mb-2 text-hackrpi-pink">
									<strong className="text-hackrpi-pink">Technical Difficulty:</strong> How technically challenging is
									it? Which technologies did you use?
								</li>
								<li className=" border-b border-gray-400 mb-2 text-hackrpi-light-purple">
									<strong className="text-hackrpi-light-purple">Effort:</strong> Did the team genuinely commit time and
									effort to this product?
								</li>
								<li className=" border-b border-gray-400 mb-2 text-hackrpi-pink">
									<strong className="text-hackrpi-pink">User Experience:</strong> What impression do you get from the
									hack? Does it provide for a smooth user experience?
								</li>
								<li className=" border-b border-gray-400 mb-2 text-hackrpi-light-purple">
									<strong className="text-hackrpi-light-purple">Collaboration & Learning:</strong> Did the team work
									well together and split up work? Did they learn from the experience?
								</li>
							</ul>
						</div>

						<div className="flex flex-col p-4 text-hackrpi-pink">
							<h1 className="font-semibold text-3xl mb-4 text-hackrpi-pink">PROJECT SUBMISSION</h1>
							<p className="text-lg mb-2">
								HackRPI uses Devpost to manage project submissions. You will need to{" "}
								<a
									href="https://secure.devpost.com/users/register?ref_content=signup_global_nav&ref_feature=signup&ref_medium=button"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									create a Devpost account
								</a>{" "}
								and submit your project to the HackRPI 2025 hackathon page. Make sure to include a title, description,
								demo video, and any other relevant information about your project.
							</p>
							<p className="text-lg mb-2">
								You can submit your project at any time before 11:00 AM on Sunday. You must have a Devpost submission to
								be eligible for judging. You can edit your project submission until 12:00 PM on Sunday.{" "}
							</p>
							<p className="text-lg mb-2">
								After noon, you will not be able to make any changes to your project or your submission. Judging begins
								immediately after the submission deadline. You must be present at the event to give a live demo and
								explain your project to the judges.
							</p>
							<HackRPILink
								href="https://hackrpi2024.devpost.com/"
								className="text-3xl mt-4 text-center text-hackrpi-orange"
								target="_blank"
							>
								DEVPOST
							</HackRPILink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EventPage;
