'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGuest = searchParams?.get('guest') === 'true';

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Form state for guest checkout
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setError('');
    if (isGuest && (!name || !email || !address)) {
      setError('Please fill all guest information fields.');
      return;
    }
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {
      // Create guest user if needed
      if (isGuest) {
        const guestRes = await fetch('/api/users/guest', {
          method: 'POST',
          credentials: 'include',
        });

        if (!guestRes.ok) {
          const guestData = await guestRes.json();
          throw new Error(guestData.message || 'Failed to create guest user');
        }
      }

      // Place the order
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items: cartItems,
          total: calculateSubtotal(),
          ...(isGuest ? { name, email, address } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      // Redirect on success
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" bg-yellow-50 py-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-yellow-200 my-8"
    >
      <h1 className="text-3xl font-extrabold mb-6 text-yellow-900 text-center">Checkout</h1>

      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-yellow-800 text-center"
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-yellow-900">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-3 border border-yellow-100 rounded-xl shadow-sm bg-yellow-50"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-yellow-900">{item.name}</p>
                        <p className="text-sm text-yellow-700">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-yellow-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-semibold text-lg text-yellow-900 mt-4 text-right"
              >
                Subtotal: ${calculateSubtotal().toFixed(2)}
              </motion.p>
            </section>

            {isGuest && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-yellow-900">Guest Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-yellow-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 transition"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-yellow-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 transition"
                    required
                  />
                  <textarea
                    placeholder="Shipping Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-yellow-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 resize-none transition"
                    rows={3}
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-yellow-800 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </motion.button>
                </div>
              </section>
            )}

            {!isGuest && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-yellow-800 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </motion.button>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-600 font-medium text-center"
              >
                {error}
              </motion.p>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
    </section>
  );
}