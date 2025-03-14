/**
 * Jest-specific test helpers for unit and component testing
 */

/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React, { ReactElement } from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Import shared helpers
import { generateTestUser } from "./common";

/**
 * Extended render options for React Testing Library
 */
interface CustomRenderOptions {
	route?: string;
	mockRouter?: boolean;
	mockNextImage?: boolean;
	theme?: string;
}

/**
 * Reset all mocks between tests
 */
export function resetAllMocks() {
	jest.resetAllMocks();
	jest.clearAllMocks();

	// Also reset any window properties that have been mocked
	if (typeof window !== "undefined") {
		// Reset any properties that might be overridden in tests
		if (jest.isMockFunction(window.fetch)) {
			window.fetch.mockReset();
		}

		// Reset any overrides on window.location
		if (typeof window.location !== "undefined") {
			delete (window as any).location;
			(window as any).location = {
				assign: jest.fn(),
				href: "http://localhost/",
				origin: "http://localhost",
				pathname: "/",
				search: "",
			};
		}
	}
}

/**
 * Render components with common providers needed for testing
 */
export function renderWithProviders(ui: ReactElement, options: CustomRenderOptions = {}) {
	const {
		route = "/",
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mockRouter = true,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mockNextImage = true,
		theme = "hackrpi",
	} = options;

	// Setup mock functions - don't use jest.mock here as it needs to be at the top level
	// Instead, we'll return functions that consumers can use to set up their own mocks
	const mockRouterFunctions = {
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
		prefetch: jest.fn(),
		pathname: route,
	};

	// Create wrapper with all providers
	const Wrapper = ({ children }: { children: React.ReactNode }) =>
		React.createElement("div", { "data-theme": theme, "data-testid": "theme-provider" }, children);

	// Set up user events
	const user = userEvent.setup();

	return {
		user,
		mockRouterFunctions,
		...render(ui, { wrapper: Wrapper }),
	};
}

/**
 * Helper function to test form submission with test data
 */
export async function fillAndSubmitForm(
	formTestId: string,
	fields: Record<string, string>,
	submitButtonText = "Submit",
) {
	const form = screen.getByTestId(formTestId);

	// Fill each field
	for (const [name, value] of Object.entries(fields)) {
		const field = within(form).getByRole("textbox", { name: new RegExp(name, "i") });
		await userEvent.type(field, value);
	}

	// Find and click submit button
	const submitButton = within(form).getByRole("button", { name: new RegExp(submitButtonText, "i") });
	await userEvent.click(submitButton);

	// Wait for form submission to complete
	await waitFor(() => {
		expect(submitButton).not.toBeDisabled();
	});
}

/**
 * Creates mock data for testing components with API data dependencies
 */
export function createMockApiResponse<T>(data: T, delay = 0, shouldFail = false) {
	if (shouldFail) {
		return jest
			.fn()
			.mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error("API Error")), delay)));
	}

	return jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data }), delay)));
}

/**
 * Helper to test async loading states in components
 */
export async function testAsyncComponent(
	ui: ReactElement,
	{
		loadingTestId = "loading",
		contentTestId = "content",
		errorTestId = "error",
		mockApi,
		shouldFail = false,
	}: {
		loadingTestId?: string;
		contentTestId?: string;
		errorTestId?: string;
		mockApi: jest.Mock;
		shouldFail?: boolean;
	},
) {
	// Mock API success or failure
	if (shouldFail) {
		mockApi.mockRejectedValueOnce(new Error("API Error"));
	} else {
		mockApi.mockResolvedValueOnce({ data: { success: true } });
	}

	// Render component
	render(ui);

	// Expect loading state first
	expect(screen.getByTestId(loadingTestId)).toBeInTheDocument();

	// Wait for loading to complete
	if (shouldFail) {
		await waitFor(() => {
			expect(screen.getByTestId(errorTestId)).toBeInTheDocument();
		});
	} else {
		await waitFor(() => {
			expect(screen.getByTestId(contentTestId)).toBeInTheDocument();
		});
	}
}
