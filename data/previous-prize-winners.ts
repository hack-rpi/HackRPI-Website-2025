import type { ProjectDisplayProps } from "@/components/prev-projects/project-display";
import type { ProjectCarouselProps } from "@/components/prev-projects/project-carousel";

export const podiumPrizes: ProjectDisplayProps[] = [
	{
		title: "WALKR",
		authors: ["Ryan Dong", "Oliver Adams", "Jordyn Young"],
		description:
			"WALKR combines GPS coordinates with advanced geospatial mapping to instantly pinpoint the user’s location and provide guidance based on nearby landmarks. Our approach integrates real-time positioning with the angle and orientation of the user’s phone to project an accurate walking route displayed in a mixed-reality headset. Users can simply say their destination aloud, and WALKR’s hands-free voice recognition sets up a precise route without needing a glance at the screen. Notably, WALKR also offers a fully integrated wheelchair-accessible route option, ensuring that users with mobility challenges receive optimal path guidance.",
		imageUrl: "/projectImages/Walkr.png",
		prizeCategory: "First Place",
		imageOnLeft: false,
	},
	{
		title: "Shelfie",
		authors: ["yasemin-et Turkoglu", "phanl2", "Rumeysa Kara", "drchubbington"],
		description:
			"In today's fast-paced urban environment, traditional libraries and bookstores are facing challenges in engaging with the digital-native population. Our team was inspired to bridge this gap by creating Shelfie, a modern solution that makes literary discovery accessible. With many city residents facing time constraints and information overload, we wanted to create a tool that makes finding the right book as easy as using social media, thereby promoting literacy and cultural engagement in urban communities.",
		imageUrl: "/projectImages/Shelfie.png",
		imageOnLeft: true,
		prizeCategory: "Second Place",
	},
	{
		title: "Green",
		authors: ["Mami Ravaloarison"],
		description:
			'"Green" is an app built to reduce traffic emissions by helping drivers find routes with minimal stops as possible. It analyzes current traffic for a route and dynamically recommends routes that avoid traffic hotspots, ensuring drivers spend less time in traffic even though, now the travel time has increased. Every time a user completes a route with fewer emissions, they earn points. These points can then be redeemed for discounts or rewards offered by environmentally conscious companies, such as WWF, National Geographic, and others dedicated to environmental causes.',
		imageUrl: "/projectImages/GreenWinner.png",
		prizeCategory: "Best Sustainability Hack",
		imageOnLeft: false,
	},
];

export const carouselPrizes: ProjectCarouselProps[] = [
	{
		title: "EcoVision",
		authors: ["Nikul Patel", "Robert Acebedo", "Timothy Liakh", "Matteo Rathgeber"],
		description:
			"EcoVISION allows users to upload an image or video of items to identify which can be recycled, reused, or salvaged. For individual users, it provides actionable tips on repurposing items to promote sustainability at home. Additionally, EcoVision’s video processing feature can analyze footage from conveyor belts in waste management facilities, automatically detecting recyclable and reusable items on a larger scale. This capability could streamline sorting processes and boost recycling efficiency in industrial waste management, making EcoVISION adaptable from personal use to large-scale environmental solutions.",
		imageUrl: "/projectImages/EcoVision.png",
		prizeCategory: "Best AI Hack",
	},
	{
		title: "Emission Mission",
		authors: ["Nick Ciuica", "Nyssa Gandhi", "Jeremy Goldberger", "Lyle Jaron Alcordo"],
		description:
			"Emission Mission provides an interactive experience for children to learn about energy sources in their local area. It allows users to input a zip code and will look up energy production information for that specific power grid. Then, it allows users to choose to add their own power plant and see how it affects their local region!",
		imageUrl: "/projectImages/Emission Mission.png",
		prizeCategory: " Best Education Hack",
	},
	{
		title: "Quantum Shor's Algorithm",
		authors: ["SethW4 Watabe", "Kazuki Neo"],
		description:
			"Our project implements Shor's algorithm, a quantum algorithm that factors large integers, which forms the basis of many encryption schemes. By demonstrating how Shor's algorithm can factorize numbers, we illustrate how quantum computing could eventually break traditional encryption, highlighting the need for quantum-safe security solutions.",
		imageUrl: "/projectImages/image.png",
		prizeCategory: "Best Quantum Hack ",
	},
	{
		title: "Street Bites",
		authors: ["Sree Lasya Gogineni", "Irene", "Ananya Subramaniam", "Sahasra Yellapragada"],
		description:
			"Through Street Bites, users can better navigate and find food trucks and not feel overwhelmed or stressed by choices in urban areas. We also help food truck owners attract more customers, additionally supporting small businesses in the process.",
		imageUrl: "/projectImages/Street Bites.png",
		prizeCategory: "Best Startup Hack",
	},
	{
		title: "The Green Room",
		authors: ["DavidASC20 Chong", "Elvis Sun"],
		description:
			"The Green Room is an AR app that lets users visualize a variety of plants in their own space. Through a blend of AR, interactive plant information, and ai-driven personalized recommendations, the app helps users choose the perfect plants based on their unique environment and lifestyle. Users can view the plants in AR, learn about each plant's care requirements and optimal placement, and even analyse where in their room these plants would fit best.",
		imageUrl: "/projectImages/The Green Room.png",
		prizeCategory: "Best Mobile Hack",
	},
	{
		title: "EcoDraft",
		authors: ["Phu Thai", "Kelly Crane"],
		description:
			"Cranek2 is an architecture major attempting to minor in CS. This Hackathon on Urban planning was the perfect opportunity to blend our interests in software engineering and architecture. Phuthai450 just wants to learn the Blazor stack for personal experience.",
		imageUrl: "/projectImages/EcoDraft.png",
		prizeCategory: "Best Cybersecurity Hack",
	},
	{
		title: "Mango Maps",
		authors: ["Justin Chen", "Christopher Poon", "MBtheOtaku", "WangWNico Wang"],
		description:
			"This project can be summed up as an aggregate of various geographical data sources all in one place. Its purpose is to provide an architect, city planner, tourist, and etc with as much information about a place as possible. Our project currently displays information such as region air quality, individual building characteristics, areas susceptible to flooding, evacuation centers in case of disasters, and fun visualizations of theoretical disasters.",
		imageUrl: "/projectImages/Mango Maps.png",
		prizeCategory: "Best Data Science Hack",
	},
	{
		title: "UrbanSpark",
		authors: ["Roman Slack", "Koushik Sarkar", "Wasi Hussain", "Glenn Tatum"],
		description:
			"UrbanSpark serves as a personalized recommendation platform that leverages AI to analyze user input and deliver curated suggestions for urban opportunities. Users start by completing a quick onboarding form where they share details such as their location, interests, and goals. From there, UrbanSpark’s AI engine generates a series of queries tailored to their profile. These queries are then processed by the SerpAPI to retrieve up-to-date information on educational programs, jobs, volunteering, events, and more. Finally, the information is summarized into concise recommendations, which are presented on a user-friendly dashboard, guiding users toward the opportunities best suited to their aspirations.",
		imageUrl: "/projectImages/UrbanSpark.png",
		prizeCategory: "Best Beginner Hack",
	},
	{
		title: "Last Hope Alarm Clock",
		authors: ["Joe Schmoe"],
		description: "Electrocutes you to wake you up. You can set the time from your phone.",
		imageUrl: "/projectImages/Last Hope Alarm Clock.png",
		prizeCategory: "Track Challenge: Ship Fast, Ship Often – Build a Payworthy MVP in a Weekend",
	},
	{
		title: "MedLink Pro",
		authors: ["Jimmy Zhen", "Hayden Dinkin", "Rittivuth Chea", "Thomas Cho"],
		description:
			"MedLink Pro connects nurses with doctors across different hospitals to facilitate urgent consultations, especially in hospitals that face staffing shortages or are located in rural areas. This way, patients can receive prompt advice and necessary care without excessive delays.",
		imageUrl: "/projectImages/MedLink Pro.png",
		prizeCategory: "Best Public Health Innovation",
	},
	{
		title: "AccessACity",
		authors: ["Lilu K", "nicoleSpaul", "bjk2023"],
		description:
			"AccessACity's major function is its event system. We display the local states and cities in those states of our users. Then, using a modern navigation system, users can locate their events on maps. They can save these events, rsvp to them, and even make their own.",
		imageUrl: "/projectImages/AccessACity.png",
		prizeCategory: "Track Challenge: Ship Fast, Ship Often – Build a Payworthy MVP in a Weekend ",
	},
	{
		title: "RPInSights",
		authors: ["Tazeem Mahashin"],
		description:
			"In my first week as a freshman I heavily relied on Google Maps to navigate the RPI campus which was quite challenging. I noticed that Google Maps was good for getting me places but even then it tend to give me the wrong direction, mess up, etc and it lacked real-time data on facilities like dining halls, study spaces, and how I could take advantage of these resources to make the most of my time at RPI. This problem inspired me to develop RPInSights, a modern, AI-powered campus navigation tool with interactive 3D mapping.",
		imageUrl: "/projectImages/RPInSights.png",
		prizeCategory: "Track Challenge: Ship Fast, Ship Often – Build a Payworthy MVP in a Weekend",
	},
	{
		title: "Able",
		authors: ["Erik Umble", "Joel McCandless"],
		description:
			"It provides users with an assistant that can analyze nearby locations, provide recommendations, and share human voice experiences from community members who have been to those places.",
		imageUrl: "/projectImages/image.png",
		prizeCategory: "Accessibilities Track",
	},
];
