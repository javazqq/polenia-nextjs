import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/constants';

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;
    
    // Use the backend URL from constants
    const backendUrl = BASE_URL;
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/shipping/skydropx-shipments/by-order/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Skydropx shipment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Skydropx shipment' },
      { status: 500 }
    );
  }
}
