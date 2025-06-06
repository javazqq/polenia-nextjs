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
    const { cartItems, userEmail } = req.body;

    const items = cartItems.map((item: any) => ({
      title: item.name || 'Item sin nombre',
      quantity: item.quantity > 0 ? item.quantity : 1,
      unit_price: item.price > 0 ? item.price : 1,
      currency_id: 'MXN',
    }));

    const preferenceData = {
      items,
      payer: {
        email: userEmail || 'guest@test.com',
      },
      back_urls: {
        success: `${process.env.APP_URL}/payment/success`,
        failure: `${process.env.APP_URL}/payment/failure`,
        pending: `${process.env.APP_URL}/payment/pending`,
      },
      // Puedes probar comentar auto_return si da error
       auto_return: 'approved',
      notification_url: `${process.env.API_URL}/api/payment/webhook`,
    };

    // Crear la preferencia
    const response = await preference.create({ body: preferenceData });

    // DEBUG: mira qué recibes
    console.log('Respuesta de preferencia:', response);

    // Extraer el id de la preferencia
    const preferenceId = response.id;

    if (!preferenceId) {
      throw new Error('No se pudo obtener el ID de la preferencia');
    }

    res.json({ id: preferenceId });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
};