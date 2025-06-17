// utils/webhookValidation.ts
import crypto from 'crypto';

interface SignatureComponents {
  ts: string;
  v1: string;
}

function parseSignature(signature: string): SignatureComponents | null {
  try {
    const parts = signature.split(',');
    const tsMatch = parts.find(part => part.startsWith('ts='));
    const v1Match = parts.find(part => part.startsWith('v1='));
    
    if (!tsMatch || !v1Match) {
      return null;
    }
    
    return {
      ts: tsMatch.split('=')[1],
      v1: v1Match.split('=')[1]
    };
  } catch (error) {
    console.error('Error parsing signature:', error);
    return null;
  }
}

/**
 * Method 1: Standard MercadoPago format
 */
function validateMethod1(signature: string, requestId: string, body: any, secret: string): boolean {
  try {
    const signatureComponents = parseSignature(signature);
    if (!signatureComponents) return false;

    const { ts, v1 } = signatureComponents;
    const signedPayload = `id:${requestId};request-id:${requestId};ts:${ts};`;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    console.log('Method 1 - Standard:', {
      payload: signedPayload,
      expected: expectedSignature.substring(0, 10) + '...',
      received: v1.substring(0, 10) + '...'
    });

    return crypto.timingSafeEqual(
      Buffer.from(v1, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Method 1 error:', error);
    return false;
  }
}

/**
 * Method 2: Simple concatenation
 */
function validateMethod2(signature: string, requestId: string, body: any, secret: string): boolean {
  try {
    const signatureComponents = parseSignature(signature);
    if (!signatureComponents) return false;

    const { ts, v1 } = signatureComponents;
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body);
    const payload = `${requestId}${bodyString}${ts}`;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    console.log('Method 2 - Simple:', {
      payload: `${requestId}[BODY]${ts}`,
      expected: expectedSignature.substring(0, 10) + '...',
      received: v1.substring(0, 10) + '...'
    });

    return crypto.timingSafeEqual(
      Buffer.from(v1, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Method 2 error:', error);
    return false;
  }
}

/**
 * Method 3: Raw body + timestamp
 */
function validateMethod3(signature: string, requestId: string, body: any, secret: string): boolean {
  try {
    const signatureComponents = parseSignature(signature);
    if (!signatureComponents) return false;

    const { ts, v1 } = signatureComponents;
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body);
    const payload = `${ts}${bodyString}`;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    console.log('Method 3 - Body+TS:', {
      payload: `${ts}[BODY]`,
      expected: expectedSignature.substring(0, 10) + '...',
      received: v1.substring(0, 10) + '...'
    });

    return crypto.timingSafeEqual(
      Buffer.from(v1, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Method 3 error:', error);
    return false;
  }
}

/**
 * Method 4: Just the data ID
 */
function validateMethod4(signature: string, requestId: string, body: any, secret: string): boolean {
  try {
    const signatureComponents = parseSignature(signature);
    if (!signatureComponents) return false;

    const { ts, v1 } = signatureComponents;
    
    // Extract data ID from different body formats
    const dataId = body.data?.id || body.resource?.split('/').pop() || body.resource;
    if (!dataId) return false;

    const payload = `${dataId}`;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    console.log('Method 4 - Data ID:', {
      dataId,
      payload,
      expected: expectedSignature.substring(0, 10) + '...',
      received: v1.substring(0, 10) + '...'
    });

    return crypto.timingSafeEqual(
      Buffer.from(v1, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Method 4 error:', error);
    return false;
  }
}

/**
 * Main validation function - tries multiple methods
 */
export function validateWebhookSignature(
  signature: string,
  requestId: string,
  body: any,
  secret: string
): boolean {
  try {
    // Parse signature components
    const signatureComponents = parseSignature(signature);
    if (!signatureComponents) {
      console.error('Invalid signature format');
      return false;
    }

    const { ts } = signatureComponents;

    // Check timestamp (allow longer window for testing)
    const currentTime = Math.floor(Date.now() / 1000);
    const webhookTime = parseInt(ts);
    const timeDifference = Math.abs(currentTime - webhookTime);
    
    // Be more lenient with timestamp in development
    const maxAge = process.env.NODE_ENV === 'production' ? 300 : 86400; // 5 min prod, 1 hour dev
    
    if (timeDifference > maxAge) {
      console.error(`Webhook timestamp too old: ${timeDifference} seconds (max: ${maxAge})`);
      return false;
    }

    console.log('\n=== Trying Multiple Signature Validation Methods ===');

    // Try all methods
    const methods = [
      { name: 'Method 1 (Standard)', fn: validateMethod1 },
      { name: 'Method 2 (Simple)', fn: validateMethod2 },
      { name: 'Method 3 (Body+TS)', fn: validateMethod3 },
      { name: 'Method 4 (Data ID)', fn: validateMethod4 }
    ];

    for (const method of methods) {
      console.log(`\n--- ${method.name} ---`);
      const isValid = method.fn(signature, requestId, body, secret);
      if (isValid) {
        console.log(`✅ ${method.name} SUCCEEDED!`);
        return true;
      } else {
        console.log(`❌ ${method.name} failed`);
      }
    }

    console.log('\n=== All signature validation methods failed ===\n');
    return false;

  } catch (error) {
    console.error('Error validating webhook signature:', error);
    return false;
  }
}