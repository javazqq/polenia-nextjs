import express, { Request, Response } from "express";
import fetch from "node-fetch";

let bearerToken: string | null = null;
let tokenExpiresAt: number | null = null;

const router = express.Router();

// Función para obtener el Bearer Token de Skydropx PRO
async function getBearerToken() {
  // Si el token existe y no ha expirado, reutilízalo
  if (bearerToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return bearerToken;
  }
  const clientId = process.env.SKYDROPX_API_KEY;
  const clientSecret = process.env.SKYDROPX_SECRET_API_KEY;
  const body = JSON.stringify({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  const response = await fetch("https://pro.skydropx.com/api/v1/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const data = await response.json();
  if (!data.access_token) {
    throw new Error(
      "No se pudo obtener el Bearer Token: " + JSON.stringify(data)
    );
  }
  bearerToken = data.access_token;
  // El token dura 1 hora (3600 segundos)
  tokenExpiresAt =
    Date.now() + (data.expires_in ? data.expires_in * 1000 : 3600 * 1000);
  return bearerToken;
}

// @ts-expect-error async handler is valid for Express
router.post("/quote", async (req: Request, res: Response) => {
  try {
    console.log("Datos recibidos para cotización:", req.body); // <-- LOG
    const token = await getBearerToken();
    const apiUrl = "https://pro.skydropx.com/api/v1/quotations";
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
    while (attempts < 15) { // Aumentar intentos
      // Si no está completado O no tenemos cotizaciones exitosas, seguir polling
      const hasSuccessfulRates = finalData.rates?.some((rate: any) => 
        rate.success === true || (rate.total && rate.total !== null && rate.status === 'price_found_internal')
      );
      
      if (finalData.is_completed && hasSuccessfulRates) {
        console.log("Cotización completada con éxito encontrada");
        break;
      }
      
      await new Promise((r) => setTimeout(r, 2000)); // Espera 2 segundos
      const getUrl = `https://pro.skydropx.com/api/v1/quotations/${postData.id}`;
      console.log(`Intento ${attempts + 1}: GET ${getUrl}`);
      const getResponse = await fetch(getUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      finalData = await getResponse.json();
      console.log("Respuesta GET:", finalData);
      attempts++;
    }
    res.json(finalData);
  } catch (err) {
    console.error("Error al cotizar envío:", err); // <-- LOG
    res
      .status(500)
      .json({
        error: "Error al cotizar envío",
        details: err instanceof Error ? err.message : err,
      });
  }
});

export default router;
