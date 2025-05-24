import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the CSS import
jest.mock("@/app/globals.css", () => ({}), { virtual: true });

// Mock the image imports
jest.mock("@/public/maps_img/DCC.png", () => "dcc-image-stub");
jest.mock("@/public/maps_img/LOW.png", () => "low-image-stub");
jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

import MapsDCCLow from "@/components/maps/maps";

describe("MapsDCCLow Component", () => {
	it("renders both building buttons correctly", () => {
		render(<MapsDCCLow />);

		// Check that both buttons are rendered
		expect(screen.getByText("Darrin Communications Center")).toBeInTheDocument();
		expect(screen.getByText("Low Center for Industrial Innovation")).toBeInTheDocument();
	});

	it("shows DCC image by default", () => {
		render(<MapsDCCLow />);

		// Check that DCC image is shown by default
		expect(screen.getByAltText("DCC Image")).toBeInTheDocument();
		expect(screen.queryByAltText("LOW Image")).not.toBeInTheDocument();
	});

	it("switches to LOW image when LOW button is clicked", () => {
		render(<MapsDCCLow />);

		// Initially shows DCC image
		expect(screen.getByAltText("DCC Image")).toBeInTheDocument();

		// Click the LOW button
		const lowButton = screen.getByText("Low Center for Industrial Innovation");
		fireEvent.click(lowButton);

		// Now the LOW image should be displayed, and DCC should be hidden
		expect(screen.getByAltText("LOW Image")).toBeInTheDocument();
		expect(screen.queryByAltText("DCC Image")).not.toBeInTheDocument();
	});

	it("switches back to DCC image when DCC button is clicked after showing LOW", () => {
		render(<MapsDCCLow />);

		// Click the LOW button first to show LOW image
		const lowButton = screen.getByText("Low Center for Industrial Innovation");
		fireEvent.click(lowButton);

		// Verify LOW image is shown
		expect(screen.getByAltText("LOW Image")).toBeInTheDocument();

		// Click the DCC button to switch back
		const dccButton = screen.getByText("Darrin Communications Center");
		fireEvent.click(dccButton);

		// Now DCC image should be displayed, and LOW should be hidden
		expect(screen.getByAltText("DCC Image")).toBeInTheDocument();
		expect(screen.queryByAltText("LOW Image")).not.toBeInTheDocument();
	});

	it("has a maps ID for the maps container", () => {
		render(<MapsDCCLow />);

		// Look for the element with ID 'maps' instead of data-testid
		expect(document.getElementById("maps")).toBeInTheDocument();
	});
});
