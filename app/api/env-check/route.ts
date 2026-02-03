import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const mongoUri = process.env.MONGO_URI;
  
  return NextResponse.json({
    hasMongoUri: !!mongoUri,
    length: mongoUri ? mongoUri.length : 0,
    // Add other env vars you want to verify (without exposing values)
    nodeEnv: process.env.NODE_ENV || 'not set',
    timestamp: new Date().toISOString()
  });
}
