import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
} from '../controllers/orderController';
import { adminOnly } from '../middleware/adminMiddleware';
import { protect, admin, protectOptional } from '../middleware/authMiddleware';

const router = express.Router();

// Create a new order (Client or Guest, must be logged in)
router.post('/', protectOptional, createOrder);

// Get all orders (Admin only)
router.get('/', protect, admin, getAllOrders);

// Get all orders for the logged-in user
router.get('/my-orders', protect, getUserOrders);

// Get a specific order by ID
router.get('/:id', protect, getOrderById);

export default router;
