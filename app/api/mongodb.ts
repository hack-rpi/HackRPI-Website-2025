import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({path:"./config.env"});

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
	if (MONGO_URI) {
		const connectDB = mongoose
			.connect(MONGO_URI)
			.then(() => console.log("MongoDB Connected"))
			.catch((err) => console.error("MongoDB Connection error:", err));
	}
}
