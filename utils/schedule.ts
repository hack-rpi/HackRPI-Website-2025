import { type Event } from "@/data/schedule";

export function arrangeEvents(events: Event[]): Event[][] {
	if (events.length === 0) {
		return [];
	}

	const eventsToPlace = [...events];

	const placedEvents: Event[][] = [[]];

	while (eventsToPlace.length > 0) {
		let eventToPlace = eventsToPlace.shift();
		if (!eventToPlace) {
			break;
		}

		for (let i = 0; i < placedEvents.length; i++) {
			const column = placedEvents[i];
			const conflict = findConflict(eventToPlace!, column);
			if (!conflict) {
				// If there are no conflicts, place the event in the column
				column.push(eventToPlace);
				eventToPlace = undefined;
				break;
			}

			const longerEvent: Event =
				eventToPlace.endTime - eventToPlace.startTime > conflict.endTime - conflict.startTime ? eventToPlace : conflict;

			if (longerEvent === conflict) {
				// We want longer events to be in the earlier columns
				// Since the longer event is already in the column, we need to find a new column for the shorter event
				// Move on to the next column
				continue;
			}

			// If the longer event is the one being placed, we need to swap the events
			// so that the longer event is placed first
			column[column.indexOf(conflict)] = eventToPlace!;
			eventToPlace = conflict;
		}

		// If we couldn't place the event in any column, add a new column
		if (eventToPlace) {
			placedEvents.push([eventToPlace]);
		}
	}

	return placedEvents;
}

function findConflict(event: Event, events: Event[]): Event | undefined {
	for (let i = 0; i < events.length; i++) {
		// Check for all types of conflicts between events
		const existingEvent = events[i];

		// Case 1: New event starts during existing event
		const newEventStartsDuringExisting =
			event.startTime >= existingEvent.startTime && event.startTime < existingEvent.endTime;

		// Case 2: Existing event starts during new event
		const existingStartsDuringNew =
			existingEvent.startTime >= event.startTime && existingEvent.startTime < event.endTime;

		// Case 3: New event contains existing event entirely
		const newContainsExisting = event.startTime <= existingEvent.startTime && event.endTime >= existingEvent.endTime;

		// Case 4: Existing event contains new event entirely
		const existingContainsNew = existingEvent.startTime <= event.startTime && existingEvent.endTime >= event.endTime;

		// If any overlap case is true, there's a conflict
		if (newEventStartsDuringExisting || existingStartsDuringNew || newContainsExisting || existingContainsNew) {
			return existingEvent;
		}
	}
	return undefined;
}
