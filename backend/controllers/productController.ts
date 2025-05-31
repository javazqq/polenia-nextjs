import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db';

// GET All Products
export const getProducts = async (_req: Request, res: Response) => {
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

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// GET Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Product not found' });
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
    };

    res.json(formattedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// CREATE Product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, image, countInStock } = req.body;

  if (!name || !price || !countInStock) {
    res.status(400).json({ message: 'Name, price, and stock count are required' });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, image, count_in_stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, price, image, countInStock]
    );

    const product = result.rows[0];
    res.status(201).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// UPDATE Product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, image, countInStock } = req.body;

  // Check if at least one field is provided
  if (!name && !description && price === undefined && !image && countInStock === undefined) {
    return res.status(400).json({ message: 'At least one field is required for update' });
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

    values.push(id); // Add ID as the last parameter
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = result.rows[0];
    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      countInStock: Number(product.count_in_stock),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};


// DELETE Product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
