"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart } from "@/slices/cartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useMemo, memo } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Memoized cart item component
const CartItem = memo(function CartItem({
  item,
  onRemove,
}: {
  item: any;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl border border-[#DDC7FF]/30 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative">
        <Image
          src={item.image}
          alt={item.name}
          width={60}
          height={60}
          className="rounded-xl object-cover"
          loading="lazy"
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white text-xs font-bold rounded-full flex items-center justify-center">
          {item.quantity}
        </div>
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-[#6153E0] mb-1">{item.name}</h4>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6153E0]/70">
            ${item.price.toFixed(2)} each
          </p>
          <p className="font-bold text-[#6153E0]">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="p-2 rounded-xl bg-[#FF6E98]/10 text-[#FF6E98] hover:bg-[#FF6E98]/20 hover:scale-110 transition-all duration-200"
        aria-label="Remove item"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
});

export default function CartDrawer({ isOpen, onClose }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get user info from Redux state
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);

  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  // Memoize subtotal calculation
  const subtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  // Handle proceed to checkout button click
  const handleProceedToCheckout = () => {
    if (userInfo) {
      // Logged in — go directly to checkout
      onClose();
      router.push("/checkout");
    } else {
      // Not logged in — show checkout options modal
      setShowCheckoutOptions(true);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#FFFBF4]/95 shadow-2xl z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transform transition-transform duration-300 overflow-y-auto rounded-l-3xl border-l border-[#DDC7FF]`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#6153E0] mb-1">
                Your Cart
              </h2>
              <p className="text-sm text-[#6153E0]/70">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#DDC7FF]/30 text-[#6153E0] hover:bg-[#DDC7FF]/50 transition-all duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 bg-[#DDC7FF]/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16 5 16H17M17 13V16M9 19.5A1.5 1.5 0 1 1 10.5 21A1.5 1.5 0 0 1 9 19.5ZM20 19.5A1.5 1.5 0 1 1 21.5 21A1.5 1.5 0 0 1 20 19.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#6153E0]/50"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#6153E0] mb-2">
                Your cart is empty
              </h3>
              <p className="text-[#6153E0]/70 text-sm">
                Add some delicious ginger beer to get started!
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={handleRemove} />
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="bg-white/60 rounded-2xl p-4 border border-[#DDC7FF]/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#6153E0]/70">Subtotal</span>
                    <span className="font-semibold text-[#6153E0]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#6153E0]/70">Shipping</span>
                    <span className="font-semibold text-[#D6E012]">FREE</span>
                  </div>
                  <div className="border-t border-[#DDC7FF]/30 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#6153E0]">
                        Total
                      </span>
                      <span className="text-xl font-bold text-[#6153E0]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] hover:from-[#FF6E98] hover:to-[#FF991F] text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                  <span className="ml-2">→</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Checkout Options Modal */}
      <div
        className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4 transition-opacity duration-300 ${
          showCheckoutOptions
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {showCheckoutOptions && (
          <div
            className={`bg-[#FFFBF4]/95 backdrop-blur-lg rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#DDC7FF] transition-transform duration-200 scale-100 opacity-100`}
          >
            <h2 className="text-2xl font-bold text-center mb-3 text-[#6153E0]">
              Checkout Options
            </h2>
            <p className="text-sm text-center text-[#6153E0]/70 mb-6">
              How would you like to proceed?
            </p>

            <div className="flex flex-col space-y-3">
              <button
                className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] hover:from-[#FF6E98] hover:to-[#FF991F] text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-lg"
                onClick={() => {
                  setShowCheckoutOptions(false);
                  onClose();
                  router.push("/checkout?guest=true");
                }}
              >
                Continue as Guest
              </button>
              <button
                className="bg-[#DDC7FF]/30 hover:bg-[#DDC7FF]/50 text-[#6153E0] font-medium py-3 rounded-2xl transition-all duration-200 border border-[#DDC7FF]"
                onClick={() => {
                  setShowCheckoutOptions(false);
                  onClose();
                  router.push("/login?redirect=/checkout");
                }}
              >
                Login to Checkout
              </button>
              <button
                className="text-sm text-[#6153E0]/70 hover:text-[#6153E0] hover:underline mt-2 transition-all duration-200"
                onClick={() => setShowCheckoutOptions(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
