"use client";

import FAQPage from "@/components/faq/faq";
import TitleComponent from "@/components/title-components/title";
import NavBar from "@/components/nav-bar/nav-bar";
import AboutSection from "../../components/about-us";
import TeamComponent from "@/components/team/team";
import Sponsors from "@/components/sponsors";
import Footer from "@/components/footer/footer";

export default function Home() {
	return (
		<>
			<NavBar showOnScroll={true} />
			<div className="flex flex-col items-start desktop:items-center justify-start w-full">
				{/*<SearchBar />  Search bar component */}
				<div className="w-full desktop:mx-8">
					<div data-testid="hero-section">
						<TitleComponent />
					</div>
					<div data-testid="about-section" id="about">
						<AboutSection />
					</div>
					<div data-testid="faq-section" id="faq">
						<FAQPage />
					</div>
					<div data-testid="sponsors-section" id="sponsors">
						<Sponsors />
					</div>
					<div data-testid="team-section" id="team">
						<TeamComponent />
					</div>
				</div>
				<Footer />
				{/* Other components and elements */}
			</div>
		</>
	);
}
