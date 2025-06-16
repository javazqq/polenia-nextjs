"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { clearCartItems } from "@/slices/cartSlice";
import Image from "next/image";
import { Check, Lock } from "lucide-react";


export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGuest = searchParams?.get("guest") === "true";
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Form state for guest checkout
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  const handlePlaceOrder = async () => {
    setError("");
    if (isGuest && (!name || !email || !address)) {
      setError("Please fill all guest information fields.");
      return;
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // Si es invitado, crear cuenta temporal
      if (isGuest) {
        const guestRes = await fetch("/api/users/guest", {
          method: "POST",
          credentials: "include",
        });

        if (!guestRes.ok) {
          const guestData = await guestRes.json();
          throw new Error(guestData.message || "Failed to create guest user");
        }
      }

      // 1. Create order in backend
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items: cartItems,
            total: calculateSubtotal(),
            guest_name: isGuest ? name : undefined,
            guest_email: isGuest ? email : undefined,
            guest_address: isGuest ? address : undefined,
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Crear preferencia de pago en el backend
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-preference`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            cartItems,
            userEmail: isGuest ? email : undefined,
            orderId: orderData.orderId,
          }),
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok) {
        throw new Error(
          paymentData.error || "Failed to create payment preference"
        );
      }

      dispatch(clearCartItems());

      // Redirigir a MercadoPago
      window.location.href = paymentData.checkoutUrl;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#DDC7FF]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-12">
        <div className="max-w-4xl mx-auto transition-opacity duration-500 opacity-100 translate-y-0">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] rounded-full text-sm font-semibold mb-6 border border-[#DDC7FF]/50 transition-all duration-300 scale-100 opacity-100">
              🛒 Secure Checkout
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#6153E0] mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-[#6153E0]/80 max-w-2xl mx-auto">
              Just one step away from enjoying our premium ginger beer
            </p>
          </div>

          {/* Main Content */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 transition-all duration-300">
              <div className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl p-12 border border-[#DDC7FF]/30 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-xl font-bold text-[#6153E0] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[#6153E0]/70 mb-6">
                  Add some delicious ginger beer to get started!
                </p>
                <button
                  onClick={() => router.push("/products")}
                  className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-semibold px-6 py-3 rounded-xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <section className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#6153E0] flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#DDC7FF]/30 hover:border-[#FF6E98]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#DDC7FF]/30 to-[#FF6E98]/20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#6153E0] mb-1">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#6153E0]/70">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-[#6153E0] text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#DDC7FF]/50 pt-4">
                  <div className="flex justify-between items-center bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white p-4 rounded-2xl transition-all duration-300">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Guest Information / Checkout Form */}
              <section className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 transition-all duration-300">
                {isGuest ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-[#6153E0] flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      Guest Information
                    </h2>
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-2">
                          Shipping Address
                        </label>
                        <textarea
                          placeholder="Enter your complete shipping address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 resize-none transition-all"
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D6E012] to-[#6153E0] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl"><Check /></span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#6153E0] mb-2">
                      Ready to Checkout
                    </h2>
                    <p className="text-[#6153E0]/70 mb-6">
                      Your account information will be used for shipping
                    </p>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] hover:from-[#FF6E98] hover:to-[#FF991F] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span><Lock /></span>
                      <span>Place Secure Order</span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-xl backdrop-blur-sm transition-all duration-300">
                    <p className="text-[#FF6E98] font-medium text-center flex items-center justify-center">
                      <span className="mr-2">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-[#D6E012]/10 border border-[#D6E012]/30 rounded-xl backdrop-blur-sm">
                  <p className="text-xs text-[#6153E0]/70 text-center flex items-center justify-center">
                    <span className="mr-2">🔐</span>
                    Your payment information is secured with end-to-end
                    encryption
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
