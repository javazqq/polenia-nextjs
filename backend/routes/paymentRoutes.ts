import { Request, Response, Router } from 'express';
import { createPreference } from '../controllers/paymentController';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const router = Router();

// Configurar cliente MP
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const payment = new Payment(client);

router.post('/create-preference', createPreference);

router.post('/webhook', async (req: Request, res: Response) => {
  const body = req.body;

  console.log('Webhook recibido:', body);

  if (body.type === 'payment') {
    try {
      const paymentInfo = await payment.get({ id: body.data.id });

      if (paymentInfo.status === 'approved') {
        console.log('✅ Pago aprobado:', paymentInfo);
        // TODO: guardar en tu base de datos con modelo de orden
      }
    } catch (error) {
      console.error('Error consultando el pago:', error);
    }
  }

  res.sendStatus(200);
});

export default router;