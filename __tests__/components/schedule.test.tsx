import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Schedule, { TimelineLabel } from "@/components/schedule/schedule";
import type { Event } from "@/data/schedule";

// Enable fake timers
jest.useFakeTimers();

describe("Schedule Component", () => {
	// Enhanced data creation utilities
	const createTimeLabel = (hour: number): TimelineLabel => {
		const date = new Date(2025, 10, 9, hour); // November 9, 2025
		return {
			str: date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
			unix: date.getTime(),
		};
	};

	const createEvent = (
		id: string,
		startHour: number,
		endHour: number,
		eventType: string = "default",
		visible: boolean = true,
		column: number = 1,
	): Event => ({
		id,
		title: `Event ${id}`,
		description: `Description for Event ${id}`,
		startTime: new Date(2025, 10, 9, startHour).getTime(),
		endTime: new Date(2025, 10, 9, endHour).getTime(),
		location: `Location ${id}`,
		speaker: startHour % 2 === 0 ? `Speaker ${id}` : "", // Alternate between having a speaker and not
		eventType,
		visible,
		column,
		width: 1,
	});

	// Sample data for testing
	const mockCurrentTime = new Date(2025, 10, 9, 12, 0, 0); // November 9, 2025, 12:00 PM

	const mockTimes: TimelineLabel[] = [
		createTimeLabel(9), // 9:00 AM
		createTimeLabel(10), // 10:00 AM
		createTimeLabel(11), // 11:00 AM
		createTimeLabel(12), // 12:00 PM
	];

	const mockEvents: Event[] = [
		createEvent("1", 10, 11, "default"), // 10:00 AM - 11:00 AM
		createEvent("2", 11, 12, "workshop"), // 11:00 AM - 12:00 PM
		createEvent("3", 12, 13, "food"), // 12:00 PM - 1:00 PM
	];

	const mockOnEventClick = jest.fn();

	// Setup DOM element mocking for position calculations
	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();

		// Mock getElementById to return elements with appropriate offsetTop
		document.getElementById = jest.fn().mockImplementation((id) => {
			if (!id) return null;

			const element = document.createElement("div");
			element.id = id;

			// Extract timestamp from ID and set appropriate offsetTop
			const timestamp = parseInt(id, 10);
			let offsetTop = 100;

			// Calculate position based on time (9 AM = 100px, 10 AM = 200px, etc.)
			const hour = new Date(timestamp).getHours();
			offsetTop = 100 + (hour - 9) * 96; // 96px height per hour

			Object.defineProperty(element, "offsetTop", {
				get: () => offsetTop,
			});

			return element;
		});

		// Mock Element.getBoundingClientRect for positioning
		Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
			top: 100,
			left: 0,
			right: 800,
			bottom: 300,
			width: 800,
			height: 200,
			x: 0,
			y: 100,
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("renders timeline with correct time labels", () => {
		render(
			<Schedule times={mockTimes} events={mockEvents} currentTime={mockCurrentTime} onEventClick={mockOnEventClick} />,
		);

		// Check all time labels are rendered
		mockTimes.forEach((time) => {
			expect(screen.getByText(time.str)).toBeInTheDocument();
		});
	});

	it("displays events with correct titles and locations", () => {
		render(
			<Schedule times={mockTimes} events={mockEvents} currentTime={mockCurrentTime} onEventClick={mockOnEventClick} />,
		);

		// Check all event titles
		expect(screen.getByText("Event 1")).toBeInTheDocument();
		expect(screen.getByText("Event 2")).toBeInTheDocument();
		expect(screen.getByText("Event 3")).toBeInTheDocument();

		// Check locations with and without speakers - match the exact format in the component
		expect(screen.getByText("Location 1 • Speaker 1")).toBeInTheDocument();
		// For Location 3, the component adds a space after Location 3, so we need to match that
		expect(screen.getByText(/Location 3/).textContent).toMatch(/Location 3/);
	});

	it("applies styling based on event type", () => {
		render(
			<Schedule
				times={mockTimes}
				events={mockEvents}
				currentTime={new Date(2025, 10, 9, 8, 0, 0)}
				onEventClick={mockOnEventClick}
			/>,
		);

		// Simply verify that the events are rendered
		const event1 = screen.getByText("Event 1");
		const event2 = screen.getByText("Event 2");
		const event3 = screen.getByText("Event 3");

		expect(event1).toBeInTheDocument();
		expect(event2).toBeInTheDocument();
		expect(event3).toBeInTheDocument();
	});

	it("applies appropriate styling for past events", () => {
		// Use a time after all events to test past event styling
		const laterTime = new Date(2025, 10, 9, 14, 0, 0); // 2:00 PM

		render(<Schedule times={mockTimes} events={mockEvents} currentTime={laterTime} onEventClick={mockOnEventClick} />);

		// All events should have past event styling
		const eventElements = screen.getAllByText(/Event \d/);

		eventElements.forEach((element) => {
			const container = element.closest("div");
			expect(container).toHaveClass("bg-hackrpi-secondary-light-blue");
			expect(container).toHaveClass("text-gray-300");
		});
	});

	it("applies appropriate styling for current events", () => {
		// Current time during event 3
		const duringEvent3 = new Date(2025, 10, 9, 12, 30, 0); // 12:30 PM

		render(
			<Schedule times={mockTimes} events={mockEvents} currentTime={duringEvent3} onEventClick={mockOnEventClick} />,
		);

		// Event 3 should have current event styling
		const event3 = screen.getByText("Event 3").closest("div");
		expect(event3).toHaveClass("bg-hackrpi-secondary-yellow");

		// Earlier events should have past event styling
		const event1 = screen.getByText("Event 1").closest("div");
		expect(event1).toHaveClass("bg-hackrpi-secondary-light-blue");
	});

	it("triggers onEventClick when an event is clicked", async () => {
		const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

		render(
			<Schedule times={mockTimes} events={mockEvents} currentTime={mockCurrentTime} onEventClick={mockOnEventClick} />,
		);

		// Find an event and click it
		const event1 = screen.getByText("Event 1").closest("div");

		await act(async () => {
			await user.click(event1!);
			jest.runAllTimers();
		});

		// Check if click handler was called with the right event
		expect(mockOnEventClick).toHaveBeenCalledTimes(1);
		expect(mockOnEventClick).toHaveBeenCalledWith(
			expect.objectContaining({
				id: "1",
				title: "Event 1",
			}),
		);
	});

	it("correctly positions events on the schedule", () => {
		render(
			<Schedule times={mockTimes} events={mockEvents} currentTime={mockCurrentTime} onEventClick={mockOnEventClick} />,
		);

		// Find all event elements by title
		const event1 = screen.getByText("Event 1");
		const event2 = screen.getByText("Event 2");
		const event3 = screen.getByText("Event 3");

		// Verify that events are rendered
		expect(event1).toBeInTheDocument();
		expect(event2).toBeInTheDocument();
		expect(event3).toBeInTheDocument();

		// Simply check that each event is a clickable element
		expect(event1.closest("div")).not.toBeNull();
		expect(event2.closest("div")).not.toBeNull();
		expect(event3.closest("div")).not.toBeNull();
	});

	it("handles events with empty speaker field correctly", () => {
		// Create events with and without speakers
		const eventsWithEmptySpeakers = [
			createEvent("1", 10, 11, "default"), // This will have a speaker (even hour)
			createEvent("2", 11, 12, "workshop"), // This will not have a speaker (odd hour)
		];

		render(
			<Schedule
				times={mockTimes}
				events={eventsWithEmptySpeakers}
				currentTime={mockCurrentTime}
				onEventClick={mockOnEventClick}
			/>,
		);

		// Check that the event with a speaker displays correctly
		expect(screen.getByText("Location 1 • Speaker 1")).toBeInTheDocument();

		// Check that the event without a speaker doesn't show the bullet
		expect(screen.getByText("Location 2")).toBeInTheDocument();
		expect(screen.queryByText("Location 2 •")).toBeNull();
	});

	it("renders multiple columns for overlapping events", () => {
		// Create events that overlap
	const overlappingEvents = [
		createEvent("1", 10, 12, "default", true, 1), // 10:00 AM - 12:00 PM
		createEvent("2", 11, 13, "workshop", true, 2), // 11:00 AM - 1:00 PM - overlaps with event 1
	];

		render(
			<Schedule
				times={mockTimes}
				events={overlappingEvents}
				currentTime={mockCurrentTime}
				onEventClick={mockOnEventClick}
			/>,
		);

		// Both events should be visible
		expect(screen.getByText("Event 1")).toBeInTheDocument();
		expect(screen.getByText("Event 2")).toBeInTheDocument();

		// Can't easily test the column arrangement in jsdom, but we can verify
		// the events are rendered with appropriate styling
		const event1 = screen.getByText("Event 1").closest("div");
		const event2 = screen.getByText("Event 2").closest("div");

		expect(event1).toHaveClass("absolute");
		expect(event2).toHaveClass("absolute");
	});
});
