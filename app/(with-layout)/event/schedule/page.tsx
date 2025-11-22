"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import type { Event } from "@/data/schedule";
import {
	saturdayTimes,
	sundayTimes,
} from "@/data/schedule";

import Schedule from "@/components/schedule/schedule";
import HackRPILink from "@/components/themed-components/hackrpi-link";

type RawEvent = {
    _id: string;
    name: string;
    location: string;
    host: string;
    description: string;
    start_time: string;
    end_time: string;
    column: number;
    event_type: string;
};

const DEFAULT_WIDTH = 1;
const isSaturday = (date: Date) => date.getDay() === 6; // Saturday is day 6 (0=Sun, 6=Sat)

// convert fetched data from DB to Event Type
function convertToEvent(ev: RawEvent): Event {
    const startTime = new Date(ev.start_time).getTime();
    const endTime = new Date(ev.end_time).getTime();

    let eventType: "workshop" | "constant" | "important" | "food" | "deadline" = "workshop"; 
    switch (ev.event_type) {
        case "food":
            eventType = "food";
            break;
        case "ceremony":
            eventType = "important";
            break;
        case "deadline":
            eventType = "deadline";
            break;
        default:
        eventType = "workshop";
    }

  return {
    id: ev._id,
    title: ev.name,
    description: ev.description ?? "",
    startTime,
    endTime,
    location: ev.location ?? "",
    speaker: ev.host ?? "",
    eventType,
    visible: true,
    column: ev.column,
    width: DEFAULT_WIDTH, 
  };
}

export default function Page() {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [saturdayEvents, setSaturdayEvents] = useState<Event[]>([]);
	const [sundayEvents, setSundayEvents] = useState<Event[]>([]);
	const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
	const [modalEvent, setModalEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        setState("loading");
        const response = await fetch("/api/schedule");

        if (!response.ok) {
          throw new Error("Failed to fetch schedule data");
        }

        const rawEvents: RawEvent[] = await response.json();
        const satEvents: Event[] = [];
        const sunEvents: Event[] = [];

        // process data
        rawEvents.forEach((rawEv) => {
            const convertedEvent = convertToEvent(rawEv);
            const eventDate = new Date(convertedEvent.startTime);

            // Separate events into Saturday and Sunday based on the start date
            if (isSaturday(eventDate)) { 
                satEvents.push(convertedEvent);
            } else {
                sunEvents.push(convertedEvent);
            }
        });

        // TODO: investigate possibility of infinite re-rendering
        // update saturdayEvents and sundayEvents arrays
        setSaturdayEvents(satEvents);
        setSundayEvents(sunEvents);

        setState("loaded");
      } catch (e) {
        console.error(e);
        setState("error");
      }
    }

    fetchSchedule();

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalEvent(null);
      }
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", keydownHandler);
    }
  }, []);

	return (
		<div className="flex flex-col w-full h-fit min-h-screen items-center justify-center">
			<div className="w-11/12 desktop:w-2/3 flex-grow flex-shrink basis-auto mt-28 desktop:mt-20" data-testid="schedule-container">
				<div className="flex w-full items-center justify-center">
					<HackRPILink
						href="https://calendar.google.com/calendar/u/0?cid=OGE3ZmViYjcyNGM3OWE3MWZkMWY4YTBjOWFiNDIzZGY3YTUyNjdhNjU1ZmFmYzc1ZjllNWI1Yzk0ZmMxODAyYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
						className="text-primary text-xl lg:text-2xl px-5 py-2"
					>
						Google Calendar
					</HackRPILink>
				</div>

				<div className="flex w-full items-center justify-between">
					<h1 className="text-3xl xs:text-4xl font-bold text-center">Schedule</h1>
					<p className="text-center font-bold text-xl xs:text-3xl">
						{currentDateTime.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
					</p>
				</div>

				<hr className="w-full border-primary border-2 my-4" />

				{state === "loading" && (
					<div className="flex h-fit items-center justify-center w-full">
						<h2 className="text-xl">Loading the schedule:</h2>
						<div className="loading loading-infinity loading-lg text-primary"></div>
					</div>
				)}

				{state === "error" && (
					<div className="badge bg-primary flex items-center justify-center h-fit my-4 ">
						<p className="text-error-content text-xl p-2">
							Oops! Looks like we ran into an issue loading the events. Please refresh. If it keeps happening email{" "}
							<a href="mailto:hackrpi@rpi.edu">hackrpi@rpi.edu</a>.
						</p>
					</div>
				)}

				{state === "loaded" && (
					<div className="flex flex-col items-start w-full h-fit mb-8">
						<h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center">Saturday, November 15, 2025</h1>
						<p>Click / Tap any event for more info!</p>
						<hr className="w-full border-grey my-4" />

						<Schedule
							events={saturdayEvents}
							times={saturdayTimes}
							currentTime={currentDateTime}
							onEventClick={(event) => {
								setModalEvent(saturdayEvents.find((e) => e.id === event.id)!);
							}}
						/>

						<div className="h-4"></div>

						<h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center">Sunday, November 16, 2025</h1>
						<p>Click / Tap any event for more info!</p>
						<hr className="w-full border-grey my-4" />

						<Schedule
							events={sundayEvents}
							times={sundayTimes}
							currentTime={currentDateTime}
							onEventClick={(event) => {
								setModalEvent(sundayEvents.find((e) => e.id === event.id)!);
							}}
						/>
					</div>
				)}

				{modalEvent && (
					<div
						className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-20"
						onClick={() => {
							setModalEvent(null);
						}}
					>
						<div className="w-11/12 desktop:w-2/3 h-5/6 bg-hackrpi-secondary-light-blue rounded-lg p-4 overflow-y-auto z-30">
							<div className="flex items-center justify-between mb-4 border-b-2 border-b-gray-400 h-24">
								<h1 className=" text-3xl xs:text-4xl md:text-5xl font-bold">{modalEvent.title}</h1>
								<button
                                    className="text-4xl font-bold text-black mr-4 hover:text-primary focus:text-primary"
									onClick={() => {
										setModalEvent(null);
									}}
								>
									&times;
								</button>
							</div>
							<p className="text-2xl md:text-4xl mb-4">
								{modalEvent.location} {modalEvent.speaker ? `• ${modalEvent.speaker}` : ""}
							</p>
							<p className="text-3xl mb-4">
								{new Date(modalEvent.startTime).toLocaleString()} –{" "}
								{new Date(modalEvent.endTime).toLocaleString()}
							</p>
							<p className="text-2xl">{modalEvent.description}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}