'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart } from '@/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react'; // ✅ You forgot this import!

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false); // ✅ Hook must be here

  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={onClose} className="text-yellow-800 font-semibold">
                Close
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-yellow-900">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 border-b"
                    >
                      <div className="flex items-center gap-4">
                        <Image src={item.image} alt={item.name} width={50} height={50} />
                        <div>
                          <p>{item.name}</p>
                          <p className="text-sm text-yellow-700">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <p className="font-semibold text-lg">
                    Subtotal: ${calculateSubtotal().toFixed(2)}
                  </p>
                  <button
                    onClick={() => setShowCheckoutOptions(true)}
                    className="w-full mt-4 bg-yellow-800 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {showCheckoutOptions && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Checkout Options</h2>
            <p className="mb-6">How would you like to continue?</p>
            <div className="flex flex-col space-y-3">
              <button
                className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                onClick={() => {
                  setShowCheckoutOptions(false);
                  onClose();
                  router.push("/checkout?guest=true");
                }}
              >
                Continue as Guest
              </button>
              <button
                className="bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200"
                onClick={() => {
                  setShowCheckoutOptions(false);
                  onClose();
                  router.push("/login?redirect=/checkout");
                }}
              >
                Login to Checkout
              </button>
              <button
                className="mt-2 text-sm text-gray-500 hover:underline"
                onClick={() => setShowCheckoutOptions(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
