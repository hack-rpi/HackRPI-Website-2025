"use client";

import FAQPage from "@/components/faq/faq";
import TitleComponent from "@/components/title-components/title";
import Footer from "@/components/footer/footer";
import AboutSection from "../components/about-us";
import { useEffect, useState } from "react";
import TeamComponent from "@/components/team/team";
import Sponsors from "@/components/sponsors";

export default function Home() {
	const [lineStart, setLineStart] = useState(0);
	const [lineEnd, setLineEnd] = useState(0);
	const [faqStart, setFaqStart] = useState(0);
	const [teamStart, setTeamStart] = useState(0);
	const [sponsorsStart, setSponsorsStart] = useState(0);
	const [showHighlightDot, setShowHighlightDot] = useState(false);

	useEffect(() => {
		const scrollThreshold = window.innerWidth > 860 ? window.innerHeight - 110 : window.innerHeight - 370;
		setLineStart(document.getElementById("about")!.offsetTop);
		setLineEnd(document.getElementById("team")!.offsetTop + document.getElementById("team")!.offsetHeight);
		setFaqStart(document.getElementById("faq")!.offsetTop);
		setSponsorsStart(document.getElementById("sponsors")!.offsetTop);
		setTeamStart(document.getElementById("team")!.offsetTop);
		setShowHighlightDot(window.scrollY > scrollThreshold);

		const handleResize = () => {
			setLineStart(document.getElementById("about")!.offsetTop);
			setLineEnd(document.getElementById("team")!.offsetTop + document.getElementById("team")!.offsetHeight);
			setFaqStart(document.getElementById("faq")!.offsetTop);
			setTeamStart(document.getElementById("team")!.offsetTop);
			setSponsorsStart(document.getElementById("sponsors")!.offsetTop);
			setShowHighlightDot(window.scrollY > scrollThreshold);
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleResize);
		};
	}, []);

	return (
		<>
			<div className="flex flex-col items-start desktop:items-center justify-start w-full">
				<div className="w-full desktop:mx-8">
					<TitleComponent />
					<AboutSection />
					<FAQPage />
					<Sponsors />
					<TeamComponent />
				</div>

				<div
					className={`${
						showHighlightDot ? "fixed top-32 right-3.5 block" : "opacity-0"
					} w-12 h-12 z-[5] bg-white border-[6px] border-hackrpi-light-purple rounded-full transition-opacity duration-500`}
				></div>

				<div
					className="absolute w-3 right-8	 bg-hackrpi-light-purple"
					style={{
						top: lineStart + "px",
						height: lineEnd - lineStart + "px",
					}}
				></div>
				<div
					className={`absolute bg-hackrpi-secondary-dark-blue  w-12 h-12 rounded-full  border-[6px] border-hackrpi-light-purple transition-colors duration-300 z-0 right-3.5`}
					style={{
						top: lineStart - 20 + "px",
					}}
				></div>
				<div
					className={`absolute bg-hackrpi-secondary-dark-blue  w-12 h-12 rounded-full  border-[6px] border-hackrpi-light-purple transition-colors duration-300 z-0 right-3.5`}
					style={{
						top: faqStart - 22 + "px",
					}}
				></div>
				<div
					className={`absolute bg-hackrpi-secondary-dark-blue  w-12 h-12 rounded-full  border-[6px] border-hackrpi-light-purple transition-colors duration-300 z-0 right-3.5`}
					style={{
						top: sponsorsStart + 150 + "px",
					}}
				></div>
				<div
					className={`absolute bg-hackrpi-secondary-dark-blue  w-12 h-12 rounded-full  border-[6px] border-hackrpi-light-purple transition-colors duration-300 z-0 right-3.5`}
					style={{
						top: teamStart - 22 + "px",
					}}
				></div>
				<div
					className={`absolute bg-hackrpi-secondary-dark-blue w-12 h-12 rounded-full  border-[6px] border-hackrpi-light-purple transition-colors duration-300 z-0 right-3.5`}
					style={{
						top: lineEnd - 20 + "px",
					}}
				></div>
			</div>
		</>
	);
}
