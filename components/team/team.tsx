"use client";

import React, { useCallback, useEffect, useState } from "react";
import HackRPILink from "../themed-components/hackrpi-link";
import { Director, team, teamColors, executive } from "../../data/members";
import Image from "next/image";

export default function TeamComponent() {
	const [directorsAnim, setDirectorsAnim] = useState({
		directors: team.directors,
		offset: 0,
		hover: false,
		time: Date.now(),
	});
	const [organizersAnim, setOrganizersAnim] = useState({
		organizers: team.organizers,
		offset: 0,
		hover: false,
		time: Date.now(),
	});

	const DIRECTOR_DX_PERCENT = 0.03;
	const ORGANIZER_DX_PERCENT = 0.07;

	const animate_directors = useCallback(() => {
		setDirectorsAnim((prev) => {
			if (prev.hover) return prev;
			if (prev.offset <= -110) {
				return {
					directors: [...prev.directors.slice(1), prev.directors[0]],
					offset: 5,
					hover: prev.hover,
					time: Date.now(),
				};
			}
			return {
				directors: prev.directors,
				offset: prev.offset - (Date.now() - prev.time) * DIRECTOR_DX_PERCENT,
				hover: prev.hover,
				time: Date.now(),
			};
		});
		requestAnimationFrame(animate_directors);
	}, []);

	const animate_organizers = useCallback(() => {
		setOrganizersAnim((prev) => {
			if (prev.hover) return prev;
			if (prev.offset <= -111.5) {
				return {
					organizers: [...prev.organizers.slice(1), prev.organizers[0]],
					offset: 11.5,
					hover: prev.hover,
					time: Date.now(),
				};
			}
			return {
				organizers: prev.organizers,
				offset: prev.offset - (Date.now() - prev.time) * ORGANIZER_DX_PERCENT,
				hover: prev.hover,
				time: Date.now(),
			};
		});
		requestAnimationFrame(animate_organizers);
	}, []);

	useEffect(() => {
		const animID1 = requestAnimationFrame(animate_directors);
		const animID2 = requestAnimationFrame(animate_organizers);
		return () => {
			cancelAnimationFrame(animID1);
			cancelAnimationFrame(animID2);
		};
	}, [animate_directors, animate_organizers]);

	return (
		<div className="relative w-full flex justify-center items-stretch mb-4 desktop:pl-0 z-0">
			{/* Main Container */}
			<div
				id="team"
				className="relative z-0 flex w-5/6 desktop:w-2/3 flex-col items-start justify-start bg-black/70 p-6 rounded-2xl shadow-lg"
			>
				{/* Left Box (hidden on small & medium screens) */}
				<div className="hidden lg:flex absolute left-[-105px] top-0 h-full w-[120px] bg-hackrpi-dark-purple z-20 items-center justify-center rounded-r-xl">
					<div className="h-[98%] w-[90%] bg-black rounded-xl flex items-center justify-center shadow-lg">
						<span
							className="font-modern font-extrabold text-[70px] text-hackrpi-light-purple tracking-widest"
							style={{
								writingMode: "vertical-rl",
								textOrientation: "upright",
								transform: "rotate(180deg)",
							}}
						>
							HACKRPI
						</span>
					</div>
				</div>

				{/* Right Box (hidden on small & medium screens) */}
				<div className="hidden lg:flex absolute right-[-105px] top-0 h-full w-[120px] bg-hackrpi-dark-purple z-20 items-center justify-center rounded-l-xl">
					<div className="h-[98%] w-[90%] bg-black rounded-xl flex items-center justify-center shadow-lg">
						<span
							className="font-modern font-extrabold text-[70px] text-hackrpi-light-purple tracking-widest"
							style={{
								writingMode: "vertical-rl",
								textOrientation: "upright",
							}}
						>
							HACKRPI
						</span>
					</div>
				</div>

				{/* Content */}
				<h1 className="text-4xl text-white font-bold font-modern">Meet the Team</h1>
				<p className="w-11/12 desktop:w-full text-hackrpi-light-purple">
					We are a motivated team of RPI students who share a passion for exploring the bounds of Computer Science and a
					commitment to organizing a fantastic event. Our team of students from every grade and major work together to
					organize our Hackathon in the fall and many other smaller events throughout the year. We are always looking
					for more students to join our team and help us make the event a success. If you are interested in helping,
					please join our discord or fill out one of the forms below!
				</p>

				{/* Action Buttons */}
				<div className="flex flex-wrap items-center justify-start md:justify-center xl:justify-between w-full my-4">
					<HackRPILink
						className="w-72 h-12 flex items-center justify-center text-xl text-center my-1"
						href="https://discord.gg/Pzmdt7FYnu"
						target="_blank"
					>
						Join our Organizing Team!
					</HackRPILink>
					<HackRPILink
						className="w-72 h-12 flex items-center justify-center text-xl text-center my-1 sm:mx-2"
						href="https://forms.gle/2riKKB6H2ajsd1FM7"
						target="_blank"
					>
						Help Mentor!
					</HackRPILink>
					<HackRPILink
						className="w-72 h-12 flex items-center justify-center text-xl text-center my-1"
						href="https://forms.gle/3M6TZo7PRwgWSqqB8"
						target="_blank"
					>
						Volunteer!
					</HackRPILink>
				</div>

				{/* Executive Board Section */}
				<h2 className="text-2xl font-bold text-white mt-6">Our Executive Board</h2>
				<div
					className="w-full h-fit overflow-hidden flex text-nowrap py-4 text-white"
					onMouseEnter={() => setDirectorsAnim((p) => ({ ...p, hover: true, time: Date.now() }))}
					onMouseLeave={() => setDirectorsAnim((p) => ({ ...p, hover: false, time: Date.now() }))}
				>
					{directorsAnim.directors.map((director) => DirectorCard(director, directorsAnim.offset))}
				</div>

				{/* Organizers Section */}
				<h2 className="text-2xl font-bold text-white mt-6">Thank You to All of our Organizers</h2>
				<div
					className="w-full h-fit overflow-hidden flex text-nowrap py-4"
					onMouseEnter={() => setOrganizersAnim((p) => ({ ...p, hover: true, time: Date.now() }))}
					onMouseLeave={() => setOrganizersAnim((p) => ({ ...p, hover: false, time: Date.now() }))}
				>
					{organizersAnim.organizers.map((organizer, indx) => (
						<div
							key={indx}
							className="w-fit flex-shrink-0 mr-8 flex items-center justify-center flex-col"
							style={{ transform: `translate(${organizersAnim.offset}%, 0%)` }}
						>
							<div
								className="w-32 aspect-square rounded-full flex items-center justify-center px-8"
								style={{ backgroundColor: teamColors[organizer.team].bg }}
							>
								<div className="my-2 w-full rounded-full flex items-center justify-center flex-col text-white text-center">
									<h3 className="text-lg font-bold whitespace-pre-wrap">{organizer.name}</h3>
									<p>{organizer.team}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function DirectorCard(director: Director, offset: number) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			key={director.name}
			className="w-[200px] sm:w-[180px] md:w-[200px] flex-shrink-0 mr-8 flex flex-col items-center justify-center"
			style={{ transform: `translate(${offset}%, 0%)`, perspective: "1000px" }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Flip Wrapper */}
			<div
				className={`relative w-full aspect-square transition-transform duration-700 transform-style-preserve-3d ${
					hovered ? "rotate-y-180" : ""
				}`}
			>
				{/* FRONT SIDE */}
				<div className="absolute inset-0 rounded-full overflow-hidden backface-hidden">
					<Image
						src={executive[director.name]}
						alt={director.name}
						width={200}
						height={200}
						className="w-full h-full object-cover rounded-full"
						priority
					/>
				</div>

				{/* BACK SIDE */}
				<div
					className="absolute inset-0 rounded-full flex items-center justify-center p-2 sm:p-3 md:p-4 text-center backface-hidden"
					style={{
						backgroundColor: director["team-color"].bg,
						color: director["team-color"].text,
						transform: "rotateY(180deg)",
					}}
				>
					<div className="flex flex-col items-center justify-center h-full w-[90%] overflow-hidden text-center">
						<p
							className="break-words whitespace-normal text-center leading-tight font-medium"
							style={{
								fontSize: "clamp(10px, 1.5vw, 14px)", // 👈 responsive scaling
								lineHeight: "1.2em",
								wordBreak: "break-word",
							}}
						>
							{director.teamDescription}
						</p>
					</div>
				</div>
			</div>

			{/* Name + Role */}
			<div
				className="mt-2 w-full rounded-full flex flex-col items-center justify-center py-1 px-1"
				style={{
					backgroundColor: director["team-color"].bg,
					color: director["team-color"].text,
				}}
			>
				<h3 className="text-base sm:text-lg font-bold leading-tight text-center">{director.name}</h3>
				<p className="text-xs sm:text-sm text-center">{director.role}</p>
			</div>
		</div>
	);
}
