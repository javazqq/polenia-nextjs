// /frontend/src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();

    console.log('✅ Connected to PostgreSQL successfully');
    return NextResponse.json({ message: 'Connected to PostgreSQL successfully' });
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL:', error);
    return NextResponse.json({ error: 'Failed to connect to PostgreSQL' }, { status: 500 });
  }
}
