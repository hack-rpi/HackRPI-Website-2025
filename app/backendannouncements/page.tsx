"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/nav-bar";

export default function backendAnnouncements() {
	const [announcements, setAnnouncements] = useState([]);
	const [title, setTitle] = useState("");
	const [time, setTime] = useState("");
	const [message, setMessage] = useState("");
	const [links, setLinks] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		async function fetchAnnouncements() {
			const announcementCopy = announcements;
			try {
				const res = await fetch("/api/announcements");
				const data = await res.json();
				setAnnouncements(data);
			} catch (err) {
				setAnnouncements(announcementCopy);
				console.error("Failed to fetch announcements:", err);
			}
		}

		fetchAnnouncements();
	}, []);

	async function addAnnouncement() {
		if(title == "" || message == "" || links == "" || name == "") {
			alert("One or more inputs are blank.");
		} else {

			const reqBody = {
				title,
				message,
				links,
				name,
			};

			try {
				const res = await fetch("/api/announcements", {
					
					method: "POST", headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(reqBody)
				});
				
				if(!res.ok) {
					alert("Failed to post announcement");
				}
				
			} catch(err) {
				alert("Could not connect to API");
			}
	
		}

		const reqBody = {
			title,
			message,
			links,
			name,
		};

		try {
			const res = await fetch("/api/announcements", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqBody),
			});

			if (!res.ok) {
				const { error } = await res.json();
				alert("Failed to post announcement: " + error);
				return;
			}

			const data = await res.json();
			console.log("✅ Announcement added:", data);
			alert("✅ Announcement added successfully!");

			// Optional: reset input fields or refresh announcements list
		} catch (err) {
			console.error("❌ Error adding announcement:", err);
			alert("❌ Something went wrong. See console for details.");
		}
	}

	return (
		<>
			<NavBar showOnScroll={false} />

			<div className="justify-center flex w-full flex-col bg-hackrpi-dark-blue pt-24 desktop:pt-16 min-h-screen">
				<div className="container mx-auto p-8">
					<style> 
				
					</style>
					<h1 className="text-4xl font-bold text-hackrpi-orange mb-4">Backend Announcements</h1>
					<p className="text-hackrpi-yellow text-lg">Stay updated with the latest HackRPI announcements here.</p>
					<button className="font-bold text-subway-red mb-1" onClick={() => addAnnouncement()} >Add Announcement</button>

					<div className="flex flex-col">
						<h1 className="font-bold text-hackrpi-orange mb-1">Title Input</h1>
						<input style={{width: 300}} id="titleInput" value={title} onChange={(e) => setTitle(e.target.value)}></input>
						<h1 className="font-bold text-hackrpi-orange mb-1">Time Input</h1>
						<input style={{width: 300}} id="timeInput" value={time} onChange={(e) => setTime(e.target.value)}></input>
						<h1 className="font-bold text-hackrpi-orange mb-1">Message Input</h1>
						<textarea style={{width: 300}} id="messageInput" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
						<h1 className="font-bold text-hackrpi-orange mb-1">Links Input</h1>
						<input style={{width: 300}} id="linksInput" value={links} onChange={(e) => setLinks(e.target.value)}></input>
						<h1 className="font-bold text-hackrpi-orange mb-1">Name Input</h1>
						<input  style={{width: 300}} id="nameInput" value={name} onChange={(e) => setName(e.target.value)}></input>
					</div>
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
