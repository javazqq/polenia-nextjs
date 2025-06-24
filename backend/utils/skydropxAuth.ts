import fetch from "node-fetch";

let bearerToken: string | null = null;
let tokenExpiresAt: number | null = null;

// Función para obtener el Bearer Token de Skydropx PRO
export async function getBearerToken() {
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
  const response = await fetch(
    "https://sb-pro.skydropx.com/api/v1/oauth/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }
  );
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
