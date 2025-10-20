import { NextResponse } from "next/server";
import { connectDB } from "../mongodb";
import Schedule from "./schedule";
//import schedule from "./schedule";

const EVENT_TYPES = ["ceremony", "workshop", "food", "fireside chat", "mentoring", "event"] as const;

function parseBody(json: any) {
  const errors: string[] = [];

  const str = (v: any) => (typeof v === "string" ? v.trim() : "");
  const bool = (v: any) => (typeof v === "boolean" ? v : v === "true");
  const num = (v: any) => (typeof v === "number" ? v : Number(v));

  const name = str(json.name);
  const location = str(json.location);
  const host = str(json.host ?? "");
  console.log("host is " + host)
  console.log(json)
  const description = str(json.description ?? "");
  const event_created_by = str(json.event_created_by);

  const start_time = new Date(json.start_time);
  const end_time = new Date(json.end_time);

  const column = num(json.column);
  const discord_auto_announce = bool(json.discord_auto_announce);

  const event_type = str(json.event_type);

  if (!name) errors.push("name");
  if (!location) errors.push("location");
  //if (!host) errors.push("host");
  if (!event_created_by) errors.push("event_created_by");
  if (!(start_time instanceof Date) || isNaN(start_time.getTime())) errors.push("start_time");
  if (!(end_time instanceof Date) || isNaN(end_time.getTime())) errors.push("end_time");
  if (start_time && end_time && start_time > end_time) errors.push("start_time <= end_time");
  if (![1, 2, 3, 4].includes(column)) errors.push("column (1-4)");
  if (!EVENT_TYPES.includes(event_type as any)) errors.push("event_type");

  return {
    ok: errors.length === 0,
    errors,
    doc: {
      name,
      location,
      host,
      description,
      event_created_by,
      start_time,
      end_time,
      column,
      discord_auto_announce,
      event_type,
    },
  };
}

export async function GET() {
  try {
    await connectDB();
    const items = await Schedule.find().sort({ start_time: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    console.error("Error fetching schedule:", err);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = parseBody(body);

    console.log("WE GOT HERE")
    console.log(parsed)

    if (!parsed.ok) {
      return NextResponse.json(
        { error: "Invalid/missing fields", fields: parsed.errors },
        { status: 400 }
      );
    }

    const created = await Schedule.create(parsed.doc);
    return NextResponse.json(created.toObject(), { status: 201 });
  } catch (err) {
    console.error("Error creating schedule:", err);
    return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
  }
}
