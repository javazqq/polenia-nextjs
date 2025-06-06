'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart } from '@/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get user info from Redux state
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);

  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle proceed to checkout button click
  const handleProceedToCheckout = () => {
    if (userInfo) {
      // Logged in — go directly to checkout
      onClose();
      router.push('/checkout');
    } else {
      // Not logged in — show checkout options modal
      setShowCheckoutOptions(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto p-6 rounded-l-2xl border-l-2 border-yellow-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-yellow-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-yellow-700 font-medium hover:underline"
              >
                Close
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-yellow-800">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
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
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 font-bold text-lg hover:scale-110 transition-transform"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4 space-y-4">
                  <p className="font-semibold text-lg text-yellow-900">
                    Subtotal: ${calculateSubtotal().toFixed(2)}
                  </p>
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-yellow-800 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckoutOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-center mb-3 text-yellow-900">
                Checkout Options
              </h2>
              <p className="text-sm text-center text-gray-600 mb-6">
                How would you like to proceed?
              </p>

              <div className="flex flex-col space-y-3">
                <button
                  className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition duration-200"
                  onClick={() => {
                    setShowCheckoutOptions(false);
                    onClose();
                    router.push('/checkout?guest=true');
                  }}
                >
                  Continue as Guest
                </button>
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition duration-200"
                  onClick={() => {
                    setShowCheckoutOptions(false);
                    onClose();
                    router.push('/login?redirect=/checkout');
                  }}
                >
                  Login to Checkout
                </button>
                <button
                  className="text-sm text-gray-500 hover:text-gray-700 hover:underline mt-2 transition"
                  onClick={() => setShowCheckoutOptions(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
