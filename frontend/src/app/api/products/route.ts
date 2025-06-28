import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM products");

    const products = result.rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
    }));

    return NextResponse.json(products);
  } catch (err) {
    console.error("❌ Failed to fetch products:", err);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, countInStock, parcel } = body;

    const result = await pool.query(
      `INSERT INTO products (name, description, price, image, count_in_stock, parcel)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, image, countInStock, parcel]
    );

    const product = result.rows[0];
    return NextResponse.json(
      {
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        countInStock: Number(product.count_in_stock),
        parcel: product.parcel,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Failed to create product:", err);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    console.error("❌ Failed to delete product:", err);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, price, image, countInStock, parcel } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE products
       SET name = $1, description = $2, price = $3, image = $4, count_in_stock = $5, parcel = $6
       WHERE id = $7
       RETURNING *`,
      [name, description, price, image, countInStock, parcel, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const product = result.rows[0];
    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
    });
  } catch (err) {
    console.error("❌ Failed to update product:", err);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}
