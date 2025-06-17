import crypto from 'crypto';
import { Request } from 'express';

export function validateMPWebhookSignature(req: Request, secret: string): boolean {
  const xSignature = req.headers['x-signature'] as string;
  const xRequestId = req.headers['x-request-id'] as string;
  if (!xSignature || !xRequestId) return false;

  // Extraer ts y v1
  let ts = '';
  let hash = '';
  xSignature.split(',').forEach(part => {
    const [key, value] = part.split('=');
    if (key && value) {
      if (key.trim() === 'ts') ts = value.trim();
      if (key.trim() === 'v1') hash = value.trim();
    }
  });

  // Obtener el dataID (puede venir en data.id o en resource)
  let dataID: string | undefined;
  if (req.body?.data?.id) {
    dataID = String(req.body.data.id).toLowerCase();
  } else if (req.body?.resource) {
    const last = req.body.resource.split('/').pop();
    dataID = last ? last.toLowerCase() : undefined;
  }
  if (!dataID) return false;

  // Construir el manifest
  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  // Generar el HMAC
  const sha = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

  // Log para debug
  console.log('Validando firma MercadoPago:', { manifest, sha, hash });

  return sha === hash;
}