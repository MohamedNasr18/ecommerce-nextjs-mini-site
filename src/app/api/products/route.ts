import { NextRequest, NextResponse } from 'next/server';
import products from '../../../../data/products.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const filtered = category
    ? products.filter(p => p.category === category)
    : products;

  return NextResponse.json(filtered);
}