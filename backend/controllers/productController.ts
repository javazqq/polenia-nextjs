import { Request, Response } from 'express';
import pool from '../config/db';

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