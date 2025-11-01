"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";
//import NavBar from "@/components/nav-bar/nav-bar";

export default function Announcements() {
	const [announcements, setAnnouncements] = useState([]);
	const [showRecent, setShowRecent] = useState(true);

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
			<div className="justify-center flex w-full flex-col bg-hackrpi-dark-blue pt-24 desktop:pt-16 min-h-screen">
				<div className="container mx-auto p-8">
					<h1 className="text-4xl font-bold text-hackrpi-orange mb-4">Announcements</h1>
					<p className="text-hackrpi-yellow text-lg">Stay updated with the latest HackRPI announcements here.</p>

					<div className="mt-6 mb-4 flex gap-4">
						<button
							onClick={() => setShowRecent(true)}
							className={`px-4 py-2 rounded ${showRecent ? "bg-hackrpi-orange text-white" : "bg-hackrpi-yellow text-hackrpi-orange"}`}
						>
							Recent Announcements
						</button>
						<button
							onClick={() => setShowRecent(false)}
							className={`px-4 py-2 rounded ${!showRecent ? "bg-hackrpi-orange text-white" : "bg-hackrpi-yellow text-hackrpi-orange"}`}
						>
							All Announcements
						</button>
					</div>

					{/* Render Announcements */}
					{announcements
						.filter((a: any) => {
							if (!showRecent) return true;
							const threeDaysAgo = new Date();
							threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
							return new Date(a.time) >= threeDaysAgo;
						})
						.map((a: any, index: number) => {
							const isEven = index % 2 === 0;
							const bgClass = isEven
								? "bg-hackrpi-yellow bg-opacity-20 border-hackrpi-orange"
								: "bg-hackrpi-blue bg-opacity-30 border-hackrpi-yellow";
							return (
								<div key={a._id} className={`mt-6 p-4 border rounded-lg ${bgClass}`}>
									<h2 className="text-2xl font-semibold text-hackrpi-orange">{a.title}</h2>
									<p className="text-hackrpi-yellow">{a.message}</p>
									<p className="text-sm text-hackrpi-yellow mt-2">
										Posted:{" "}
										{new Date(a.time).toLocaleString(undefined, {
											year: "numeric",
											month: "numeric",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
										})}
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
							);
						})}
				</div>
			</div>
		</>
	);
}
