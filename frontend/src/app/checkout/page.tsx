// app/checkout/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.auth);

  const isGuest = searchParams?.get('guest') === 'true';

  useEffect(() => {
    // If not logged in and not guest, redirect to login with redirect
    if (!userInfo && !isGuest) {
      router.push('/login?redirect=/checkout');
    }
  }, [userInfo, isGuest, router]);

  if (!userInfo && !isGuest) return null; // Block rendering while redirecting

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {userInfo ? (
        <p>Welcome, {userInfo.name}! You're checking out as a logged-in user.</p>
      ) : (
        <p>You're checking out as a guest.</p>
      )}

      {/* Checkout form shared between guest and user */}
      {/* You can use userInfo.email for logged-in user or ask for email in the form for guest */}
    </div>
  );
}
