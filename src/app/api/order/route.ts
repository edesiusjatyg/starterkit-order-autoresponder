import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Data received:', data);

    return NextResponse.json({ message: 'Data received successfully', data }, { status: 200 });
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}