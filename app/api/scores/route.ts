// app/api/scores/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Score } from '@/app/models/Score'; // Adjust the import path if necessary

const DB_URI = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // already connected
    }
    await mongoose.connect(DB_URI!, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Handle POST request to save a score
export async function POST(req: Request) {
  await connectToDatabase(); // Ensure DB is connected

  try {
    const { name, score } = await req.json(); // Get data from the request body

    // Create a new score document
    const newScore = new Score({ name, score });
    await newScore.save();

    return NextResponse.json({
      message: 'Score saved successfully!',
      score: newScore,
    });
  } catch (err) {
    console.error('Error saving score:', err);
    return NextResponse.json(
      { error: 'Failed to save the score' },
      { status: 500 }
    );
  }
}

// Handle GET request to fetch all scores
export async function GET(req: Request) {
  await connectToDatabase();

  try {
    const scores = await Score.find();
    return NextResponse.json(scores);
  } catch (err) {
    console.error('Error retrieving scores:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve scores' },
      { status: 500 }
    );
  }
}
