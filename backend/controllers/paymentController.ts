import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Request, Response } from 'express';

// Configuración del cliente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

// Crear instancia de Preference
const preference = new Preference(client);

export const createPreference = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { cartItems,  userName, userEmail, orderId } = req.body;

    const payerName = user ? user.name : userName || 'Guest';
    const payerEmail = user ? user.email : userEmail || 'guest@test.com';

    const items = cartItems.map((item: any) => ({
      title: item.name || 'Item sin nombre',
      quantity: item.quantity > 0 ? item.quantity : 1,
      unit_price: item.price > 0 ? item.price : 1,
      currency_id: 'MXN',
    }));

    const preferenceData = {
      items,
      payer: {
        name: payerName,
        email: payerEmail,
      },
      back_urls: {
        success: `https://gjvvhm5d-3000.usw3.devtunnels.ms/payment/success?orderId=${orderId}`,
        failure: `${process.env.APP_URL}/payment/failure`,
        pending: `${process.env.APP_URL}/payment/pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.API_URL}/api/payment/webhook`,
      external_reference: orderId,
    };

    const response = await preference.create({ body: preferenceData });

    console.log('Respuesta de preferencia:', response);

    const preferenceId = response.id;
    const checkoutUrl = response.init_point;

    if (!preferenceId || !checkoutUrl) {
      throw new Error('No se pudo obtener la preferencia completa');
    }

    // Return both the preference ID and the checkout URL
    res.json({ 
      id: preferenceId,
      checkoutUrl: checkoutUrl 
    });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
};