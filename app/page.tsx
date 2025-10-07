"use client";

import FAQPage from "@/components/faq/faq";
import TitleComponent from "@/components/title-components/title";
import NavBar from "@/components/nav-bar/nav-bar";
import AboutSection from "../components/about-us";
import TeamComponent from "@/components/team/team";
import Sponsors from "@/components/sponsors";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const createCat = async () => {
      try {
        console.log("Calling the MongoDB API route...");
        const response = await fetch("/api/mongoTest", {
          method: "POST", // Or GET if you're not sending any body
        });

        const data = await response.json();

        if (response.ok) {
          console.log("API Response:", data.message);
        } else {
          console.error("API Error:", data.error);
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    createCat();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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
