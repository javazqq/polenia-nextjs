"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");

  return (
    <section className="min-h-screen bg-[#FFFBF4] flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

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
              Payment Successful
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Thank you for choosing Polenia. Your order has been confirmed and
              will be processed shortly.
            </motion.p>

            {/* Order ID Section */}
            {orderId && (
              <motion.div
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <p className="text-gray-700 font-medium mb-4 flex items-center justify-center gap-2">
                  <Package className="w-5 h-5 text-[#6153E0]" />
                  Order Confirmation
                </p>
                <code className="block bg-white text-[#6153E0] p-4 rounded-lg text-lg font-mono border border-gray-200 font-semibold tracking-wider">
                  {orderId}
                </code>
              </motion.div>
            )}

            {/* Confirmation Message */}
            <motion.div
              className="flex items-center justify-center gap-2 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Mail className="w-5 h-5" />
              <p>Confirmation details sent to your email</p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href="/products"
                className="flex-1 bg-[#6153E0] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#5143C7] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/profile"
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Orders
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
