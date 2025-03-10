"use client";

import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/nav-bar";
import { useEffect, useState } from "react";
import { Event } from "@/data/schedule";
import { SATURDAY_START, SATURDAY_END, SUNDAY_START, SUNDAY_END, saturdayTimes, sundayTimes } from "@/data/schedule";
import { arrangeEvents } from "@/utils/schedule";

import { Amplify } from "aws-amplify";
import * as Auth from "@aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "@/amplify/data/resource";
import amplify_outputs from "@/amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";
import "@/app/globals.css";

Amplify.configure(amplify_outputs);
const client = generateClient<Schema>({ authMode: "userPool" });

const MS_IN_HOUR = 3600000;

const MAX_COLUMNS = 5; // Maximum number of columns for the schedule view

export default function Page() {
	const [events, setEvents] = useState<Event[]>([]);
	const [displayMode, setDisplayMode] = useState<"list" | "schedule">("list");
	const [day, setDay] = useState<"saturday" | "sunday">("saturday");
	const [editing, setEditing] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		listAllEvents().then((events) => {
			setEvents(events);
			setLoading(false);
		});
	}, []);

	// Group events by day
	const saturdayEvents = events.filter(event => 
		event.startTime >= SATURDAY_START && event.startTime < SATURDAY_END
	);
	
	const sundayEvents = events.filter(event => 
		event.startTime >= SUNDAY_START && event.startTime < SUNDAY_END
	);

	// Group events by column for the schedule view
	const eventsByColumn = arrangeEventsByColumn(day === "saturday" ? saturdayEvents : sundayEvents);

	return (
		<div className="flex flex-col w-screen h-fit min-h-screen">
			<NavBar showOnScroll={false} />
			<div className="pt-24 font-sans flex-grow flex-shrink basis-auto flex items-start justify-center">
				<Authenticator hideSignUp={true}>
					<div className="w-11/12 desktop:w-5/6 flex flex-col items-center justify-start">
						{/* Controls */}
						<div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
							<div className="flex gap-2">
								<button
									className="btn btn-primary btn-sm"
									onClick={() => {
										AddEvent().then((event) => {
											if (event) {
												setEvents([event, ...events]);
											}
										});
									}}
								>
									Add New Event
								</button>
								<button
									className="btn btn-primary btn-sm"
									onClick={() => listAllEvents().then((events) => setEvents(events))}
								>
									Reload Events
								</button>
								<button className="btn btn-warning btn-sm" onClick={() => Auth.signOut()}>
									Sign Out
								</button>
							</div>
							
							<div className="flex gap-2">
								<div className="btn-group">
									<button 
										className={`btn btn-sm ${displayMode === "list" ? "btn-active" : ""}`}
										onClick={() => setDisplayMode("list")}
									>
										List View
									</button>
									<button 
										className={`btn btn-sm ${displayMode === "schedule" ? "btn-active" : ""}`}
										onClick={() => setDisplayMode("schedule")}
									>
										Schedule View
									</button>
								</div>
								
								{displayMode === "schedule" && (
									<div className="btn-group">
										<button 
											className={`btn btn-sm ${day === "saturday" ? "btn-active" : ""}`}
											onClick={() => setDay("saturday")}
										>
											Saturday
										</button>
										<button 
											className={`btn btn-sm ${day === "sunday" ? "btn-active" : ""}`}
											onClick={() => setDay("sunday")}
										>
											Sunday
										</button>
									</div>
								)}
							</div>
						</div>

						{loading ? (
							<div className="flex items-center justify-center w-full h-32">
								<div className="loading loading-spinner loading-lg text-hackrpi-pink"></div>
							</div>
						) : displayMode === "list" ? (
							// List View
							<div className="w-full">
								{events.map((event) => (
									<EventCard
										key={event.id}
										event={event}
										onUpdate={(updatedEvent) => {
											updateEvent(updatedEvent).then((resp) => {
												if (resp) {
													setEvents(
														events.map((e) => (e.id === resp.id ? resp : e))
													);
												}
											});
										}}
										onDelete={(eventToDelete) => {
											deleteEvent(eventToDelete).then((resp) => {
												if (resp) {
													setEvents(events.filter((e) => e.id !== resp.id));
												}
											});
										}}
										isEditing={editing === event.id}
										setEditing={setEditing}
									/>
								))}
							</div>
						) : (
							// Schedule View
							<div className="w-full">
								<h2 className="text-2xl font-bold mb-4">
									{day === "saturday" ? "Saturday Schedule" : "Sunday Schedule"}
								</h2>
								
								<div className="flex w-full h-fit relative">
									{/* Time Column */}
									<div className="w-24 flex-shrink-0">
										{(day === "saturday" ? saturdayTimes : sundayTimes).map((time) => (
											<div key={time.unix} className="h-24 flex items-center">
												<span className="text-sm">{time.str}</span>
											</div>
										))}
									</div>
									
									{/* Event Columns */}
									<div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
										{Array.from({ length: MAX_COLUMNS }).map((_, colIndex) => (
											<div key={colIndex} className="relative h-full border-l border-gray-300">
												{/* Column Header */}
												<div className="h-12 flex items-center justify-center border-b border-gray-300">
													<span className="text-sm font-bold">Column {colIndex + 1}</span>
												</div>
												
												{/* Events in this column */}
												<div className="relative h-[calc(100%-3rem)]">
													{eventsByColumn[colIndex]?.map((event) => (
														<ScheduleEventCard
															key={event.id}
															event={event}
															times={day === "saturday" ? saturdayTimes : sundayTimes}
															onClick={() => setEditing(event.id)}
														/>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
						
						{/* Event Editing Modal */}
						{editing && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
								<div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
									<h2 className="text-2xl font-bold mb-4">Edit Event</h2>
									
									{events.filter(e => e.id === editing).map(event => (
										<EventEditForm
											key={event.id}
											event={event}
											onSave={(updatedEvent) => {
												updateEvent(updatedEvent).then((resp) => {
													if (resp) {
														setEvents(
															events.map((e) => (e.id === resp.id ? resp : e))
														);
														setEditing(null);
													}
												});
											}}
											onCancel={() => setEditing(null)}
											onDelete={() => {
												deleteEvent(event).then((resp) => {
													if (resp) {
														setEvents(events.filter((e) => e.id !== resp.id));
														setEditing(null);
													}
												});
											}}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</Authenticator>
			</div>
			<Footer />
		</div>
	);
}

// Component for event cards in list view
function EventCard({
	event,
	onUpdate,
	onDelete,
	isEditing,
	setEditing
}: {
	event: Event;
	onUpdate: (event: Event) => void;
	onDelete: (event: Event) => void;
	isEditing: boolean;
	setEditing: (id: string | null) => void;
}) {
	// Color mapping based on event type
	const getEventColor = (type: string) => {
		switch (type) {
			case "workshop": return "bg-hackrpi-primary-light-green border-hackrpi-primary-dark-green";
			case "deadline": return "bg-red-400 border-red-600";
			case "food": return "bg-hackrpi-secondary-light-green border-hackrpi-secondary-dark-green";
			case "activity": return "bg-hackrpi-primary-dark-green border-hackrpi-secondary-dark-green";
			default: return "bg-hackrpi-primary-blue border-hackrpi-secondary-light-blue";
		}
	};

	return (
		<div className={`w-full mb-4 rounded-lg shadow-md overflow-hidden ${getEventColor(event.eventType)}`}>
			<div className="p-4">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="text-xl font-bold">{event.title}</h3>
						<p className="text-sm">
							{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
						</p>
						<p>Location: {event.location}</p>
						{event.speaker && <p>Speaker: {event.speaker}</p>}
						<p>Type: {event.eventType}</p>
						<p>Column: {event.column || "Auto"}</p>
						<p className="mt-2">{event.visible ? "Visible on Site ✅" : "Not Visible on Site ❌"}</p>
					</div>
					<div className="flex gap-2">
						<button
							className="btn btn-sm bg-hackrpi-pink text-white hover:bg-hackrpi-secondary-light-blue"
							onClick={() => setEditing(event.id)}
						>
							Edit
						</button>
					</div>
				</div>
				{event.description && (
					<div className="mt-2">
						<p className="text-sm">{event.description}</p>
					</div>
				)}
			</div>
		</div>
	);
}

// Component for event cards in schedule view
function ScheduleEventCard({
	event,
	times,
	onClick
}: {
	event: Event;
	times: { str: string; unix: number }[];
	onClick: () => void;
}) {
	// Calculate position and height based on times
	const calculatePosition = () => {
		const HOUR_HEIGHT = 96; // 96px for each hour
		
		// Find the nearest time label before the event start
		let nearestTimeIndex = 0;
		for (let i = 0; i < times.length; i++) {
			if (times[i].unix <= event.startTime) {
				nearestTimeIndex = i;
			} else {
				break;
			}
		}
		
		const nearestTime = times[nearestTimeIndex];
		const topOffset = (event.startTime - nearestTime.unix) / MS_IN_HOUR * HOUR_HEIGHT;
		const height = (event.endTime - event.startTime) / MS_IN_HOUR * HOUR_HEIGHT;
		
		return {
			top: nearestTimeIndex * HOUR_HEIGHT + topOffset,
			height: Math.max(height, 32) // Minimum height of 32px
		};
	};
	
	const { top, height } = calculatePosition();
	
	// Determine background color based on event type
	const getEventColor = (type: string) => {
		switch (type) {
			case "workshop": return "bg-hackrpi-primary-light-green";
			case "deadline": return "bg-red-400";
			case "food": return "bg-hackrpi-secondary-light-green";
			case "activity": return "bg-hackrpi-primary-dark-green text-white";
			default: return "bg-hackrpi-primary-blue";
		}
	};
	
	return (
		<div
			className={`absolute w-full p-1 rounded shadow cursor-pointer ${getEventColor(event.eventType)}`}
			style={{ top: `${top}px`, height: `${height}px`, maxHeight: `${height}px` }}
			onClick={onClick}
		>
			<div className="h-full overflow-y-auto">
				<h4 className="text-xs font-bold truncate">{event.title}</h4>
				<p className="text-xs truncate">{event.location}</p>
				{height > 50 && <p className="text-xs line-clamp-2">{event.description}</p>}
			</div>
		</div>
	);
}

// Component for editing an event
function EventEditForm({
	event,
	onSave,
	onCancel,
	onDelete
}: {
	event: Event;
	onSave: (event: Event) => void;
	onCancel: () => void;
	onDelete: () => void;
}) {
	const [formData, setFormData] = useState<Event>(event);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		
		if (type === "checkbox") {
			setFormData({
				...formData,
				[name]: (e.target as HTMLInputElement).checked
			});
		} else if (name === "startTime" || name === "endTime") {
			// Handle datetime inputs
			setFormData({
				...formData,
				[name]: new Date(value).valueOf()
			});
		} else if (name === "column") {
			// Handle column as a number
			setFormData({
				...formData,
				[name]: value === "auto" ? 0 : parseInt(value)
			});
		} else {
			setFormData({
				...formData,
				[name]: value
			});
		}
	};
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};
	
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="form-control">
				<label className="label">
					<span className="label-text">Title</span>
				</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					className="input input-bordered"
					required
				/>
			</div>
			
			<div className="form-control">
				<label className="label">
					<span className="label-text">Description</span>
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="textarea textarea-bordered h-24"
				/>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Start Time</span>
					</label>
					<input
						type="datetime-local"
						name="startTime"
						value={convertUnixToTimeInput(formData.startTime)}
						onChange={handleChange}
						className="input input-bordered"
						required
					/>
				</div>
				
				<div className="form-control">
					<label className="label">
						<span className="label-text">End Time</span>
					</label>
					<input
						type="datetime-local"
						name="endTime"
						value={convertUnixToTimeInput(formData.endTime)}
						onChange={handleChange}
						className="input input-bordered"
						required
					/>
				</div>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Location</span>
					</label>
					<input
						type="text"
						name="location"
						value={formData.location}
						onChange={handleChange}
						className="input input-bordered"
						required
					/>
				</div>
				
				<div className="form-control">
					<label className="label">
						<span className="label-text">Speaker (Optional)</span>
					</label>
					<input
						type="text"
						name="speaker"
						value={formData.speaker}
						onChange={handleChange}
						className="input input-bordered"
					/>
				</div>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Event Type</span>
					</label>
					<select
						name="eventType"
						value={formData.eventType}
						onChange={handleChange}
						className="select select-bordered"
					>
						<option value="default">Default</option>
						<option value="workshop">Workshop</option>
						<option value="deadline">Deadline</option>
						<option value="food">Food</option>
						<option value="activity">Activity</option>
					</select>
				</div>
				
				<div className="form-control">
					<label className="label">
						<span className="label-text">Column</span>
					</label>
					<select
						name="column"
						value={formData.column === 0 ? "auto" : formData.column.toString()}
						onChange={handleChange}
						className="select select-bordered"
					>
						<option value="auto">Auto (Algorithm Decides)</option>
						<option value="1">Column 1</option>
						<option value="2">Column 2</option>
						<option value="3">Column 3</option>
						<option value="4">Column 4</option>
						<option value="5">Column 5</option>
					</select>
				</div>
				
				<div className="form-control">
					<label className="label cursor-pointer justify-start gap-2">
						<span className="label-text">Visible on Schedule</span>
						<input
							type="checkbox"
							name="visible"
							checked={formData.visible}
							onChange={handleChange}
							className="checkbox checkbox-primary"
						/>
					</label>
					<p className="text-xs text-gray-500">Event won't appear on the public schedule if unchecked</p>
				</div>
			</div>
			
			<div className="flex justify-between">
				<div>
					<button type="submit" className="btn btn-primary">
						Save Changes
					</button>
					<button type="button" className="btn btn-ghost ml-2" onClick={onCancel}>
						Cancel
					</button>
				</div>
				
				<button
					type="button"
					className="btn btn-error"
					onClick={() => {
						if (confirm("Are you sure you want to delete this event?")) {
							onDelete();
						}
					}}
				>
					Delete Event
				</button>
			</div>
		</form>
	);
}

// Helper function to group events by column
function arrangeEventsByColumn(events: Event[]): Event[][] {
	const result: Event[][] = [];
	
	// First sort events with explicit column assignments
	events.forEach(event => {
		const column = event.column || 0;
		
		// For events with column 0 (auto), skip for now
		if (column === 0) return;
		
		// Create column array if it doesn't exist yet
		if (!result[column - 1]) {
			result[column - 1] = [];
		}
		
		result[column - 1].push(event);
	});
	
	// Now handle events without column assignments
	const eventsWithoutColumn = events.filter(event => event.column === 0 || event.column === undefined);
	
	if (eventsWithoutColumn.length > 0) {
		// Use our modified arrangeEvents function from utils/schedule.ts
		const arrangedColumns = arrangeEvents(eventsWithoutColumn);
		
		// Merge with existing columns
		arrangedColumns.forEach((events, index) => {
			if (!result[index]) {
				result[index] = [];
			}
			result[index].push(...events);
		});
	}
	
	// Sort events within each column by start time
	result.forEach(column => {
		if (column) {
			column.sort((a, b) => a.startTime - b.startTime);
		}
	});
	
	return result;
}

// This function remains unchanged
function convertUnixToTimeInput(unix: number): string {
	const currentDate = new Date(unix);
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const day = String(currentDate.getDate()).padStart(2, "0");
	const hours = String(currentDate.getHours()).padStart(2, "0");
	const minutes = String(currentDate.getMinutes()).padStart(2, "0");

	const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
	return formattedDateTime;
}

// Update these functions to include the column property
async function AddEvent(): Promise<Event | undefined> {
	const { errors, data } = await client.models.event.create({
		title: "New Event",
		description: "New Event Description",
		startTime: Date.now(),
		endTime: Date.now() + MS_IN_HOUR,
		location: "New Location",
		speaker: "New Speaker",
		eventType: "default",
		visible: false,
		column: 0, // Default to auto-placement
	});

	if (errors || !data) {
		console.error(errors);
		window.alert("Failed to add event. See console for more information.");
		return undefined;
	}

	return {
		id: data.id,
		title: data.title,
		description: data.description || "",
		startTime: data.startTime,
		endTime: data.endTime,
		location: data.location,
		speaker: data.speaker || "",
		eventType: data.eventType || "default",
		visible: data.visible,
		column: data.column || 0,
	};
}

async function updateEvent(event: Event): Promise<Event | undefined> {
	const { errors, data } = await client.models.event.update({
		id: event.id,
		title: event.title,
		description: event.description,
		startTime: event.startTime,
		endTime: event.endTime,
		location: event.location,
		speaker: event.speaker,
		eventType: event.eventType,
		visible: event.visible,
		column: event.column || 0, // Include column
	});

	if (errors || !data) {
		console.error(errors);
		window.alert("Failed to update event. See console for more information.");
		return undefined;
	}

	return {
		id: data.id,
		title: data.title,
		description: data.description || "",
		startTime: data.startTime,
		endTime: data.endTime,
		location: data.location,
		speaker: data.speaker || "",
		eventType: data.eventType || "default",
		visible: data.visible,
		column: data.column || 0, // Include column in return
	};
}

async function deleteEvent(event: Event): Promise<Event | undefined> {
	const { errors, data } = await client.models.event.delete({ id: event.id });

	if (errors || !data) {
		console.error(errors);
		window.alert("Failed to delete event. See console for more information.");
		return undefined;
	}

	return {
		id: data.id,
		title: data.title,
		description: data.description || "",
		startTime: data.startTime,
		endTime: data.endTime,
		location: data.location,
		speaker: data.speaker || "",
		eventType: data.eventType || "default",
		visible: data.visible,
		column: data.column || 0, // Include column in return
	};
}

async function listAllEvents(): Promise<Event[]> {
	let events: Event[] = [];
	let nextToken: string | undefined | null = undefined;

	do {
		let listOptions: { limit: number; nextToken?: string } = { limit: 100 };
		if (nextToken) {
			listOptions = { ...listOptions, nextToken: nextToken };
		}
		const response = await client.models.event.list(listOptions);

		if (response.errors || !response.data) {
			console.error(response.errors);
			window.alert("Failed to list events. See console for more information.");
			return [];
		}

		events = [
			...events,
			...response.data.map((item) => ({
				id: item.id,
				title: item.title,
				description: item.description || "",
				startTime: item.startTime,
				endTime: item.endTime,
				location: item.location,
				speaker: item.speaker || "",
				eventType: item.eventType || "default",
				visible: item.visible,
				column: item.column || 0, // Include column
			})),
		];

		nextToken = response.nextToken;
	} while (nextToken);

	// Sort events by start time
	events.sort((a, b) => a.startTime - b.startTime);

	return events;
}
