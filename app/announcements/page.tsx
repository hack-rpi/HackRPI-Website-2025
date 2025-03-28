"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/nav-bar";

export default function Announcements() {
	const [announcements, setAnnouncements] = useState([]);

	useEffect(() => {
		async function fetchAnnouncements() {
			try {
				const res = await fetch("/api/announcements");
				const data = await res.json();
				setAnnouncements(data);
			} catch (err) {
				console.error("Failed to fetch announcements:", err);
			}
		}

		fetchAnnouncements();
	}, []);

	return (
		<>
			<NavBar showOnScroll={false} />

			<div className="justify-center flex w-full flex-col bg-hackrpi-dark-blue pt-24 desktop:pt-16 min-h-screen">
				<div className="container mx-auto p-8">
					<h1 className="text-4xl font-bold text-hackrpi-orange mb-4">Announcements</h1>
					<p className="text-hackrpi-yellow text-lg">Stay updated with the latest HackRPI announcements here.</p>

					{/* Render Announcements */}
					{announcements.map((a: any) => (
						<div
							key={a._id}
							className="mt-6 p-4 border border-hackrpi-orange bg-opacity-20 bg-hackrpi-yellow rounded-lg"
						>
							<h2 className="text-2xl font-semibold text-hackrpi-orange">{a.title}</h2>
							<p className="text-hackrpi-yellow">{a.message}</p>
							<p className="text-sm text-hackrpi-yellow mt-2">
								Posted by: {a.name} | {new Date(a.time).toLocaleString()}
							</p>
							{a.links && (
								<p className="text-sm mt-1">
									<a
										href={`https://${a.links}`}
										className="text-hackrpi-orange underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{a.links}
									</a>
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
