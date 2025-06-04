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
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
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
            router.push("/checkout?guest=true");
          }}
        >
          Continue as Guest
        </button>
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition duration-200"
          onClick={() => {
            setShowCheckoutOptions(false);
            onClose();
            router.push("/login?redirect=/checkout");
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
  </div>
)}
    </>
  );
}
