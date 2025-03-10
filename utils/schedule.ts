import { type Event } from "@/data/schedule";

export function arrangeEvents(events: Event[]): Event[][] {
	if (events.length === 0) {
		return [];
	}

	// First, group events by their column property
	const eventsWithColumn: { [key: number]: Event[] } = {};
	const eventsWithoutColumn: Event[] = [];

	// Sort events into those with and without column assignments
	events.forEach(event => {
		if (event.column !== undefined && event.column !== 0) {
			if (!eventsWithColumn[event.column]) {
				eventsWithColumn[event.column] = [];
			}
			eventsWithColumn[event.column].push(event);
		} else {
			eventsWithoutColumn.push(event);
		}
	});
	
	// Find the maximum column number to determine how many columns we need
	const columnNumbers = Object.keys(eventsWithColumn).map(Number);
	const maxColumn = columnNumbers.length > 0 ? Math.max(...columnNumbers) : 0;
	
	// Initialize result array with existing columns
	const result: Event[][] = Array(maxColumn).fill(null).map((_, i) => {
		return eventsWithColumn[i + 1] || [];
	});
	
	// For any missing columns (gaps in column numbering), ensure they exist
	for (let i = 0; i < maxColumn; i++) {
		if (!result[i]) {
			result[i] = [];
		}
	}
	
	// Handle events without column assignments using the original algorithm
	let eventsToPlace = [...eventsWithoutColumn];
	
	// If result is empty (no columns defined yet), initialize with one column
	if (result.length === 0) {
		result.push([]);
	}

	while (eventsToPlace.length > 0) {
		let eventToPlace = eventsToPlace.shift();
		if (!eventToPlace) {
			break;
		}

		let placed = false;

		for (let i = 0; i < result.length; i++) {
			const column = result[i];
			let conflict = findConflict(eventToPlace, column);
			
			if (!conflict) {
				// If there are no conflicts, place the event in the column
				column.push(eventToPlace);
				placed = true;
				break;
			}
		}

		// If we couldn't place the event in any existing column, add a new column
		if (!placed) {
			result.push([eventToPlace]);
		}
	}

	// Sort events within each column by start time
	result.forEach(column => {
		column.sort((a, b) => a.startTime - b.startTime);
	});

	return result;
}

function findConflict(event: Event, events: Event[]): Event | undefined {
	for (let i = 0; i < events.length; i++) {
		// Check if the event overlaps with any existing event in the column
		const existingEvent = events[i];
		if (
			(event.startTime >= existingEvent.startTime && event.startTime < existingEvent.endTime) ||
			(existingEvent.startTime >= event.startTime && existingEvent.startTime < event.endTime)
		) {
			return existingEvent;
		}
	}
	return undefined;
}
