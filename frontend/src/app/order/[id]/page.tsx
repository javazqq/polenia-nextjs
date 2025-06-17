"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchOrderById } from "@/lib/api/orders";
import { Order, Address } from "@/types/order";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Package, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function OrderPage() {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const router = useRouter();

  // Get user info from Redux
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Helper function to render address
  const renderAddress = (address: Address | string | null | undefined) => {
    if (!address) return null;

    if (typeof address === "string") {
      // Legacy string address
      return (
        <div className="text-right font-semibold text-gray-900 max-w-xs">
          <span>{address}</span>
        </div>
      );
    }

    // Structured address object
    return (
      <div className="text-right font-semibold text-gray-900 max-w-xs">
        <div className="text-sm space-y-1">
          <div>{address.street}</div>
          <div>
            {address.city}, {address.state}
          </div>
          <div>{address.zipCode}</div>
          <div className="font-medium text-[#6153E0]">{address.country}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const guestToken = searchParams?.get("guestToken");

    console.log("Order page - userInfo:", userInfo);
    console.log("Order page - guestToken:", guestToken);

    if (userInfo?.token) {
      // Regular authenticated user
      console.log("Fetching order for authenticated user");
      fetchOrderById(id, userInfo.token)
        .then((data) => {
          console.log("Order data:", data);
          setOrder(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch order error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    } else if (guestToken) {
      // Guest user with token in URL
      console.log("Fetching order for guest user");
      fetchOrderById(id, guestToken)
        .then((data) => {
          console.log("Guest order data:", data);
          setOrder(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch guest order error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      // No authentication
      console.log("No authentication found");
      setIsError(true);
      setIsLoading(false);
    }
  }, [id, userInfo, searchParams]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#DDC7FF] border-t-[#6153E0] rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] flex justify-center items-center">
        <div className="text-center p-8 bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-2xl max-w-md mx-auto backdrop-blur-sm opacity-0 animate-fade-in-down">
          <p className="text-[#FF6E98] font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-[#6153E0]/70 text-sm">
            Failed to load order details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFFBF4] flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Order Status Icon */}
        <motion.div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg ${
            order.status === "paid" || order.status === "completed"
              ? "bg-gradient-to-r from-green-400 to-green-600"
              : order.status === "pending"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                : "bg-gradient-to-r from-gray-400 to-gray-600"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          <Package className="w-10 h-10 text-white" />
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="space-y-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Order Details
            </motion.h1>

            {/* Order ID Section */}
            <motion.div
              className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-gray-700 font-medium mb-4 flex items-center justify-center gap-2">
                <Package className="w-5 h-5 text-[#6153E0]" />
                Order ID
              </p>
              <code className="block bg-white text-[#6153E0] p-4 rounded-lg text-lg font-mono border border-gray-200 font-semibold tracking-wider">
                {order.id}
              </code>
            </motion.div>

            {/* Order Information Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* Order Info */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#6153E0]" />
                  Order Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span
                      className={`font-semibold px-3 py-1 rounded-full text-sm ${
                        order.status === "paid" || order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Total:</span>
                    <span className="font-bold text-2xl text-[#6153E0]">
                      ${order.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {order.guest_name && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Guest Name:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {order.guest_name}
                      </span>
                    </div>
                  )}
                  {order.guest_email && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Email:</span>
                      <span className="font-semibold text-gray-900">
                        {order.guest_email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              {order.guest_address && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#6153E0]" />
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      {renderAddress(order.guest_address)}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#6153E0]" />
                  Items
                </h2>
                <div className="space-y-3">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-[#6153E0]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No items found</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Link
                href="/products"
                className="flex-1 bg-[#6153E0] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#5143C7] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/"
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Back to Home
              </Link>
            </motion.div>

            {/* Guest Notice */}
            {order.guest_name && (
              <motion.div
                className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <p className="text-blue-700 text-sm">
                  💡 <strong>Guest Order:</strong> This order was placed as a
                  guest. Consider creating an account for easier order tracking
                  in the future.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
