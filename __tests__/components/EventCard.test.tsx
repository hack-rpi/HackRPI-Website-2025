/**
 * Component tests for EventCard
 * Tests the event editing UI component used in the directors page
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Event } from "@/data/schedule";

// Define a mock event card component similar to the one in directors/page.tsx
function EventCard(props: { event: Event; onUpdate: (event: Event) => void; onDelete: (event: Event) => void }) {
	const [editing, setEditing] = React.useState(false);
	const [event, setEvent] = React.useState(props.event);

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		setEditing(false);
		props.onUpdate(event);
	};

	// Reset to original event data when cancelling the edit
	const handleCancel = () => {
		setEditing(false);
		setEvent(props.event); // Reset to original event
	};

	// Helper function to convert Unix timestamp to datetime-local input format
	const convertUnixToTimeInput = (unix: number): string => {
		const date = new Date(unix);
		return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
	};

	return (
		<div className="w-full h-fit flex flex-col items-center justify-start border border-gray-400 rounded-md mb-2">
			{editing ? (
				<form
					className="w-11/12 flex flex-col items-center justify-start form"
					onSubmit={handleSave}
					data-testid="edit-form"
				>
					<label className="text-lg font-bold">Edit Event</label>
					<label className="text-sm w-full my-2 gap-2">
						Event Name:
						<input
							className="input input-primary w-full"
							type="text"
							placeholder="Title"
							id={`title-${event.id}`}
							value={event.title}
							onChange={(e) => setEvent({ ...event, title: e.target.value })}
							data-testid="title-input"
						/>
					</label>

					<label className="text-sm w-full my-2 gap-2">
						Event Description:
						<textarea
							className="textarea w-full"
							placeholder="Description"
							value={event.description}
							onChange={(e) => setEvent({ ...event, description: e.target.value })}
							data-testid="description-input"
						/>
					</label>

					<label className="text-sm w-full my-2 gap-2">
						Start Time:
						<input
							className="input input-primary w-full"
							type="datetime-local"
							placeholder="Start Time"
							value={convertUnixToTimeInput(event.startTime)}
							onChange={(e) =>
								setEvent({
									...event,
									startTime: new Date(e.target.value).valueOf(),
								})
							}
							data-testid="start-time-input"
						/>
					</label>

					<label className="text-sm w-full my-2 gap-2">
						End Time:
						<input
							className="input input-primary w-full"
							type="datetime-local"
							placeholder="End Time"
							value={convertUnixToTimeInput(event.endTime)}
							onChange={(e) => setEvent({ ...event, endTime: new Date(e.target.value).valueOf() })}
							data-testid="end-time-input"
						/>
					</label>

					<div className="flex w-full items-center justify-start mb-2">
						<label>
							Visibility:
							<input
								className="checkbox ml-4"
								type="checkbox"
								checked={event.visible}
								onChange={(e) => setEvent({ ...event, visible: e.target.checked })}
								data-testid="visibility-checkbox"
							/>
						</label>
					</div>

					<div className="flex w-full items-center justify-between my-2">
						<button type="submit" className="btn btn-primary btn-sm" data-testid="save-button">
							Save
						</button>
						<button type="button" className="btn btn-error btn-sm" onClick={handleCancel} data-testid="cancel-button">
							Cancel
						</button>
					</div>
				</form>
			) : (
				<div className="w-11/12 py-2" data-testid="event-display">
					<div className="flex justify-between items-start mb-2">
						<h3 className="text-lg font-bold">{event.title}</h3>
						<div>
							<button
								className="btn btn-secondary btn-xs mr-2"
								onClick={() => setEditing(true)}
								data-testid="edit-button"
							>
								Edit
							</button>
							<button
								className="btn btn-error btn-xs"
								onClick={() => props.onDelete(event)}
								data-testid="delete-button"
							>
								Delete
							</button>
						</div>
					</div>
					<p className="text-sm">{event.description}</p>
				</div>
			)}
		</div>
	);
}

describe("EventCard Component", () => {
	// Mock event data
	const mockEvent: Event = {
		id: "123",
		title: "Test Event",
		description: "This is a test event description",
		startTime: 1699001400000, // November 3, 2023 10:30:00 GMT
		endTime: 1699005000000, // November 3, 2023 11:30:00 GMT
		visible: true,
		eventType: "default",
		location: "Test Location",
		speaker: "Test Speaker",
	};

	// Mock callback functions
	const onUpdate = jest.fn();
	const onDelete = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders event details in display mode", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		expect(screen.getByText("Test Event")).toBeInTheDocument();
		expect(screen.getByText("This is a test event description")).toBeInTheDocument();
		expect(screen.getByTestId("edit-button")).toBeInTheDocument();
		expect(screen.getByTestId("delete-button")).toBeInTheDocument();
	});

	it("switches to edit mode when Edit button is clicked", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		fireEvent.click(screen.getByTestId("edit-button"));

		expect(screen.getByTestId("edit-form")).toBeInTheDocument();
		expect(screen.getByTestId("title-input")).toHaveValue("Test Event");
		expect(screen.getByTestId("description-input")).toHaveValue("This is a test event description");
		expect(screen.getByTestId("visibility-checkbox")).toBeChecked();
	});

	it("updates event title when changed in edit mode", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		// Switch to edit mode
		fireEvent.click(screen.getByTestId("edit-button"));

		// Change the title
		fireEvent.change(screen.getByTestId("title-input"), { target: { value: "Updated Event Title" } });

		// Save the form
		fireEvent.submit(screen.getByTestId("edit-form"));

		// Check if onUpdate was called with the updated event
		expect(onUpdate).toHaveBeenCalledWith({
			...mockEvent,
			title: "Updated Event Title",
		});
	});

	it("updates event description when changed in edit mode", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		// Switch to edit mode
		fireEvent.click(screen.getByTestId("edit-button"));

		// Change the description
		fireEvent.change(screen.getByTestId("description-input"), { target: { value: "Updated description" } });

		// Save the form
		fireEvent.submit(screen.getByTestId("edit-form"));

		// Check if onUpdate was called with the updated event
		expect(onUpdate).toHaveBeenCalledWith({
			...mockEvent,
			description: "Updated description",
		});
	});

	it("toggles visibility when checkbox is changed", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		// Switch to edit mode
		fireEvent.click(screen.getByTestId("edit-button"));

		// Toggle visibility
		fireEvent.click(screen.getByTestId("visibility-checkbox"));

		// Save the form
		fireEvent.submit(screen.getByTestId("edit-form"));

		// Check if onUpdate was called with the updated event
		expect(onUpdate).toHaveBeenCalledWith({
			...mockEvent,
			visible: false,
		});
	});

	it("calls onDelete when Delete button is clicked", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		// Click the delete button
		fireEvent.click(screen.getByTestId("delete-button"));

		// Check if onDelete was called
		expect(onDelete).toHaveBeenCalledWith(mockEvent);
	});

	it("cancels editing without saving when Cancel button is clicked", () => {
		render(<EventCard event={mockEvent} onUpdate={onUpdate} onDelete={onDelete} />);

		// Switch to edit mode
		fireEvent.click(screen.getByTestId("edit-button"));

		// Change the title
		fireEvent.change(screen.getByTestId("title-input"), { target: { value: "Updated Event Title" } });

		// Click cancel
		fireEvent.click(screen.getByTestId("cancel-button"));

		// Check that we're back in display mode
		expect(screen.getByTestId("event-display")).toBeInTheDocument();

		// Check that the original title is shown
		expect(screen.getByText("Test Event")).toBeInTheDocument();

		// Check that onUpdate wasn't called
		expect(onUpdate).not.toHaveBeenCalled();
	});
});
