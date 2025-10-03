"use client";

import "@/app/globals.css";
import NavBar from "@/components/nav-bar/nav-bar";
import HackRPILink from "@/components/themed-components/hackrpi-link";

export default function page() {
	return (
		<div className="flex flex-col w-full h-fit min-h-screen items-center justify-center">
			<div className="flex flex-wrap justify-center gap-12 m-10 pt-10 pb-10 w-11/12">
				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="web-dev" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Web Development
					</h2>
					<iframe
						src="https://docs.google.com/presentation/d/e/2PACX-1vQ1Y1jocoVjEzR9OR0fVVsbQrc05vaqpPXpIPhxRvHu6G0u0fSw7bWmijLKVmx8VyCrkbY2rZE_VEjr/embed?start=false&loop=false&delayms=3000"
						className="w-full max-w-[480px] aspect-video"
						allowFullScreen={true}
					></iframe>
				</div>

				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="git" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Intro to Git and GitHub
					</h2>
					<iframe
						src="https://docs.google.com/presentation/d/e/2PACX-1vR-7FExFdu8CgUiMN8Aqlf7WHFqCVrL1iktSbTUVqPmXKy4YhWXWpywIIPE7O0uKq1H5sPBPyqY6FJw/embed?start=false&loop=false&delayms=3000"
						className="w-full max-w-[480px] aspect-video"
						allowFullScreen={true}
					></iframe>
				</div>

				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="leaflet" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Mapping Data using Leaflet.js
					</h2>
					<iframe
						src="https://docs.google.com/presentation/d/e/2PACX-1vTslT8Hb4Mm6PPPeArt6oaWmz0gdR7RrCFjXJOsjVN-qjCEIjTmOUmXp8yvbQ74MjZaAgoVDGjIhPfx/embed?start=false&loop=false&delayms=3000"
						className="w-full max-w-[480px] aspect-video"
						allowFullScreen={true}
					></iframe>
				</div>

				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="desktop-dev" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Desktop Development
					</h2>
					<iframe
						src="https://docs.google.com/presentation/d/e/2PACX-1vTGrDdQJSc49gFt5aOvsn-lcGSVK2qdJhRiO4odTqeMNiNqLhqy1YxG3OMmvd-sZVrWOAJKrbqMhOrP/embed?start=false&loop=false&delayms=3000"
						className="w-full max-w-[480px] aspect-video"
						allowFullScreen={true}
					></iframe>
				</div>

				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="submissions" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Submitting Your Project
					</h2>
					<iframe
						src="https://docs.google.com/presentation/d/e/2PACX-1vShAEu5LxeaY_QFG5W509bUy0wCJl2nFq5D8YNqzm0EHBHtcF0Oq_RBndqe4CeaSCl3nSFQ4JVQeImR/embed?start=false&loop=false&delayms=3000"
						className="w-full max-w-[480px] aspect-video"
						allowFullScreen={true}
					></iframe>
				</div>

				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="claude" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Anthropic Claude&apos;s Computer Use API
					</h2>
					<p className="text-hackrpi-yellow">
						The upgraded Claude 3.5 Sonnet model is capable of interacting with tools that can manipulate a computer
						desktop environment. See the documentation at the link below for more information on how to use the API.
					</p>
					<HackRPILink
						href="https://docs.anthropic.com/en/docs/build-with-claude/computer-use"
						className="px-4 py-4 mt-4"
					>
						Anthropic Claude&apos;s Computer Use API
					</HackRPILink>
				</div>

				<div className="flex flex-col justify-center items-center w-80 xs:w-[400px] md:w-[600px]">
					<h2 id="wolfram" className="text-3xl font-modern text-center mb-8 pt-10 text-hackrpi-orange">
						Wolfram|One API
					</h2>
					<p className="text-hackrpi-yellow">
						Wolfram|One is a powerful computational software that can be used for a variety of applications. Check out
						the documentation at the link below to learn more about the API and how to use it in your projects.
					</p>
					<HackRPILink href="https://account.wolfram.com/redeem/zHackRPI1124" className="px-4 py-4 my-4 ">
						Wolfram|One API
					</HackRPILink>
					<p className="text-hackrpi-yellow">
						This URL will take you to a sign-in page and prompt you to log in using your Wolfram ID. If you don&apos;t
						already have a Wolfram ID, you&apos;ll be prompted to create one using an active email address. Once logged
						in, you will see in the Downloads section which platforms of the software you have access to, with their
						accompanying activation keys. Please download the desktop version to your machine, boot up the application
						and use the associated activation key when prompted. This will grant you full access for 30 days from your
						activation date.
					</p>
				</div>
			</div>
		</div>
	);
}
