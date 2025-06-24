"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get orderId from URL params (from MercadoPago redirect)
    const orderIdFromUrl = searchParams?.get("orderId");
    if (orderIdFromUrl) setOrderId(orderIdFromUrl);
  }, [searchParams]);

  return (
    <section className="min-h-screen bg-[#FFFBF4] flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Failure Icon */}
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          <XCircle className="w-10 h-10 text-white" />
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
              Payment Failed
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Unfortunately, your payment could not be processed. No charges
              have been made. You can try again or contact support if the
              problem persists.
            </motion.p>

            {/* Order ID Section (if available) */}
            {orderId && (
              <motion.div
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <p className="text-gray-700 font-medium mb-4 flex items-center justify-center gap-2">
                  <Package className="w-5 h-5 text-[#FF6E98]" />
                  Order Reference
                </p>
                <code className="block bg-white text-[#FF6E98] p-4 rounded-lg text-lg font-mono border border-gray-200 font-semibold tracking-wider">
                  {orderId}
                </code>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href="/checkout"
                className="flex-1 bg-[#FF6E98] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#FF3B6E] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Try Again
              </Link>
              <Link
                href="/contact"
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Contact Support
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
