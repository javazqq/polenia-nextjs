'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  const [status, setStatus] = useState<'pending' | 'paid' | 'error'>('pending');

  useEffect(() => {
    const updateOrderStatus = async () => {
      console.log('OrderId from URL:', orderId);
      if (!orderId) {
        setStatus('error');
        return;
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`;
      console.log('PATCH URL:', apiUrl);
      try {
        const res = await fetch(apiUrl, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: 'paid' }),
        });
        console.log('Response status:', res.status);
        const data = await res.json().catch(() => ({}));
        console.log('Response body:', data);
        if (!res.ok) throw new Error('Failed to update order');
        setStatus('paid');
      } catch (err) {
        console.error('Error updating order status:', err);
        setStatus('error');
      }
    };
    updateOrderStatus();
  }, [orderId]);

  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Success</h1>
      {status === 'paid' && (
        <>
          <p className="mb-2">Thank you for your purchase!</p>
          <p className="mb-2">Your order ID is:</p>
          <code className="block bg-gray-100 rounded p-2 text-lg">{orderId}</code>
        </>
      )}
      {status === 'pending' && <p>Updating your order status...</p>}
      {status === 'error' && <p className="text-red-600">There was a problem updating your order status.</p>}
    </div>
  );
}