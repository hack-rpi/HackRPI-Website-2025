import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const keys = Object.keys(process.env).sort();
  const interesting = keys.filter(k => /MONGO|NEXT|NODE|AWS/i.test(k));
  const lengths: Record<string, number> = {};
  for (const k of interesting) {
    const v = process.env[k];
    if (v) lengths[k] = v.length; else lengths[k] = 0;
  }
  return NextResponse.json({
    keyCount: keys.length,
    interestingKeys: interesting,
    lengths,
    timestamp: new Date().toISOString()
  });
}
