import { Request, Response, Router } from 'express';
import { createPreference } from '../controllers/paymentController';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { validateMPWebhookSignature } from '../utils/webhookValidation';
import { protectOptional } from '../middleware/authMiddleware';
import pool from '../config/db';

const router = Router();

// Configurar cliente MP
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const payment = new Payment(client);

router.post('/create-preference', protectOptional, createPreference);

router.post('/webhook', async (req: Request, res: Response) => {
  const secret = process.env.MP_WEBHOOK_SECRET!;
  if (!validateMPWebhookSignature(req, secret)) {
    console.log('❌ HMAC verification failed');
    return;
  }
  console.log('✅ HMAC verification passed');

  const body = req.body;
  if (body.type === 'payment') {
    try {
      const paymentInfo = await payment.get({ id: body.data.id });
      if (paymentInfo.status === 'approved') {
        const orderId = paymentInfo.external_reference;
        if (!orderId) {
          console.log('No orderId in external_reference');
        }
        // Check if order is already paid
        const orderResult = await pool.query('SELECT status FROM orders WHERE id = $1', [orderId]);
        if (orderResult.rows.length === 0) {
          console.log('Order not found');
        }
        if (orderResult.rows[0].status === 'paid') {
          console.log('Order paid');
        }
        // Update order status and stock
        await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', orderId]);
        const itemsResult = await pool.query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [orderId]);
        for (const item of itemsResult.rows) {
          await pool.query(
            'UPDATE products SET count_in_stock = count_in_stock - $1 WHERE id = $2',
            [item.quantity, item.product_id]
          );
        }
      }
    } catch (error) {
      console.error('Error consultando el pago:', error);
    }
  }
  res.sendStatus(200);
});

export default router;