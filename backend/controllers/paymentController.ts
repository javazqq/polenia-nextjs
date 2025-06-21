import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// Configuración del cliente
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// Crear instancia de Preference
const preference = new Preference(client);
const payment = new Payment(client);

export const createPreference = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { cartItems, userName, userEmail, orderId, shipping_price } =
      req.body;

    const payerName = user ? user.name : userName || "Guest";
    const payerEmail = user ? user.email : userEmail || "guest@test.com";

    const items = cartItems.map((item: any) => ({
      title: item.name || "Item sin nombre",
      quantity: item.quantity > 0 ? item.quantity : 1,
      unit_price: item.price > 0 ? item.price : 1,
      currency_id: "MXN",
    }));

    // Agregar el costo de envío como un ítem si existe
    if (shipping_price && !isNaN(Number(shipping_price))) {
      items.push({
        title: "Envío",
        quantity: 1,
        unit_price: Number(shipping_price),
        currency_id: "MXN",
      });
    }

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
      auto_return: "approved",
      notification_url: `${process.env.API_URL}/api/payment/webhook`,
      external_reference: orderId,
    };

    const response = await preference.create({ body: preferenceData });

    console.log("Respuesta de preferencia:", response);

    const preferenceId = response.id;
    const checkoutUrl =
      process.env.NODE_ENV === "production"
        ? response.init_point
        : response.init_point;

    if (!preferenceId || !checkoutUrl) {
      throw new Error("No se pudo obtener la preferencia completa");
    }

    // Return both the preference ID and the checkout URL
    res.json({
      id: preferenceId,
      checkoutUrl: checkoutUrl,
    });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: "No se pudo crear la preferencia de pago" });
  }
};

// export const processPayment = async (req: Request, res: Response) => {
//   try {
//     if (req.body.orderId) {
//       req.body.external_reference = req.body.orderId;
//       delete req.body.orderId;
//     }
//     const idempotencyKey = uuidv4();
//     const result = await payment.create({
//   body: req.body,
//   requestOptions: {
//     idempotencyKey: idempotencyKey,
//   },
// });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al procesar el pago' });
//   }
// };
