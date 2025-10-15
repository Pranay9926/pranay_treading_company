
import { NextResponse } from 'next/server';
import { dummyShoes, Shoe } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const shoe = dummyShoes.find((s: Shoe) => s.id === id);

    if (!shoe) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(shoe);
  } catch (error) {
    console.error(`Failed to fetch product with ID ${params.id}:`, error);
    return NextResponse.json({ message: 'Failed to load product details' }, { status: 500 });
  }
}
