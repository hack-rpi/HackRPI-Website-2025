import ai_prize from "@/public/prizes/AITrack.jpeg";
import sustainability_prize from "@/public/prizes/sustainability.png";
//import education_prize from "@/public/prizes/education.jpg";
import quantum_prize from "@/public/prizes/quantum_computer.jpg";
//import cybersecurity_prize from "@/public/prizes/cybersecurity.jpg";
import mobile_prize from "@/public/prizes/mobile_app.jpg";
//import startup_prize from "@/public/prizes/startup.png";
import data_science_prize from "@/public/prizes/data_science.jpg";
import beginner_prize from "@/public/prizes/coding.webp";
import ugly_code_prize from "@/public/prizes/ugly_code.png";
//import thin_air from "@/public/sponsors/sponsor_logos/ThinAir.png";
//import palantir from "@/public/sponsors/sponsor_logos/Palantir.png";
//import accessibility_prize from "@/public/prizes/Accessibility.webp";
//import midnight from "@/public/prizes/midnight.webp";
//import cloudflare from "@/public/prizes/cloudflare.webp";
//import tech from "@/public/prizes/tech.webp";
//import hashicorp from "@/public/prizes/hashicorp.webp";
//import databricks from "@/public/prizes/databricks.webp";
import hardware_prize from "@/public/prizes/hardwareTrack.webp";
import golf_prize from "@/public/prizes/golf.jpg";
import machine_learning_prize from "@/public/prizes/machine_learning_track.png";
import healthcare_prize from "@/public/prizes/stethoscope.png";

import { StaticImageData } from "next/image";

export interface Prize {
	name: string;
	amount: string;
	description: string;
	imagePath?: StaticImageData;
}

export const podiumPrizes: Prize[] = [
	{
		name: "1st",
		amount: "$1000",
		description: "",
	},
	{
		name: "2nd",
		amount: "$750",
		description: "",
	},
];

export const majorPrizes: Prize[] = [
	{
		name: "Best Machine Learning Hack",
		amount: "$400 Cash Prize",
		description: "Coding an AI from scratch? This prize goes to the best project utilizing a homegrown AI model.",
		imagePath: machine_learning_prize,
	},
	{
		name: "Best Healthcare Hack",
		amount: "$400 Cash Prize",
		description:
			"Does an apple a day really keep the doctor away? With your project, we're sure it will! This prize goes those who have demonstrated exceptional creativity, technical skill, and a dedication to making a meaningful impact on global health through thoughtful analysis and implementation of data-driven solutions.",
		imagePath: healthcare_prize,
	},
	{
		name: "Best Sustainability Hack",
		amount: "$400 Cash Prize",
		description:
			"Go green or go home! This prize recognizes the project that most creatively tackles environmental challenges with a retro or modern spin.",
		imagePath: sustainability_prize,
	},
];

export const minorPrizes: Prize[] = [
	{
		name: "Best Use of AI",
		amount: "Air Fryers",
		description:
			"Ready to implement ChatGPT, Gemeni, Claude or another AI into your project? The winner of this prize best implements an external AI model into their project.",
		imagePath: ai_prize,
	},
	{
		name: "Best Data Science Hack",
		amount: "Amazon Echo Dots",
		description:
			"Crunch those numbers! Given to the project that uses data science to unravel the mysteries of a retro v. modern world, driving decisions with insightful analytics.",
		imagePath: data_science_prize,
	},
	{
		name: "Best First Time Hack",
		amount: "Lego Sets",
		description:
			"Newbies unite! Awarded to the top project by first-time hackers that addresses retro (or modern!) challenges, showing off their fresh creativity and hard work.",
		imagePath: beginner_prize,
	},
	{
		name: "Best Mobile Hack",
		amount: "Portable Chargers",
		description:
			"Got an app for that? Recognizes the project that delivers the slickest, most useful mobile application for folks in a retro (or modern) world.",
		imagePath: mobile_prize,
	},
	{
		name: "Best Hardware Hack",
		amount: "Amazon Fire sticks",
		description:
			"Are you more of a hardware person? If you are, then this track is for you - blow everyone away with technology that moves beyond just a screen.",
		imagePath: hardware_prize,
	},
	{
		name: "Best Quantum Computing Hack",
		amount: "JBL Speakers",
		description:
			"Entangle some qubits and blow our minds! This prize celebrates the project that uses quantum computing to solve a retro/modern problem, proving that the future really is now (and at RPI!).",
		imagePath: quantum_prize,
	},
	{
		name: "Ugliest Code Competition",
		amount: "$50 Cash Prize",
		description:
			"Embrace the spaghetti! A fun award for the participant with the most convoluted code in our ugliest code competition, reminding us all why clean coding matters, especially in tech. All code is retro code, given enough time.",
		imagePath: ugly_code_prize,
	},
	{
		name: "Code Golf",
		amount: "$50 Cash Prize",
		description:
			"Code Golf! No, not coding the game golf. Come to the workshop and maybe win some money along the way!",
		imagePath: golf_prize,
	},
];

/*export const majorPrizes: Prize[] = [
	{
		name: "Ship Fast, Ship Often - Build a Payworthy MVP in a Weekend",
		amount: "$800 Cash Prize",
		description: `Can you create a product people would pay for in just one weekend? Join this track to build a minimum viable product (MVP) with real market potential. 

Whether it's an app, Chrome extension, or web app, your goal is to solve a real problem quickly and effectively. Focus on creating something simple, valuable, and marketable. Top projects win cash prizes, swag, and bragging rights!`,
		imagePath: thin_air,
	},
	{
		name: " Best Public Health Innovation",
		amount: "$500 Cash Prize",
		description:
			"Presented by Palantir: This prize recognizes outstanding efforts in addressing critical public health challenges, improving patient outcomes, and/or enhancing community well-being. Award recipients will have demonstrated exceptional creativity, technical skill, and a dedication to making a meaningful impact on global health through thoughtful analysis and implementation of data-driven solutions.",
		imagePath: palantir,
	},
	{
		name: "Most Accessible Hack",
		amount: "$500 Cash Prize",
		description:
			"Accessibility matters! This prize goes to the project that best improves urban living for people with disabilities, making city life more inclusive and accessible to all.",
		imagePath: accessibility_prize,
	},
	{
		name: "Best AI Hack",
		amount: "$400 Cash Prize",
		description:
			"Spin up your GPUs and download some data! The project that best utilizes AI to enhance urban living, tackling city issues with advanced algorithms, will take home this prize.",
		imagePath: ai_prize,
	},
	{
		name: "Best Sustainability Hack",
		amount: "$400 Cash Prize",
		description:
			"Go green or go home! This prize recognizes the project that most creatively tackles environmental challenges in the city, making urban living sustainable and eco-friendly.",
		imagePath: sustainability_prize,
	},
	{
		name: "Best Education Hack",
		amount: "$400 Cash Prize",
		description:
			"Time to hit the books—or tablets! Awarded to the project that best improves urban education, making city learning more fun, accessible, and effective.",
		imagePath: education_prize,
	},
];*/

/*export const minorPrizes: Prize[] = [
	{
		name: "Best Quantum Computing Hack",
		amount: "JBL Speaker ($200 Value)",
		description:
			"Entangle some qubits and blow our minds! This prize celebrates the project that uses quantum computing to solve urban problems, proving that the future really is now (and at RPI!).",
		imagePath: quantum_prize,
	},
	{
		name: "Best Cybersecurity Hack",
		amount: "1 Year Subscriptions to NordVPN, NordPass, and Incogni (Total Value: $200)",
		description:
			"Defend the digital city walls! Awarded to the project that best boosts urban cybersecurity, keeping our city's data safe from cybervillains.",
		imagePath: cybersecurity_prize,
	},
	{
		name: "Best Mobile Hack",
		amount: "Hydroflasks + O'Reilly Media App Development Textbooks ($200 Value)",
		description:
			"Got an app for that? Recognizes the project that delivers the slickest, most useful mobile application for city dwellers, making urban life just a tap away.",
		imagePath: mobile_prize,
	},
	{
		name: "Best Startup Hack",
		amount: "LED Projector + O'Reilly Media Machine Learning Textbooks ($200 Value)",
		description:
			"Shark Tank here we come! Celebrates the project with the most potential to become an urban-focused startup, showcasing innovative business ideas to transform city life.",
		imagePath: startup_prize,
	},
	{
		name: "Best Data Science Hack",
		amount: "Amazon Echo Dot Speaker + O'Reilly Media Data Science Textbooks (Value: $100)",
		description:
			"Crunch those numbers! Given to the project that uses data science to unravel the mysteries of city living, driving decisions with insightful analytics.",
		imagePath: data_science_prize,
	},
	{
		name: "Best Beginner Hack",
		amount: "NYC Lego Sets + O'Reilly Media Software Engineering Foundations Textbooks ($100 Value)",
		description:
			"Newbies unite! Awarded to the top project by first-time hackers that addresses urban challenges, showing off their fresh creativity and hard work.",
		imagePath: beginner_prize,
	},
	{
		name: "Ugliest Code Competition",
		amount: "$50 Cash Prize",
		description:
			"Embrace the spaghetti! A fun award for the participant with the most convoluted code in our ugliest code competition, reminding us all why clean coding matters, especially in urban tech.",
		imagePath: ugly_code_prize,
	},
	{
		name: "Best Use of Midnight",
		amount: "JBL 510BT Headphones ($100 Value)",
		description: `Midnight is a data protection blockchain that offers programmable data protection capabilities powered by zero-knowledge technology to address the delicate balance between data protection, ownership, and utilization. This ensures that developers can leverage blockchain technology without exposing confidential information or losing control over their data.

To build on Midnight, all you need is familiarity with TypeScript or a similar JavaScript based library. The service is free to use and their developer documentation has all the information you need to get started. Build a DApp using Midnight this weekend for a chance to win wireless headphones for you and each of your team mates!`,
		imagePath: midnight,
	},
	{
		name: "Best .TECH Domain Name",
		amount: "Blue Snowball Microphone & Free .Tech Domain",
		description:
			"Make your Team's Achievements timeless: Win a .Tech Domain Name for up to 10 years to Showcase and Expand Your Project, Plus 4 Blue Snowball Mics for Effortless Collaboration on Zoom, empowering you to build even more cool things together!",
		imagePath: tech,
	},
	{
		name: "Best AI Application Built with Cloudflare",
		amount: "Arudino Starter Kit ($100 Value)",
		description:
			"Cloudflare is one of the world’s largest networks enabling hackers like you to build, deploy, and deliver trusted applications, no matter where you are! With Cloudflare, you’ll have all the building blocks to create a full-stack application; from C3 (create Cloudflare command line) instance deployment to object storage. You can even run GenAI (LLMs, text to image, Voice to text etc..) in the cloud and leverage your AI functionality via API requests using Cloudlfare’s Workers AI! Enjoy Cloudflare’s generous free tier to get started at no cost! This weekend, we want you to build an AI Application utilizing Cloudflare’s numerous services for a chance to win Arduino Kits for you and your team!",
		imagePath: cloudflare,
	},
	{
		name: "Best Use of Terraform",
		amount: "Keychron K8 Keyboard ($100 Value)",
		description: `HashiCorp Terraform is a source available infrastructure as code (IaC) tool that makes building, deploying, and managing your projects even easier! Whether you’re working in the cloud or using local resources, Terraform can make managing and configuring your application simple and organized. From deploying Machine Learning models to spinning up virtual containers for your web applications, Terraform supports a wide array of cloud providers and services, taking the guesswork out of your next hackathon project. Dive into the documentation and discover all the ways Terraform can take the way you hack to the next level!

Terraform’s community edition is free to use with no credit card required! Utilize Terraform in your hackathon project this weekend for a chance to win some awesome Hashicorp prizes for you and each of your teammates! `,
		imagePath: hashicorp,
	},
	{
		name: "Best AI Project with Databricks Open Source",
		amount: "Assorted Lego Sets ($100 Value)",
		description: `Databricks is an open analytics platform that helps you build, deploy, and maintain large scale data & AI solutions! Whether you’re working with large language models using Mosaic AI, storing data with Databricks Data Lakes, or deploying GenAI powered applications using MLflow, Databricks Open Source software has the tools you need to make your hackathon project state of the art. 


Build an AI powered project utilizing Databricks Open Source projects like the ones mentioned, or Databricks friendly Open Source projects like LanceDB and Llama Index, for a chance to win some amazing prizes for you and your teammates! Check out the following link to see all qualifying Databricks' Open Source technologies. `,
		imagePath: databricks,
	},
];*/
