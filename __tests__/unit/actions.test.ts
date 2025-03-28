// Mock these modules before importing the functions
import { generateClient } from "aws-amplify/api";
import * as Auth from "@aws-amplify/auth";
import { Profanity } from "@2toad/profanity";

// Remove this import as we'll move it below after setting up mocks
// import { get_leaderboard, create_leaderboard_entry, fetchEvents, is_game_ready, LeaderboardEntry } from "@/app/actions";

// This object will be defined inline in the mock instead of referencing mockClient
jest.mock("aws-amplify/api", () => {
	// Declare mock functions
	const mockListByScore = jest.fn();
	const mockCreate = jest.fn();
	const mockList = jest.fn();

	// Return the mock implementation
	return {
		generateClient: jest.fn().mockReturnValue({
			models: {
				Leaderboard: {
					listByScore: mockListByScore,
					create: mockCreate,
				},
				event: {
					list: mockList,
				},
			},
		}),
	};
});

// Extract the mocked functions after mocking
const mockGenerateClient = generateClient as jest.MockedFunction<typeof generateClient>;
const mockClient = mockGenerateClient() as any;
const mockListByScore = mockClient.models.Leaderboard.listByScore;
const mockCreate = mockClient.models.Leaderboard.create;
const mockList = mockClient.models.event.list;

// Mock Auth module
jest.mock("@aws-amplify/auth", () => ({
	fetchAuthSession: jest.fn().mockResolvedValue({
		tokens: {
			accessToken: {
				payload: {},
			},
		},
	}),
}));

// Mock Profanity module
jest.mock("@2toad/profanity", () => {
	return {
		Profanity: jest.fn().mockImplementation(() => ({
			addWords: jest.fn(),
			exists: jest.fn().mockImplementation((word) => {
				// Mock profanity detection for testing
				return word.includes("badword");
			}),
		})),
	};
});

// Now import the functions being tested AFTER all mocks are set up
import { get_leaderboard, create_leaderboard_entry, fetchEvents, is_game_ready, LeaderboardEntry } from "@/app/actions";

// Define mock generators for consistent test data
const generateMockLeaderboardEntry = (
	id: string,
	username: string,
	score: number,
	year: number = 2024,
): LeaderboardEntry => ({
	id,
	username,
	score,
	year,
});

const generateMockEvent = (id: string, visible: boolean = true) => ({
	id,
	title: `Event ${id}`,
	description: `Description for event ${id}`,
	startTime: Date.now(),
	endTime: Date.now() + 3600000,
	location: `Location ${id}`,
	speaker: `Speaker ${id}`,
	eventType: "default",
	visible,
});

describe("Server Actions", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Reset all mocks with consistent behavior
		(Auth.fetchAuthSession as jest.Mock).mockReset();
		(Auth.fetchAuthSession as jest.Mock).mockResolvedValue({
			tokens: {
				accessToken: {
					payload: {},
				},
			},
		});

		// Reset individual model function mocks
		mockListByScore.mockReset();
		mockCreate.mockReset();
		mockList.mockReset();
	});

	describe("is_game_ready", () => {
		let originalDate: DateConstructor;

		beforeEach(() => {
			// Store the original Date constructor
			originalDate = global.Date;
		});

		afterEach(() => {
			// Restore the original Date constructor
			global.Date = originalDate;
		});

		it("should return true when current time is within game window", async () => {
			// Mock Date to return a time during the game window
			// 1 hour after SATURDAY_START (Nov 9, 2024 10:00 AM)
			const mockDate = new Date(1731160800000 + 3600000);
			global.Date = class extends Date {
				constructor(...args: any[]) {
					if (args.length === 0) {
						super(mockDate);
					} else {
						super(...args);
					}
				}
			} as DateConstructor;

			const result = await is_game_ready();
			expect(result).toBe(true);
		});

		it("should return false when current time is before game window", async () => {
			// Mock Date to return a time before the game window
			// 1 hour before SATURDAY_START
			const mockDate = new Date(1731160800000 - 3600000);
			global.Date = class extends Date {
				constructor(...args: any[]) {
					if (args.length === 0) {
						super(mockDate);
					} else {
						super(...args);
					}
				}
			} as DateConstructor;

			const result = await is_game_ready();
			expect(result).toBe(false);
		});

		it("should return false when current time is after game window", async () => {
			// Mock Date to return a time after the game window
			// 1 hour after end time
			const mockDate = new Date(1731254400000 + 86400000 + 3600000);
			global.Date = class extends Date {
				constructor(...args: any[]) {
					if (args.length === 0) {
						super(mockDate);
					} else {
						super(...args);
					}
				}
			} as DateConstructor;

			const result = await is_game_ready();
			expect(result).toBe(false);
		});

		it("should handle edge case of exactly at start time", async () => {
			// Mock Date to return exactly the start time
			const mockDate = new Date(1731160800000);
			global.Date = class extends Date {
				constructor(...args: any[]) {
					if (args.length === 0) {
						super(mockDate);
					} else {
						super(...args);
					}
				}
			} as DateConstructor;

			const result = await is_game_ready();
			expect(result).toBe(true);
		});
	});

	describe("get_leaderboard", () => {
		it("should fetch leaderboard entries for regular users", async () => {
			// Setup mock response
			const mockEntries = [
				generateMockLeaderboardEntry("1", "player1", 1000),
				generateMockLeaderboardEntry("2", "player2", 500),
			];

			mockListByScore.mockResolvedValueOnce({
				data: mockEntries,
				errors: null,
			});

			// Mock user not being in directors group
			(Auth.fetchAuthSession as jest.Mock).mockResolvedValueOnce({
				tokens: {
					accessToken: {
						payload: {},
					},
				},
			});

			const result = await get_leaderboard();

			// Verify results
			expect(result).toEqual(mockEntries);
			expect(mockListByScore).toHaveBeenCalledWith(
				{ year: 2024 },
				{
					limit: 50,
					sortDirection: "DESC",
					authMode: "identityPool", // Regular user uses identityPool
				},
			);
		});

		it("should fetch leaderboard entries for directors", async () => {
			// Setup mock response
			const mockEntries = [
				generateMockLeaderboardEntry("1", "player1", 1000),
				generateMockLeaderboardEntry("2", "player2", 500),
			];

			mockListByScore.mockResolvedValueOnce({
				data: mockEntries,
				errors: null,
			});

			// Mock user being in directors group
			(Auth.fetchAuthSession as jest.Mock).mockResolvedValueOnce({
				tokens: {
					accessToken: {
						payload: {
							"cognito:groups": ["directors"],
						},
					},
				},
			});

			const result = await get_leaderboard();

			// Verify results
			expect(result).toEqual(mockEntries);
			expect(mockListByScore).toHaveBeenCalledWith(
				{ year: 2024 },
				{
					limit: 50,
					sortDirection: "DESC",
					authMode: "userPool", // Director uses userPool
				},
			);
		});

		it("should return empty array when API returns errors", async () => {
			// Mock API error
			mockListByScore.mockResolvedValueOnce({
				data: null,
				errors: [{ message: "API Error" }],
			});

			// Mock console.error to verify it was called
			const originalConsoleError = console.error;
			const mockConsoleError = jest.fn();
			console.error = mockConsoleError;

			const result = await get_leaderboard();

			// Verify error handling
			expect(result).toEqual([]);
			expect(mockConsoleError).toHaveBeenCalled();
			// Check that something was logged without specifying the exact message

			// Restore console.error
			console.error = originalConsoleError;
		});

		it("should handle authentication errors gracefully", async () => {
			// Mock authentication error
			(Auth.fetchAuthSession as jest.Mock).mockRejectedValueOnce(new Error("Auth error"));

			// Mock the subsequent call to ensure we don't have a null pointer exception
			mockListByScore.mockResolvedValueOnce({
				data: [],
				errors: null,
			});

			// Mock console.error
			const originalConsoleError = console.error;
			const mockConsoleError = jest.fn();
			console.error = mockConsoleError;

			const result = await get_leaderboard();

			// Verify error handling
			expect(result).toEqual([]);
			// Verify that console.error was called (with any arguments)
			expect(mockConsoleError).toHaveBeenCalled();

			// Restore console.error
			console.error = originalConsoleError;
		});
	});

	describe("create_leaderboard_entry", () => {
		it("should reject usernames with profanity", async () => {
			const result = await create_leaderboard_entry({
				username: "userbadword",
				score: 1000,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Usernames must be alphanumeric and less than 20 characters");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should reject usernames longer than 20 characters", async () => {
			const result = await create_leaderboard_entry({
				username: "thisusernameiswaytoolongforthelimit",
				score: 1000,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Usernames must be alphanumeric and less than 20 characters");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should reject usernames with non-alphanumeric characters", async () => {
			const result = await create_leaderboard_entry({
				username: "user@name!",
				score: 1000,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Usernames must be alphanumeric and less than 20 characters");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should reject negative scores", async () => {
			const result = await create_leaderboard_entry({
				username: "validuser",
				score: -100,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Invalid score");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should reject scores over 200000", async () => {
			const result = await create_leaderboard_entry({
				username: "validuser",
				score: 250000,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Invalid score");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should reject non-integer scores", async () => {
			const result = await create_leaderboard_entry({
				username: "validuser",
				score: 1000.5,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Invalid score");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should reject scores that aren't multiples of 2", async () => {
			const result = await create_leaderboard_entry({
				username: "validuser",
				score: 1001,
			});

			// Verify rejection
			expect(result.status).toBe(401);
			expect(result.message).toContain("Invalid score");
			expect(mockCreate).not.toHaveBeenCalled();
		});

		it("should successfully create valid entries", async () => {
			// Mock successful create
			mockCreate.mockResolvedValueOnce({
				data: {
					id: "new-entry-id",
					username: "validuser",
					score: 1000,
					year: 2024,
				},
				errors: null,
			});

			const result = await create_leaderboard_entry({
				username: "validuser",
				score: 1000,
			});

			// Verify success
			expect(result.status).toBe(200);
			expect(result.message).toBe("Success");
			expect(mockCreate).toHaveBeenCalledWith(
				{
					username: "validuser",
					score: 1000,
					year: expect.any(Number),
				},
				{
					authMode: "identityPool",
				},
			);
		});

		it("should handle API errors during creation", async () => {
			// Mock API error
			mockCreate.mockResolvedValueOnce({
				data: null,
				errors: [{ message: "Database error" }],
			});

			// Mock console.error
			const originalConsoleError = console.error;
			const mockConsoleError = jest.fn();
			console.error = mockConsoleError;

			const result = await create_leaderboard_entry({
				username: "validuser",
				score: 1000,
			});

			// Verify error handling
			expect(result.status).toBe(500);
			expect(result.message).toContain("Failed to create leaderboard entry");
			expect(mockConsoleError).toHaveBeenCalled();

			// Restore console.error
			console.error = originalConsoleError;
		});
	});

	describe("fetchEvents", () => {
		it("should fetch events for regular users", async () => {
			// Setup mock response with three visible events
			const mockEventData = [generateMockEvent("1", true), generateMockEvent("2", true), generateMockEvent("3", true)];

			mockList.mockResolvedValueOnce({
				data: mockEventData,
				errors: null,
			});

			// Mock user not being in directors group
			(Auth.fetchAuthSession as jest.Mock).mockResolvedValueOnce({
				tokens: {
					accessToken: {
						payload: {},
					},
				},
			});

			const result = await fetchEvents();

			// Update expected number of events
			expect(result.status).toBe(200);
			expect(result.message).toBe("Success");
			expect(result.events.length).toBe(3); // Expect all three events
		});

		it("should fetch events for directors", async () => {
			// Setup mock response with three visible events
			const mockEventData = [generateMockEvent("1", true), generateMockEvent("2", true), generateMockEvent("3", true)];

			mockList.mockResolvedValueOnce({
				data: mockEventData,
				errors: null,
			});

			// Mock user being in directors group
			(Auth.fetchAuthSession as jest.Mock).mockResolvedValueOnce({
				tokens: {
					accessToken: {
						payload: {
							"cognito:groups": ["directors"],
						},
					},
				},
			});

			const result = await fetchEvents();

			// Update expected number of events
			expect(result.status).toBe(200);
			expect(result.message).toBe("Success");
			expect(result.events.length).toBe(3); // Expect all three events
		});

		it("should handle API errors when fetching events", async () => {
			// Mock API error
			mockList.mockResolvedValueOnce({
				data: null,
				errors: [{ message: "API Error" }],
			});

			// Mock console.error
			const originalConsoleError = console.error;
			const mockConsoleError = jest.fn();
			console.error = mockConsoleError;

			const result = await fetchEvents();

			// Verify error handling
			expect(result.status).toBe(500);
			expect(result.message).toBe("Failed to fetch events.");
			expect(result.events).toEqual([]);
			expect(mockConsoleError).toHaveBeenCalled();

			// Restore console.error
			console.error = originalConsoleError;
		});

		it("should handle authentication errors when fetching events", async () => {
			// Mock authentication error
			(Auth.fetchAuthSession as jest.Mock).mockRejectedValueOnce(new Error("Auth error"));

			// Mock console.error
			const originalConsoleError = console.error;
			const mockConsoleError = jest.fn();
			console.error = mockConsoleError;

			// Mock successful list to test auth error specifically
			mockList.mockResolvedValueOnce({
				data: [generateMockEvent("1")],
				errors: null,
			});

			const result = await fetchEvents();

			// Verify error handling for auth error only
			expect(result.status).toBe(200); // Still 200 because List succeeds
			expect(result.events.length).toBe(1);
			expect(mockConsoleError).toHaveBeenCalled();
			expect(mockList).toHaveBeenCalledWith({
				authMode: "identityPool", // Default to identityPool on auth error
				limit: 200,
				filter: {
					visible: { eq: true },
				},
			});

			// Restore console.error
			console.error = originalConsoleError;
		});
	});
});
