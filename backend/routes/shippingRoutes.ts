import express, { Request, Response } from "express";
import fetch from "node-fetch";
import {
  createShipping,
  getShippingByOrderId,
  updateShipping,
} from "../controllers/shippingController";
import { getBearerToken } from "../utils/skydropxAuth";

const router = express.Router();

// @ts-expect-error async handler is valid for Express
router.post("/quote", async (req: Request, res: Response) => {
  try {
    console.log("Datos recibidos para cotización:", req.body); // <-- LOG
    const token = await getBearerToken();
    const apiUrl = "https://sb-pro.skydropx.com/api/v1/quotations";
    console.log("Usando endpoint:", apiUrl);
    console.log("Bearer token:", token);
    // Paso 1: POST para crear la cotización
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    });
    const postData = await response.json();
    console.log("Respuesta POST:", postData);
    if (!postData.id) {
      return res
        .status(400)
        .json({ error: "No se pudo crear la cotización", details: postData });
    }
    // Paso 2: Polling para obtener la cotización final
    let attempts = 0;
    let finalData = postData;

    // Polling hasta que tengamos cotizaciones exitosas o se complete
    while (attempts < 15) {
      // Aumentar intentos
      // Si no está completado O no tenemos cotizaciones exitosas, seguir polling
      const hasSuccessfulRates = finalData.rates?.some(
        (rate: any) =>
          rate.success === true ||
          (rate.total &&
            rate.total !== null &&
            rate.status === "price_found_internal")
      );

      if (finalData.is_completed && hasSuccessfulRates) {
        console.log("Cotización completada con éxito encontrada");
        break;
      }

      await new Promise((r) => setTimeout(r, 2000)); // Espera 2 segundos
      const getUrl = `https://sb-pro.skydropx.com/api/v1/quotations/${postData.id}`;
      console.log(`Intento ${attempts + 1}: GET ${getUrl}`);
      const getResponse = await fetch(getUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      finalData = await getResponse.json();
      //console.log("Respuesta GET:", finalData);
      attempts++;
    }
    res.json(finalData);
  } catch (err) {
    console.error("Error al cotizar envío:", err); // <-- LOG
    res.status(500).json({
      error: "Error al cotizar envío",
      details: err instanceof Error ? err.message : err,
    });
  }
});

router.get("/skydropx-shipments/:id", async (req: Request, res: Response) => {
  try {
    const token = await getBearerToken();
    const shipmentId = req.params.id;
    const apiUrl = `https://sb-pro.skydropx.com/api/v1/shipments/${shipmentId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      res.json(data);
    } else {
      res
        .status(response.status)
        .json({ error: "Error fetching Skydropx shipment", details: data });
    }
  } catch (err) {
    res.status(500).json({
      error: "Error fetching Skydropx shipment",
      details: err instanceof Error ? err.message : err,
    });
  }
});

// Obtener la orden de Skydropx usando el order_id interno de tu sistema
// @ts-expect-error async handler is valid for Express
router.get("/skydropx-shipments/by-order/:orderId", async (req: Request, res: Response) => {
    try {
      // 1. Buscar el registro de shipping por order_id
      const { orderId } = req.params;
      const pool = require("../config/db").default || require("../config/db");
      const shippingResult = await pool.query(
        "SELECT skydropx_order_id, skydropx_tracking_number FROM shipping WHERE order_id = $1",
        [orderId]
      );
      if (
        !shippingResult.rows.length ||
        !shippingResult.rows[0].skydropx_order_id
      ) {
        return res
          .status(404)
          .json({ error: "No Skydropx order found for this orderId" });
      }
      const shippingId = shippingResult.rows[0].id;
      const skydropxShipmentId = shippingResult.rows[0].skydropx_order_id;
      // 2. Consultar la orden en Skydropx
      const token = await getBearerToken();
      const apiUrl = `https://sb-pro.skydropx.com/api/v1/shipments/${skydropxShipmentId}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

          // Si ya hay tracking number y no está guardado, actualizarlo en la base de datos
      const trackingNumber = data.data?.attributes?.master_tracking_number;
      if (trackingNumber && !shippingResult.rows[0].skydropx_tracking_number) {
      await pool.query(
        "UPDATE shipping SET skydropx_tracking_number = $1 WHERE id = $2",
        [trackingNumber, shippingId]
        );
      }

      if (response.ok) {
        res.json(data);
      } else {
        res
          .status(response.status)
          .json({ error: "Error fetching Skydropx order", details: data });
      }
    } catch (err) {
      res.status(500).json({
        error: "Error fetching Skydropx order by orderId",
        details: err instanceof Error ? err.message : err,
      });
    }
  }
);

// Create a new shipping record
router.post("/", createShipping);

// Get shipping info by order_id
router.get("/:orderId", getShippingByOrderId);

// Update shipping record (e.g., after creating Skydropx order)
router.put("/:id", updateShipping);

export default router;
