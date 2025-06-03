import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM products');

    const products = result.rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
    }));

    return NextResponse.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}
