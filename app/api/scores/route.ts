// app/api/scores/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Score } from '@/app/models/Score';

// Ensure Node.js runtime (not Edge) so we can use Mongoose
export const runtime = 'nodejs';
// Force dynamic to prevent aggressive caching
export const dynamic = 'force-dynamic';

// Reuse a cached connection across hot reloads / lambda invocations to avoid creating many sockets.
declare global {
  // eslint-disable-next-line no-var
  var __MONGO_READY: Promise<typeof mongoose> | undefined;
}

async function connectToDatabase(uri: string) {
  if (mongoose.connection.readyState === 1) return; // already connected
  if (!global.__MONGO_READY) {
    global.__MONGO_READY = mongoose.connect(uri).catch((err) => {
      // Reset so future calls can retry
      global.__MONGO_READY = undefined;
      throw err;
    });
  }
  await global.__MONGO_READY;
}

// Handle POST request to save a score
export async function POST(req: Request) {
  const DB_URI = process.env.MONGO_URI; // read at request time to avoid build-time inlining issues
  console.log('POST /api/scores - MONGO_URI present:', !!DB_URI, 'length:', DB_URI?.length || 0);
  if (!DB_URI) {
    return NextResponse.json({ error: 'Server not configured (MONGO_URI missing)' }, { status: 503 });
  }
  try {
    const { name, score } = await req.json();
    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 40) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }
    await connectToDatabase(DB_URI);
    const newScore = new Score({ name: name.trim(), score: Math.floor(score) });
    await newScore.save();
    return NextResponse.json({ message: 'Score saved', score: newScore }, { status: 201 });
  } catch (err: any) {
    console.error('Error saving score:', err);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}

// Handle GET request to fetch all scores
export async function GET() {
  const DB_URI = process.env.MONGO_URI; // read at request time
  console.log('GET /api/scores - MONGO_URI present:', !!DB_URI, 'length:', DB_URI?.length || 0);
  if (!DB_URI) {
    return NextResponse.json({ error: 'Server not configured (MONGO_URI missing)' }, { status: 503 });
  }
  try {
    await connectToDatabase(DB_URI);
    const scores = await Score.find().sort({ score: -1 }).limit(100).lean();
    return NextResponse.json(scores);
  } catch (err: any) {
    console.error('Error retrieving scores:', err);
    return NextResponse.json({ error: 'Failed to retrieve scores' }, { status: 500 });
  }
}
