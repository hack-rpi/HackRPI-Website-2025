"use client";

import FAQPage from "@/components/faq/faq";
import TitleComponent from "@/components/title-components/title";
import NavBar from "@/components/nav-bar/nav-bar";
import AboutSection from "../components/about-us";
import TeamComponent from "@/components/team/team";
import Sponsors from "@/components/sponsors";

export default function Home() {
	return (
		<>
			<div className="flex flex-col items-start desktop:items-center justify-start w-full">
				<NavBar showOnScroll={true} />
				{/*<SearchBar />  Search bar component */}
				<div className="w-full desktop:mx-8">
					<TitleComponent />
					<AboutSection />
					<FAQPage />
					<Sponsors />
					<TeamComponent />
				</div>
				{/* Other components and elements */}
			</div>
		</>
	);
}
