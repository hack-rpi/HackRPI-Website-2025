"use client";

import React from "react";
import "@/app/globals.css";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/nav-bar";

export default function Announcements() {
	return (
		<>
			<NavBar showOnScroll={false} />

			<div className="justify-center flex w-full flex-col bg-hackrpi-dark-blue pt-24 desktop:pt-16 min-h-screen">
				<div className="container mx-auto p-8">
					<h1 className="text-4xl font-bold text-hackrpi-orange mb-4">Announcements</h1>
					<p className="text-hackrpi-yellow text-lg">Stay updated with the latest HackRPI announcements here.</p>

					{/* Example Announcement */}
					<div className="mt-6 p-4 border border-hackrpi-orange bg-opacity-20 bg-hackrpi-yellow rounded-lg">
						<h2 className="text-2xl font-semibold text-hackrpi-orange">🚀 HackRPI 2024 Schedule is Live!</h2>
						<p className="text-hackrpi-yellow">Check out the event schedule for updated informtion!</p>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
