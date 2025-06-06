import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    // Add other user properties as needed
  };
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const user = (req as AuthenticatedRequest).user;
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    res.status(400).json({ message: 'Order must contain at least one item' });
    return;
  }

  try {
    const orderId = uuidv4();
    await pool.query('BEGIN');

    await pool.query(
      `INSERT INTO orders (id, user_id, total, status)
       VALUES ($1, $2, $3, $4)`,
      [orderId, user.id, total, 'pending']
    );

    for (const item of items) {
      const productIdInt = typeof item.productId === 'string'
        ? parseInt(item.productId, 10)
        : item.productId;

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, productIdInt, item.quantity, item.price]
      );
    }

    await pool.query('COMMIT');
    res.status(201).json({ message: 'Order created', orderId });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Order creation error:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.user_id,
        o.guest_name,
        o.guest_email,
        o.total,
        o.status,
        o.created_at,
        json_agg(
          json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'name', p.name
          )
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Fetch all orders error:', error);
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};


// Get orders for the current user
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  const user = (req as AuthenticatedRequest).user;

  try {
    const orders = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [user.id]
    );

    res.json(orders.rows);
  } catch (error) {
    console.error('Fetch user orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
// Get order by ID (with items)
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const order = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
    if (order.rows.length === 0) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const items = await pool.query(
      `SELECT oi.*, p.name, p.image FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [id]
    );

    res.json({ ...order.rows[0], items: items.rows });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};
