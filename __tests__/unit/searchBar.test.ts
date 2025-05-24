/**
 * Unit tests for searchBar utility
 * Tests the search functionality and URL mapping logic
 */

// Variables to capture jQuery configuration
let jQueryAutocompleteConfig: any = null;
let jQueryKeydownHandler: any = null;

// Mock the jquery module with implementation
jest.mock("jquery", () => {
	return jest.fn().mockImplementation((selector: string) => ({
		autocomplete: jest.fn().mockImplementation((config: any) => {
			jQueryAutocompleteConfig = config;
		}),
		on: jest.fn().mockImplementation((eventType: string, handler: any) => {
			if (eventType === "keydown") {
				jQueryKeydownHandler = handler;
			}
		}),
		val: jest.fn().mockReturnValue(""),
	}));
});
jest.mock("jquery-ui/ui/widgets/autocomplete", () => ({}));

// Mock window and alert
const mockLocation = { href: "" };
const mockAlert = jest.fn();

// Mock window.location
Object.defineProperty(window, "location", {
	value: mockLocation,
	writable: true,
});

// Mock window.alert explicitly
window.alert = mockAlert;

// Import after mocks are set up
import { initializeSearch } from "@/utils/searchBar";
// @ts-ignore - jQuery is mocked
import $ from "jquery";

// Get reference to mocked jQuery
const mockJQuery = $ as jest.MockedFunction<any>;

describe("searchBar utility", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockLocation.href = "";
		jQueryAutocompleteConfig = null;
		jQueryKeydownHandler = null;
	});

	describe("initializeSearch", () => {
		it("should set up autocomplete with available tags", () => {
			initializeSearch();

			expect(mockJQuery).toHaveBeenCalledWith("#tags");
			expect(jQueryAutocompleteConfig).toBeDefined();
			expect(jQueryAutocompleteConfig.source).toEqual(
				expect.arrayContaining([
					"Home",
					"Events",
					"Schedule",
					"Announcements",
					"Prizes",
					"Resources",
					"HackRPI XI",
					"Sponsors",
					"Winners",
					"Join Us",
					"Mentoring",
					"Volunteer",
					"MLH",
					"Leaderboard",
					"Code of Conduct",
					"Homepage",
					"Board",
					"Join",
					"Help Us",
					"Main",
					"Mainpage",
					"Codes",
					"Plan",
					"Participants",
					"Awards",
				]),
			);
			expect(jQueryAutocompleteConfig.select).toBeInstanceOf(Function);
		});

		it("should set up keydown handler", () => {
			initializeSearch();

			expect(jQueryKeydownHandler).toBeInstanceOf(Function);
		});
	});

	describe("URL mapping functionality", () => {
		beforeEach(() => {
			initializeSearch();
		});

		// Test the actual redirect logic through the autocomplete select handler
		const urlMappingTests = [
			// Internal URLs
			{ input: "home", expected: "/" },
			{ input: "Home", expected: "/" },
			{ input: "HOME", expected: "/" },
			{ input: "  Home  ", expected: "/" },
			{ input: "events", expected: "../event" },
			{ input: "schedule", expected: "../event/schedule" },
			{ input: "announcements", expected: "../announcements" },
			{ input: "prizes", expected: "../event/prizes" },
			{ input: "resources", expected: "../resources" },
			{ input: "hackrpi xi", expected: "/last-year" },
			{ input: "sponsors", expected: "../sponsor-us" },
			{ input: "leaderboard", expected: "../2048/leaderboard" },
			{ input: "main", expected: "/" },
			{ input: "mainpage", expected: "/" },
			{ input: "plan", expected: "../event/schedule" },
			{ input: "awards", expected: "../event/prizes" },
			// External URLs
			{ input: "winners", expected: "https://hackrpi2024.devpost.com/project-gallery" },
			{ input: "join us", expected: "https://discord.com/invite/Pzmdt7FYnu" },
			{ input: "mlh", expected: "https://mlh.io/seasons/2025/events" },
			{ input: "code of conduct", expected: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" },
		];

		test.each(urlMappingTests)("should redirect '$input' to '$expected'", ({ input, expected }) => {
			mockLocation.href = ""; // Reset

			const mockEvent = {};
			const mockUI = { item: { value: input } };

			// Call the select handler
			jQueryAutocompleteConfig.select(mockEvent, mockUI);

			expect(window.location.href).toBe(expected);
		});

		it("should show alert for unrecognized search terms", () => {
			const mockEvent = {};
			const mockUI = { item: { value: "nonexistent-term" } };

			jQueryAutocompleteConfig.select(mockEvent, mockUI);

			expect(mockAlert).toHaveBeenCalledWith("No redirect URL found for 'nonexistent-term'");
			expect(window.location.href).toBe("");
		});

		it("should handle empty search terms", () => {
			const mockEvent = {};
			const mockUI = { item: { value: "" } };

			jQueryAutocompleteConfig.select(mockEvent, mockUI);

			expect(mockAlert).toHaveBeenCalledWith("No redirect URL found for ''");
			expect(window.location.href).toBe("");
		});

		it("should handle whitespace-only search terms", () => {
			const mockEvent = {};
			const mockUI = { item: { value: "   " } };

			jQueryAutocompleteConfig.select(mockEvent, mockUI);

			expect(mockAlert).toHaveBeenCalledWith("No redirect URL found for ''");
			expect(window.location.href).toBe("");
		});

		it("should be case insensitive", () => {
			const testCases = [
				{ input: "HOME", expected: "/" },
				{ input: "EVENTS", expected: "../event" },
				{ input: "Winners", expected: "https://hackrpi2024.devpost.com/project-gallery" },
			];

			testCases.forEach(({ input, expected }) => {
				mockLocation.href = "";

				const mockEvent = {};
				const mockUI = { item: { value: input } };

				jQueryAutocompleteConfig.select(mockEvent, mockUI);

				expect(window.location.href).toBe(expected);
			});
		});
	});

	describe("keydown handler functionality", () => {
		beforeEach(() => {
			initializeSearch();
		});

		it("should redirect on Enter key press", () => {
			const mockInputValue = "Events";
			const mockThis = document.createElement("input");

			// Mock jQuery to return correct value when called with the context
			mockJQuery.mockImplementationOnce((selector: any) => {
				if (selector === mockThis) {
					return {
						val: jest.fn().mockReturnValue(mockInputValue),
					};
				}
				return {
					autocomplete: jest.fn(),
					on: jest.fn(),
					val: jest.fn(),
				};
			});

			const mockEvent = { key: "Enter" };

			jQueryKeydownHandler.call(mockThis, mockEvent);

			expect(window.location.href).toBe("../event");
		});

		it("should not redirect on non-Enter key press", () => {
			const mockThis = {
				val: jest.fn().mockReturnValue("Events"),
			};

			const mockEvent = { key: "ArrowDown" };

			jQueryKeydownHandler.call(mockThis, mockEvent);

			expect(window.location.href).toBe("");
		});
	});
});
