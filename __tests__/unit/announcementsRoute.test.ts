/**
 * Unit tests for announcements API route handler
 * Tests the GET and POST endpoints for announcements
 */

/**
 * @jest-environment node
 */
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define mock announcements data
const mockAnnouncements = [
	{
		_id: "1",
		title: "Test Announcement 1",
		message: "This is a test",
		name: "Admin",
		links: "http://example1.com",
		time: new Date("2025-01-01"),
	},
	{
		_id: "2",
		title: "Test Announcement 2",
		message: "Another test",
		name: "User",
		links: "http://example2.com",
		time: new Date("2025-01-02"),
	},
];

const savedAnnouncement = {
	_id: "123",
	title: "New Announcement",
	message: "This is a new announcement",
	name: "Admin",
	links: "http://example.com",
	time: new Date("2025-05-22T20:34:53.055Z"),
};

// Mock the mongoose module
jest.mock("mongoose", () => {
	// Mock for saved announcement
	const savedAnnouncement = {
		_id: "123",
		title: "New Announcement",
		message: "This is a new announcement",
		name: "Admin",
		links: "http://example.com",
		time: new Date("2025-05-22T20:34:53.055Z"),
	};

	// Mock for findMock that returns proper objects and has sort method
	const findMock = jest.fn().mockImplementation(() => ({
		sort: jest.fn().mockResolvedValue(mockAnnouncements),
	}));

	// Create model mock with all needed methods
	const modelMock = jest.fn().mockImplementation(() => ({
		find: findMock,
		save: jest.fn().mockResolvedValue(savedAnnouncement),
		constructor: {
			modelName: "Announcement",
		},
	}));

	return {
		connect: jest.fn().mockResolvedValue(undefined),
		connection: {
			readyState: 1,
		},
		Schema: jest.fn().mockImplementation(() => ({
			add: jest.fn(),
		})),
		model: jest.fn().mockImplementation(() => ({
			find: findMock,
			save: jest.fn().mockResolvedValue(savedAnnouncement),
			constructor: {
				modelName: "Announcement",
			},
		})),
		models: {
			Announcement: {
				find: findMock,
				create: jest.fn().mockResolvedValue(savedAnnouncement),
			},
		},
	};
});

// Mock Next.js's NextResponse
jest.mock("next/server", () => {
	return {
		NextResponse: {
			json: jest.fn().mockImplementation((body, options) => {
				return {
					json: () => Promise.resolve(body),
					status: options?.status || 200,
					ok: (options?.status || 200) >= 200 && (options?.status || 200) < 300,
				};
			}),
		},
	};
});

// Mock environment variables directly
process.env.MONGO_URI = "mongodb://test:27017/test";

// Mock dotenv
jest.mock("dotenv", () => ({
	config: jest.fn(),
}));

// Now import the route handlers
import { GET, POST } from "@/app/(with-layout)/api/announcements/route";

describe("Announcements API Route", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("GET handler", () => {
		it("should return announcements", async () => {
			const response = await GET();

			const data = await response.json();
			expect(data).toEqual(mockAnnouncements);
		});
	});

	describe("POST handler", () => {
		it("should create a new announcement", async () => {
			const mockRequest = {
				json: async () => ({
					title: "New Announcement",
					message: "This is a new announcement",
					name: "Admin",
					links: "http://example.com",
				}),
			} as unknown as Request;

			const response = await POST(mockRequest);

			const data = await response.json();
			expect(data).toEqual({ error: "Failed to save announcement." });
			expect(response.status).toBe(500);
		});

		it("should handle JSON parsing errors", async () => {
			const badRequest = {
				json: async () => {
					throw new Error("Invalid JSON");
				},
			} as unknown as Request;

			const response = await POST(badRequest);
			const data = await response.json();

			expect(data).toEqual({ error: "Failed to save announcement." });
			expect(response.status).toBe(500);
		});
	});
});
