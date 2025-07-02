import { Request, Response, Router } from "express";
import { createPreference, processPayment } from "../controllers/paymentController";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { validateMPWebhookSignature } from "../utils/webhookValidation";
import { protectOptional } from "../middleware/authMiddleware";
import pool from "../config/db";
import { getBearerToken } from "../utils/skydropxAuth";

const router = Router();

// Configurar cliente MP
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
const payment = new Payment(client);

router.post("/create-preference", protectOptional, createPreference);

router.post('/process_payment', processPayment);

router.post("/webhook", async (req: Request, res: Response) => {
  const secret = process.env.MP_WEBHOOK_SECRET!;
  // if (!validateMPWebhookSignature(req, secret)) {
  //   console.log("❌ HMAC verification failed");
  //   return;
  // }
  // console.log("✅ HMAC verification passed");

  const body = req.body;
  if (body.type === "payment") {
    try {
      const paymentInfo = await payment.get({ id: body.data.id });
      if (paymentInfo.status === "approved") {
        const orderId = paymentInfo.external_reference;
        if (!orderId) {
          console.log("No orderId in external_reference");
        }
        // Check if order is already paid
        const orderResult = await pool.query(
          "SELECT status FROM orders WHERE id = $1",
          [orderId]
        );
        if (orderResult.rows.length === 0) {
          console.log("Order not found");
        }
        if (orderResult.rows[0].status === "paid") {
          console.log("Order paid");
        }
        // Update order status and stock
        await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
          "paid",
          orderId,
        ]);
        const itemsResult = await pool.query(
          "SELECT product_id, quantity FROM order_items WHERE order_id = $1",
          [orderId]
        );
        for (const item of itemsResult.rows) {
          await pool.query(
            "UPDATE products SET count_in_stock = count_in_stock - $1 WHERE id = $2",
            [item.quantity, item.product_id]
          );
        }
        console.log("Order updated and stock adjusted");
        console.log("Now creating Skydropx shipment");

        // --- Crear envio en Skydropx ---
        // Busca el registro de shipping relacionado al envio
        const shippingResult = await pool.query(
          "SELECT * FROM shipping WHERE order_id = $1",
          [orderId]
        );
        const shipping = shippingResult.rows[0];
        console.log(
          "Raw shipping data from DB:",
          JSON.stringify(shipping, null, 2)
        );

        if (
          shipping &&
          shipping.shipping_quotation_id &&
          shipping.shipping_rate_id
        ) {
          // Consigue tu Bearer Token usando la función reutilizable
          const bearerToken = await getBearerToken();

          // --- Construir el cuerpo de la orden Skydropx con la estructura requerida ---
          // NOTA: Debes mapear los datos reales de tu base de datos a estos campos
          // Parse address_to and pick only the required fields
          let addressTo = shipping.address_to;
          try {
            if (typeof addressTo === "string")
              addressTo = JSON.parse(addressTo);
          } catch (e) {
            console.error("Error parsing address_to:", e);
            addressTo = {};
          }
          const filteredAddressTo = {
            street1: addressTo.street1 || "",
            name: addressTo.name || "",
            company: addressTo.company || "N/A",
            phone: addressTo.phone || "",
            email: addressTo.email || "",
            reference: addressTo.reference || "",
          };

          let parcelInfo = shipping.parcels; // Cambiado de 'parcel' a 'parcels'
          console.log("Raw parcel info from DB:", parcelInfo);
          console.log("Type of parcel info:", typeof parcelInfo);

          try {
            if (typeof parcelInfo === "string" && parcelInfo.trim() !== "") {
              parcelInfo = JSON.parse(parcelInfo);
              console.log(
                "Parsed parcel info:",
                JSON.stringify(parcelInfo, null, 2)
              );
            }
          } catch (e) {
            console.error("Error parsing parcel:", e);
            parcelInfo = undefined;
          }

          // Si parcelInfo es un arreglo, úsalo directamente; si es un objeto, mételo en un arreglo; si no existe, usa arreglo vacío
          let packages: any[] = [];
          if (Array.isArray(parcelInfo)) {
            packages = parcelInfo;
            console.log("Using parcel as array, length:", packages.length);
          } else if (parcelInfo && typeof parcelInfo === "object") {
            packages = [parcelInfo];
            console.log("Converting single parcel to array");
          } else {
            packages = [];
            console.log("No valid parcel info, using empty array");
          }

          console.log(
            "Packages before mapping:",
            JSON.stringify(packages, null, 2)
          );

          // Mapear campos y agregar defaults
          packages = packages.map((p) => ({
            package_number: p.package_number || "1",
            package_protected: p.package_protected ?? true,
            declared_value: p.declared_value || 2500,
            consignment_note: p.consignment_note || "50202300",
            package_type: p.package_type || "4G",
            length: p.length,
            width: p.width,
            height: p.height,
            weight: p.weight,
          }));

          // Si no hay paquetes válidos, crear uno por defecto
          if (packages.length === 0) {
            packages = [
              {
                package_number: "1",
                package_protected: true,
                declared_value: 2500,
                consignment_note: "50202300",
                package_type: "4G",
                length: 10,
                width: 10,
                height: 10,
                weight: 1,
              },
            ];
          }

          const skydropxOrderBody = {
            shipment: {
              rate_id: shipping.shipping_rate_id || "",
              printing_format: "standard", // Cambiado de "pdf" a "zpl"
              address_from: shipping.address_from || {},
              address_to: filteredAddressTo,
              packages,
            },
          };
          // Log the body of the request to create the shipment in Skydropx
          console.log(
            "Skydropx shipment request body:",
            JSON.stringify(skydropxOrderBody, null, 2)
          );
          const skydropxRes = await fetch(
            "https://sb-pro.skydropx.com/api/v1/shipments/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
              },
              body: JSON.stringify(skydropxOrderBody),
            }
          );
          const skydropxData = await skydropxRes.json();
          console.log("Skydropx:", skydropxData);

          // Guarda el id y tracking de Skydropx en tu tabla shipping
          await pool.query(
            "UPDATE shipping SET skydropx_order_id = $1, skydropx_tracking_number = $2, status = $3 WHERE id = $4",
            [
              skydropxData.data.id || null,
              skydropxData.data?.attributes?.master_tracking_number || null,
              "created",
              shipping.id,
            ]
          );
        } else {
          console.log("No hay datos de cotización de envío para esta orden");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  res.sendStatus(200);
});

export default router;
