import { NextResponse } from "next/server";
import { connectDB } from "../mongodb";
import Cat from "./Cat";

export async function GET() {
  try {
    await connectDB();
    const cats = await Cat.find().sort({ createdAt: -1 });
    return NextResponse.json(cats);
  } catch (error) {
    console.error("Error fetching cats:", error);
    return NextResponse.json({ error: "Failed to fetch cats" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, age, color, isFriendly } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await connectDB();

    //console.log("This is name: " + name);
    //console.log("This is age: " + age);
    //console.log("This is color: " + color);
    //console.log("This is isFriendly: " + isFriendly);

    const cat = await Cat.create({
      name,
      age,
      color,
      isFriendly,
    });

    //console.log("The cat: " + cat + " and also " + JSON.stringify(cat))

    return NextResponse.json(cat, { status: 201 });
  } catch (error) {
    console.error("Error creating cat:", error);
    return NextResponse.json({ error: "Failed to create cat" }, { status: 500 });
  }
}

