"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart } from "@/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!hasMounted) return null;

  return (
    <div className="w-full px-6 md:px-16 py-20 min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
      <motion.h1
        className="text-4xl font-extrabold mb-12 text-center text-yellow-900 drop-shadow-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-yellow-900"
        >
          Your cart is empty.{" "}
          <Link href="/" className="text-yellow-800 underline">
            Go back
          </Link>
        </motion.div>
      ) : (
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="grid md:grid-cols-3 gap-10 max-h-[70vh]" // <-- fixed max height here
>
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[70vh] pr-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-yellow-800">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-yellow-700">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="bg-white p-6 rounded-lg shadow sticky top-20 h-fit max-h-[70vh]"
>
            <h2 className="text-xl font-bold mb-4 text-yellow-900">Summary</h2>
            <p className="text-lg mb-2">
              Subtotal:{" "}
              <span className="font-semibold text-yellow-900">
                ${calculateSubtotal().toFixed(2)}
              </span>
            </p>
            <button
              className="w-full mt-6 bg-yellow-800 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
