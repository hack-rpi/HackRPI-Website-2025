"use client";

import FAQPage from "@/components/faq/faq";
import TitleComponent from "@/components/title-components/title";
import NavBar from "@/components/nav-bar/nav-bar";
import Footer from "@/components/footer/footer";
import AboutSection from "../components/about-us";
import { useEffect, useState } from "react";
import TeamComponent from "@/components/team/team";
import Sponsors from "@/components/sponsors";
import { initializeSearch } from "../utils/searchBar";

const SearchBar = () => {
	return <input type="text" id="tags" placeholder="Search..." />;
};

export default function Home() {
	const [lineStart, setLineStart] = useState(0);
	const [lineEnd, setLineEnd] = useState(0);
	const [faqStart, setFaqStart] = useState(0);
	const [teamStart, setTeamStart] = useState(0);
	const [sponsorsStart, setSponsorsStart] = useState(0);
	const [showHighlightDot, setShowHighlightDot] = useState(false);

	useEffect(() => {
		initializeSearch(); // Initialize the search functionality

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
				<NavBar showOnScroll={true} />
				<SearchBar /> {/* Search bar component */}
				<div className="w-full desktop:mx-8">
					<TitleComponent />
					<AboutSection />
					<FAQPage />
					<Sponsors />
					<TeamComponent />
				</div>
				{/* Other components and elements */}
			</div>
			<Footer />
			<Footer />
			<Footer />
		</>
	);
}
