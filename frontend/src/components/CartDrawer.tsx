"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart } from "@/slices/cartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useMemo, memo, useEffect } from "react";
import {
  ArrowRight,
  Minus,
  Plus,
  Star,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

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
    <div className="relative group">
      {/* Main card with enhanced glassmorphism */}
      <div className="relative overflow-hidden bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:bg-white/30">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6153E0]/5 via-transparent to-[#FF6E98]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 p-4">
          <div className="flex items-center gap-4">
            {/* Product image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/40 to-white/20 p-1 border border-white/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Quantity badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                {item.quantity}
              </div>
            </div>

            {/* Product details */}
            <div className="flex-1">
              <h4 className="font-bold text-[#6153E0] text-md leading-tight group-hover:text-[#FF6E98] transition-colors duration-300 mb-1">
                {item.name}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6153E0]/80 font-medium">
                  ${item.price.toFixed(2)}
                </span>
                <p className="text-md font-bold text-[#6153E0] group-hover:text-[#FF6E98] transition-colors duration-300">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={() => onRemove(item.id)}
              className="group/btn p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#6153E0] hover:text-[#FF6E98] transition-all duration-300"
              aria-label="Remove item"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover/btn:rotate-90 transition-transform duration-300"
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
        </div>
      </div>
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
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
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

  // Add hasMounted state
  const [hasMounted, setHasMounted] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    // Stagger animation for drawer opening
    if (isOpen) {
      const timer = setTimeout(() => setAnimationStep(1), 150);
      return () => clearTimeout(timer);
    } else {
      setAnimationStep(0);
    }
  }, [isOpen]);

  return (
    <>
      {/* Enhanced Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-md z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Floating Cart Drawer with enhanced glassmorphism */}
      <aside
        className={`fixed right-4 top-20 h-[calc(100vh-6rem)] w-[90vw] max-w-md z-50 ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-[105%] opacity-0 scale-95"
        } transform transition-all duration-500 ease-out overflow-hidden rounded-3xl`}
        style={{
          background: "rgba(255, 251, 244, 0.15)",
          backdropFilter: "blur(25px) saturate(200%)",
          WebkitBackdropFilter: "blur(25px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 25px 50px -5px rgba(97, 83, 224, 0.25), 0 10px 25px -3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6153E0]/5 via-[#FF6E98]/5 to-[#FF991F]/5 animate-pulse"></div>

        {/* Floating orbs for extra visual appeal */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#FF991F]/10 to-[#D6E012]/10 rounded-full blur-lg animate-pulse [animation-delay:2s]"></div>

        <div className="relative z-10 h-full overflow-y-auto p-6 flex flex-col">
          <div
            className={`transition-all duration-700 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent">
                  Your Cart
                </h2>
                {/* Only render cart count after mount to avoid hydration mismatch */}
                {hasMounted && (
                  <p className="text-sm text-[#6153E0]/70 font-medium">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="group p-3 rounded-2xl bg-white/20 hover:bg-white/30 text-[#6153E0] hover:text-[#FF6E98] transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-110"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:rotate-90 transition-transform duration-300"
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
          </div>

          {/* Only render cart content after mount to avoid hydration mismatch */}
          {hasMounted &&
            (cartItems.length === 0 ? (
              <div
                className={`flex flex-col items-center justify-center flex-1 text-center transition-all duration-1000 delay-300 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#6153E0]/60"
                    >
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16 5 16H17M17 13V16M9 19.5A1.5 1.5 0 1 1 10.5 21A1.5 1.5 0 0 1 9 19.5ZM20 19.5A1.5 1.5 0 1 1 21.5 21A1.5 1.5 0 0 1 20 19.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent mb-3">
                  Your cart is empty
                </h3>
                <p className="text-[#6153E0]/70 text-sm leading-relaxed max-w-xs">
                  Add some delicious craft ginger beer to start your flavor
                  journey!
                </p>
              </div>
            ) : (
              <React.Fragment>
                <div
                  className={`flex-1 space-y-4 mb-6 overflow-y-auto transition-all duration-1000 delay-200 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="transition-all duration-500"
                      style={{
                        transitionDelay: `${300 + index * 100}ms`,
                        transform:
                          animationStep >= 1
                            ? "translateY(0)"
                            : "translateY(20px)",
                        opacity: animationStep >= 1 ? 1 : 0,
                      }}
                    >
                      <CartItem item={item} onRemove={handleRemove} />
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div
                  className={`mt-auto pt-6 border-t border-white/20 transition-all duration-1000 delay-500 ${animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6153E0]/80 font-medium">
                        Subtotal
                      </span>
                      <span className="text-lg font-bold text-[#6153E0]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent">
                        Total
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="group relative w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] hover:from-[#FF6E98] hover:to-[#FF991F] text-white font-bold py-4 mt-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    disabled={cartItems.length === 0}
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="text-lg">Proceed to Shipping</span>
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </button>
                </div>
              </React.Fragment>
            ))}
        </div>
      </aside>

      {/* Checkout Options Modal */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-lg flex items-center justify-center px-4 transition-all duration-500 ${
          showCheckoutOptions
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {showCheckoutOptions && (
          <div
            className={`relative overflow-hidden bg-white/20 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-white/30 transition-all duration-500 scale-100 opacity-100`}
          >
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent mb-2">
                  Checkout
                </h2>
                <p className="text-sm text-[#6153E0]/70">
                  How would you like to proceed?
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  className="group relative overflow-hidden bg-gradient-to-r from-[#6153E0] to-[#FF6E98] hover:from-[#FF6E98] hover:to-[#FF991F] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => {
                    setShowCheckoutOptions(false);
                    onClose();
                    router.push("/checkout?guest=true");
                  }}
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <span>Continue as Guest</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>

                <button
                  className="group bg-white/30 hover:bg-white/40 backdrop-blur-sm text-[#6153E0] font-semibold py-3 rounded-xl transition-all duration-300 border border-white/40 hover:border-[#6153E0]/30 hover:scale-105"
                  onClick={() => {
                    setShowCheckoutOptions(false);
                    onClose();
                    router.push("/login?redirect=/checkout");
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Login to Checkout</span>
                  </div>
                </button>

                <button
                  className="text-sm text-[#6153E0]/70 hover:text-[#6153E0] hover:underline pt-2 transition-all duration-200"
                  onClick={() => setShowCheckoutOptions(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Remove the old style tag since we're using inline styles now */}
    </>
  );
}
