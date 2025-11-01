"use client";

//import NavBar from "@/components/nav-bar/nav-bar";
import { useEffect, useState } from "react";
import { Event } from "@/data/schedule";

import { Amplify } from "aws-amplify";
import * as Auth from "@aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "@/amplify/data/resource";
// eslint-disable-next-line
// @ts-ignore
import amplify_outputs from "@/amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";
import "@/app/globals.css";

Amplify.configure(amplify_outputs);
const client = generateClient<Schema>({ authMode: "userPool" });

const MS_IN_HOUR = 3600000;

export default function Page() {
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		listAllEvents().then((events) => setEvents(events));
	}, []);

	return (
		<div className="flex flex-col w-screen h-fit min-h-screen">
			<div className="pt-24 font-sans flex-grow flex-shrink basis-auto flex items-start justify-center">
				<Authenticator hideSignUp={true}>
					<div className="w-11/12 desktop:w-1/2 flex flex-col items-center justify-start">
						<div className="w-full flex justify-between items-center mb-4">
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
						{events.map((event) => (
							<EventCard
								key={event.id}
								event={event}
								onUpdate={(updatedEvent) => {
									updateEvent(updatedEvent).then((resp) => {
										if (resp) {
											// Update the event in the list of events
											setEvents(
												events.map((e) => (e.id === resp.id ? resp : e)).sort((a, b) => a.startTime - b.startTime),
											);
										}
									});
								}}
								onDelete={(eventToDelete) => {
									deleteEvent(eventToDelete).then((resp) => {
										if (resp) {
											// Remove the event from the list of events
											setEvents(events.filter((e) => e.id !== resp.id));
										}
									});
								}}
							/>
						))}
					</div>
				</Authenticator>
			</div>
		</div>
	);
}

function EventCard(props: { event: Event; onUpdate: (event: Event) => void; onDelete: (event: Event) => void }) {
	const [editing, setEditing] = useState(false);
	const [event, setEvent] = useState(props.event);

	return (
		<div className="w-full h-fit flex flex-col items-center justify-start border border-gray-400 rounded-md mb-2">
			{editing ? (
				<form
					className="w-11/12 flex flex-col items-center justify-start form"
					onSubmit={(e) => {
						e.preventDefault();
						setEditing(false);
						props.onUpdate(event);
					}}
				>
					<label className="text-lg font-bold">Edit Event</label>
					<label className="text-sm input bg-base-200 input-primary flex items-center text-nowrap w-full my-2 gap-2">
						Event Name:
						<input
							className="grow"
							type="text"
							placeholder="Title"
							id={`title-${event.id}`}
							value={event.title}
							onChange={(e) => setEvent({ ...event, title: e.target.value })}
						/>
					</label>
					<label className="text-sm input bg-base-200 h-fit input-primary flex flex-col items-start py-2 text-nowrap w-full my-2 gap-2">
						Event Description:
						<textarea
							className="grow bg-base-200 border border-gray-400 rounded-md p-1 w-full"
							placeholder="Description"
							value={event.description}
							onChange={(e) => setEvent({ ...event, description: e.target.value })}
						/>
					</label>
					<label className="text-sm input bg-base-200 input-primary flex items-center text-nowrap w-full my-2 gap-2">
						Start Time:
						<input
							className="grow"
							type="datetime-local"
							placeholder="Start Time"
							value={convertUnixToTimeInput(event.startTime)}
							onChange={(e) =>
								setEvent({
									...event,
									startTime: new Date(e.target.value).valueOf(),
									endTime: new Date(e.target.value).valueOf() + MS_IN_HOUR,
								})
							}
						/>
					</label>
					<label className="text-sm input bg-base-200 input-primary flex items-center text-nowrap w-full my-2 gap-2">
						End Time:
						<input
							className="grow"
							type="datetime-local"
							placeholder="End Time"
							value={convertUnixToTimeInput(event.endTime)}
							onChange={(e) => setEvent({ ...event, endTime: new Date(e.target.value).valueOf() })}
						/>
					</label>
					<label className="text-sm input bg-base-200 input-primary flex items-center text-nowrap w-full my-2 gap-2">
						Location:
						<input
							className="grow"
							type="text"
							placeholder="Location (Optional)"
							value={event.location}
							onChange={(e) => setEvent({ ...event, location: e.target.value })}
						/>
						<span className="badge badge-primary">Optional</span>
					</label>
					<label className="text-sm input bg-base-200 input-primary flex items-center text-nowrap w-full my-2 gap-2">
						Speaker:
						<input
							className="grow"
							type="text"
							placeholder="Speaker (Optional)"
							value={event.speaker}
							onChange={(e) => setEvent({ ...event, speaker: e.target.value })}
						/>
						<span className="badge badge-primary">Optional</span>
					</label>
					<div className="flex w-full items-center justify-start mb-2">
						<label>Visibility: (Not on the schedule if not checked) </label>
						<input
							className="checkbox checkbox-primary ml-4"
							type="checkbox"
							checked={event.visible}
							onChange={(e) => setEvent({ ...event, visible: e.target.checked })}
						/>
					</div>
					<select
						className="select select-bordered w-full my-2 select-primary"
						value={event.eventType}
						onChange={(e) => {
							setEvent({ ...event, eventType: e.target.value });
						}}
					>
						<option value="default">Default</option>
						<option value="workshop">Workshop</option>
						<option value="deadline">Deadline</option>
						<option value="food">Food</option>
						<option value="activity">Activity</option>
					</select>
					<div className="flex w-full items-center justify-between my-2">
						<button type="submit" className="btn btn-primary btn-sm">
							Save
						</button>
						<button
							type="button"
							className="btn btn-warning btn-sm"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to cancel without saving? This will discard all changes made to this event, but will not delete it.",
									)
								) {
									setEvent(props.event);
									setEditing(false);
								}
							}}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-error btn-sm"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to delete this event? (If you just want to hide it, uncheck the visibility box and save.)",
									)
								) {
									props.onDelete(event);
								}
							}}
						>
							Delete Event
						</button>
					</div>
				</form>
			) : (
				<div className="w-11/12 flex flex-col items-start justify-start py-2">
					<h1 className="text-2xl">{event.title}</h1>
					<p className="text-xl description-box">{event.description}</p>
					<p className="text-xl">Starts: {new Date(event.startTime).toLocaleString()}</p>
					<p className="text-xl">Ends: {new Date(event.endTime).toLocaleString()}</p>
					<p className="text-xl">Location: {event.location}</p>
					<p className="text-xl">Speaker: {event.speaker}</p>
					<p className="text-xl">Event Type: {event.eventType}</p>
					<p className="text-xl">{event.visible ? "Visible on Site ✅" : "Not Visible on Site ❌"}</p>
					<button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>
						Edit
					</button>
				</div>
			)}
		</div>
	);
}

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
	};
}

function convertUnixToTimeInput(unix: number): string {
	const currentDate = new Date(unix);
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const day = String(currentDate.getDate()).padStart(2, "0");
	const hours = String(currentDate.getHours()).padStart(2, "0");
	const minutes = String(currentDate.getMinutes()).padStart(2, "0");

	const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
	return formattedDateTime;
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
			})),
		];

		nextToken = response.nextToken;
	} while (nextToken);

	// Sort events by start time earliest to latest
	events.sort((a, b) => a.startTime - b.startTime);

	return events;
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
	};
}
