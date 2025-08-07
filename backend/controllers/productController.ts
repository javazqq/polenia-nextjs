import { Request, Response, RequestHandler } from "express";
import pool from "../config/db";

// GET All Products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY category, name"
    );

    const products = result.rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
      category: product.category,
    }));

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET Products by Category
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const result = await pool.query(
      "SELECT * FROM products WHERE category = $1 ORDER BY name",
      [category]
    );

    const products = result.rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
      category: product.category,
    }));

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

// GET All Categories (for navigation)
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        category,
        COUNT(*) as product_count,
        MIN(image) as sample_image
      FROM products 
      WHERE category IS NOT NULL 
      GROUP BY category 
      ORDER BY category
    `);

    const categories = result.rows.map((row) => ({
      name: row.category,
      productCount: Number(row.product_count),
      sampleImage: row.sample_image,
      // Create display name from category slug
      displayName: row.category
        ? row.category
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "",
    }));

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// GET Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const product = result.rows[0];
    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
      category: product.category,
    };

    res.json(formattedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// CREATE Product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, image, countInStock, parcel, category } =
    req.body;

  if (!name || !price || !countInStock) {
    res
      .status(400)
      .json({ message: "Name, price, and stock count are required" });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, image, count_in_stock, parcel, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, description, price, image, countInStock, parcel, category]
    );

    const product = result.rows[0];
    res.status(201).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
      category: product.category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// UPDATE Product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, image, countInStock, parcel, category } =
    req.body;

  // Check if at least one field is provided
  if (
    !name &&
    !description &&
    price === undefined &&
    !image &&
    countInStock === undefined &&
    parcel === undefined &&
    !category
  ) {
    return res
      .status(400)
      .json({ message: "At least one field is required for update" });
  }

  try {
    // Build the query dynamically based on provided fields
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (name) {
      fields.push(`name = $${paramIndex}`);
      values.push(name);
      paramIndex++;
    }
    if (description) {
      fields.push(`description = $${paramIndex}`);
      values.push(description);
      paramIndex++;
    }
    if (price !== undefined) {
      fields.push(`price = $${paramIndex}`);
      values.push(price);
      paramIndex++;
    }
    if (image) {
      fields.push(`image = $${paramIndex}`);
      values.push(image);
      paramIndex++;
    }
    if (countInStock !== undefined) {
      fields.push(`count_in_stock = $${paramIndex}`);
      values.push(countInStock);
      paramIndex++;
    }
    if (parcel !== undefined) {
      fields.push(`parcel = $${paramIndex}`);
      values.push(parcel);
      paramIndex++;
    }
    if (category) {
      fields.push(`category = $${paramIndex}`);
      values.push(category);
      paramIndex++;
    }

    values.push(id); // Add ID as the last parameter
    const query = `UPDATE products SET ${fields.join(
      ", "
    )} WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = result.rows[0];
    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
      parcel: product.parcel,
      category: product.category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE Product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
