/*import { NextResponse } from "next/server";
import { connectDB } from "../mongodb";


export async function GET() {
  try {
    await connectDB();
    const announcements = await Announcement.find().sort({ time: -1 });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("❌ Error fetching announcements:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, message, links, name } = await req.json();
    if (!title || !message || !name) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    await connectDB();
    const saved = await Announcement.create({ title, message, links, name, time: new Date() });
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving announcement:", error);
    return NextResponse.json({ error: "Failed to save announcement." }, { status: 500 });
  }
}
*/