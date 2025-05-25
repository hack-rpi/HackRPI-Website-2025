import dotenv from "dotenv";
dotenv.config({ path: "config.env" }); // Specify the new filename

import { NextResponse } from "next/server";
import mongoose from "mongoose";
//import MONGO_URI from "process.env.MONGO_URI";

// Use environment variables for MongoDB connection
const MONGO_URI: string | undefined = process.env["MONGO_URI"];

if (typeof MONGO_URI === "undefined") {
	console.error("❌ MONGO_URI is undefined. Check your .env.local file.");
} else {
	console.log("✅ MONGO_URI loaded:", MONGO_URI);
}

// Define Schema & Model
const announcementSchema = new mongoose.Schema({
	title: String,
	time: { type: Date, default: Date.now },
	message: String,
	links: String,
	name: String,
});

const Announcement = mongoose.models.Announcement || mongoose.model("announcements", announcementSchema);

// Connect to MongoDB
async function connectDB() {
	if (mongoose.connection.readyState === 1) return;
	try {
		if (!MONGO_URI) {
			throw new Error("❌ MONGO_URI is not defined! Check your config.env file.");
		}
		await mongoose.connect(MONGO_URI, {
			dbName: "stored_announcements",
		});
		console.log("✅ Successfully connected to MongoDB.");
	} catch (error) {
		console.error("❌ MongoDB Connection Error:", error);
	}
}

// Fetch announcements
export async function GET() {
	try {
		await connectDB();
		const announcements = await Announcement.find().sort({ time: -1 });
		console.log("Announcements from DB:", announcements);
		return NextResponse.json(announcements);
	} catch (error) {
		console.error("❌ Error fetching announcements:", error);
		return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		//alert("Trying to post");
		await connectDB();
		alert("Connected");
		const body = await req.json();
		const { title, message, links, name } = body;
		const duplicate = await Announcement.find({ title: title });
		if (!duplicate) {
			const announcementToInsert = new Announcement({
				title: title,
				message: message,
				links: links,
				name: name,
			});
			const saved = await announcementToInsert.save();
			console.log("New announcement Added");
		}
	} catch (error) {
		console.log("Error adding new announcement");
	}
}
