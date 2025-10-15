
import { NextResponse } from 'next/server';
import { dummyShoes } from '@/lib/data';

export async function GET() {
  // In a real application, you would fetch this data from a database
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));
    return NextResponse.json(dummyShoes);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ message: 'Failed to load products' }, { status: 500 });
  }
}
