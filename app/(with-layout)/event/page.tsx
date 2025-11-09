"use client";

import React from "react";
import "@/app/globals.css";
//import NavBar from "@/components/nav-bar/nav-bar";
import MapsDCCLow from "@/components/maps/maps";
// import GoogleMapsWidget from "@/components/maps/google_maps"; // Commenting out for now, may be used in the future
import HackRPILink from "@/components/themed-components/hackrpi-link";
import Image from "next/image";

function EventPage() {
	return (
		<>
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
					<h1 className="text-4xl text-white font-modern ml-4">Need Help?</h1>
					<div className="w-full flex items-start justify-start flex-col md:flex-row">
						<div className="container p-4">
							<h2 className=" font-retro text-2xl mb-4 text-white">MENTORING INFORMATION</h2>
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
							<h2 className="font-retro text-2xl mb-4 text-white">EVENT DISCORD</h2>
							<p className="text-xl mb-8 text-white">
								Join the HackRPI 2025 Discord server to stay connected and make the most of your hackathon experience!
								Have questions for the staff? Want to chat with other participants? Looking for a team? Join the
								conversation on Discord and get the support you need to succeed at HackRPI.
							</p>
							<HackRPILink
								href="https://discord.gg/BkDVUmrufa"
								className="hover:bg-gradient-to-br hover:from-[#5865F2] hover:to-[#7289da] hover:bg-transparent hover:border-[#5865F2] w-20 h-20 flex items-center justify-center"
								target="_blank"
							>
								<Image src="/social/discord.svg" alt="Discord Logo" width={50} height={50} />
							</HackRPILink>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-start w-full py-12" id="project-submission">
					<h1 className="p-4 text-5xl font-modern text-center text-transparent bg-clip-text bg-gradient-to-r from-hackrpi-orange to-hackrpi-yellow mb-8">
						Project Submission and Judging
					</h1>

					{/* Judging Criteria Section */}
					<div className="w-full max-w-7xl px-4 mb-16">
						<div className="text-center mb-12">
							<h2 className="font-retro text-4xl mb-4 text-hackrpi-orange inline-block relative">
								JUDGING CRITERIA
								<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-hackrpi-orange to-hackrpi-pink"></div>
							</h2>
							<p className="mt-8 text-lg text-hackrpi-yellow max-w-3xl mx-auto">
								After coding ends at 11am on Sunday, present your project to our panel of industry professionals,
								professors, alumni, and fellow students. They&apos;ll evaluate your work based on these criteria:
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Practicality & Utility Card */}
							<div className="group relative bg-gradient-to-br from-hackrpi-pink/20 to-hackrpi-pink/5 border-2 border-hackrpi-pink/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-pink">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-pink rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									🎯
								</div>
								<h3 className="font-bold text-xl text-hackrpi-pink mb-3">Practicality & Utility</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									What problem do you want to solve? How applicable is your hack to problems we&apos;re facing today?
									Any future plans?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-pink to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Creativity Card */}
							<div className="group relative bg-gradient-to-br from-hackrpi-light-purple/20 to-hackrpi-light-purple/5 border-2 border-hackrpi-light-purple/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-light-purple rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									💡
								</div>
								<h3 className="font-bold text-xl text-hackrpi-light-purple mb-3">Creativity</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									How original is your hack? Is this a novel idea or something that many people have come across?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-light-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Technical Difficulty Card */}
							<div className="group relative bg-gradient-to-br from-hackrpi-orange/20 to-hackrpi-orange/5 border-2 border-hackrpi-orange/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-orange">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-orange rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									⚡
								</div>
								<h3 className="font-bold text-xl text-hackrpi-orange mb-3">Technical Difficulty</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									How technically challenging is it? Which technologies did you use?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-orange to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Effort Card */}
							<div className="group relative bg-gradient-to-br from-hackrpi-yellow/20 to-hackrpi-yellow/5 border-2 border-hackrpi-yellow/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-yellow">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-yellow rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									💪
								</div>
								<h3 className="font-bold text-xl text-hackrpi-yellow mb-3">Effort</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									Did the team genuinely commit time and effort to this product?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-yellow to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* User Experience Card */}
							<div className="group relative bg-gradient-to-br from-hackrpi-pink/20 to-hackrpi-pink/5 border-2 border-hackrpi-pink/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-pink">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-pink rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									✨
								</div>
								<h3 className="font-bold text-xl text-hackrpi-pink mb-3">User Experience</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									What impression do you get from the hack? Does it provide for a smooth user experience?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-pink to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Collaboration & Learning Card */}
							<div className="group relative bg-gradient-to-br from-hackrpi-light-purple/20 to-hackrpi-light-purple/5 border-2 border-hackrpi-light-purple/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-light-purple rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									🤝
								</div>
								<h3 className="font-bold text-xl text-hackrpi-light-purple mb-3">Collaboration & Learning</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									Did the team work well together and split up work? Did they learn from the experience?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-light-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>
						</div>
					</div>

					{/* Project Submission Section */}
					<div className="w-full max-w-7xl px-4">
						<div className="text-center mb-12">
							<h2 className="font-retro text-4xl mb-4 text-hackrpi-orange inline-block relative">
								PROJECT SUBMISSION
								<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-hackrpi-pink to-hackrpi-orange"></div>
							</h2>
							<p className="mt-8 text-lg text-hackrpi-yellow max-w-3xl mx-auto">
								Submit your project through Devpost and showcase your amazing work!
							</p>
						</div>

						{/* Submission Timeline */}
						<div className="w-full max-w-[1600px] mx-auto mb-12 px-2 sm:px-4">
							<div className="relative">
								{/* Timeline Line */}
								<div className="absolute left-6 sm:left-8 lg:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-hackrpi-orange via-hackrpi-pink to-hackrpi-light-purple"></div>

								{/* Timeline Steps */}
								<div className="space-y-8">
									{/* Step 1 */}
									<div className="relative flex items-start">
										<div className="relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-hackrpi-orange rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl shadow-lg shadow-hackrpi-orange/50">
											1
										</div>
										<div className="ml-6 md:ml-8 lg:ml-10 bg-gradient-to-r from-hackrpi-orange/10 to-transparent border-l-4 border-hackrpi-orange p-5 md:p-6 lg:p-8 rounded-r-lg flex-1">
											<h3 className="text-2xl md:text-3xl font-bold text-hackrpi-orange mb-2">Create Your Account</h3>
											<p className="text-gray-300 md:text-lg">
												<a
													href="https://secure.devpost.com/users/register?ref_content=signup_global_nav&ref_feature=signup&ref_medium=button"
													target="_blank"
													rel="noopener noreferrer"
													className="text-hackrpi-light-purple hover:text-hackrpi-pink underline transition-colors"
												>
													Sign up for a Devpost account
												</a>{" "}
												to get started with your submission.
											</p>
										</div>
									</div>

									{/* Step 2 */}
									<div className="relative flex items-start">
										<div className="relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-hackrpi-pink rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl shadow-lg shadow-hackrpi-pink/50">
											2
										</div>
										<div className="ml-6 md:ml-8 lg:ml-10 bg-gradient-to-r from-hackrpi-pink/10 to-transparent border-l-4 border-hackrpi-pink p-5 md:p-6 lg:p-8 rounded-r-lg flex-1">
											<h3 className="text-2xl md:text-3xl font-bold text-hackrpi-pink mb-2">Prepare Your Submission</h3>
											<p className="text-gray-300 mb-3 md:text-lg">Include these essential elements:</p>
											<ul className="space-y-2 text-sm md:text-base lg:text-lg text-gray-400">
												<li className="flex items-center">
													<span className="text-hackrpi-yellow mr-2">▸</span>
													Project title and description
												</li>
												<li className="flex items-center">
													<span className="text-hackrpi-yellow mr-2">▸</span>
													Demo video showcasing your hack
												</li>
												<li className="flex items-center">
													<span className="text-hackrpi-yellow mr-2">▸</span>
													Technologies used and challenges faced
												</li>
												<li className="flex items-center">
													<span className="text-hackrpi-yellow mr-2">▸</span>
													Team member information
												</li>
											</ul>
										</div>
									</div>

									{/* Step 3 */}
									<div className="relative flex items-start">
										<div className="relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-hackrpi-yellow rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl shadow-lg shadow-hackrpi-yellow/50">
											3
										</div>
										<div className="ml-6 md:ml-8 lg:ml-10 bg-gradient-to-r from-hackrpi-yellow/10 to-transparent border-l-4 border-hackrpi-yellow p-5 md:p-6 lg:p-8 rounded-r-lg flex-1">
											<h3 className="text-2xl md:text-3xl font-bold text-hackrpi-yellow mb-2">
												Submit Before Deadline
											</h3>
											<div className="space-y-2 text-gray-300 md:text-lg">
												<p className="flex items-center">
													<span className="text-hackrpi-orange font-bold mr-2">📅</span>
													Submit by <span className="font-bold text-hackrpi-orange mx-1">9:00 AM Sunday</span>
												</p>
												<p className="flex items-center">
													<span className="text-hackrpi-pink font-bold mr-2">✏️</span>
													Edit until <span className="font-bold text-hackrpi-pink mx-1">11:00 AM Sunday</span>
												</p>
											</div>
										</div>
									</div>

									{/* Step 4 */}
									<div className="relative flex items-start">
										<div className="relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-hackrpi-light-purple rounded-full flex items-center justify-center text-xl md:text-2xl lg:text-3xl shadow-lg shadow-hackrpi-light-purple/50">
											4
										</div>
										<div className="ml-6 md:ml-8 lg:ml-10 bg-gradient-to-r from-hackrpi-light-purple/10 to-transparent border-l-4 border-hackrpi-light-purple p-5 md:p-6 lg:p-8 rounded-r-lg flex-1">
											<h3 className="text-2xl md:text-3xl font-bold text-hackrpi-light-purple mb-2">
												Present Your Project
											</h3>
											<p className="text-gray-300 md:text-lg">
												After 11am, no changes allowed. Be ready to give a live demo and explain your project to the
												judges!
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* CTA Button */}
						<div className="text-center">
							<HackRPILink
								href="https://hackrpi2025.devpost.com/"
								className="inline-block w-full sm:w-auto text-3xl sm:text-4xl md:text-5xl px-10 sm:px-14 md:px-20 py-6 sm:py-8 md:py-10 bg-gradient-to-r from-hackrpi-orange to-hackrpi-pink hover:from-hackrpi-pink hover:to-hackrpi-light-purple transform hover:scale-105 md:hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl ring-4 ring-hackrpi-yellow/60 border-hackrpi-yellow/70 !text-white hover:!text-white drop-shadow-md rounded-xl"
								target="_blank"
							>
								SUBMIT ON DEVPOST
							</HackRPILink>
							<p className="mt-4 text-sm text-gray-400">
								Ready to showcase your amazing project? Click above to start your submission!
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EventPage;
