'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  return (
    <section className="bg-yellow-50 flex items-center justify-center py-12">
    <motion.div
      className="max-w-3xl mx-auto py-20 p-6 px-6 my-8 text-center bg-yellow-50 rounded-xl shadow-lg"
      //"max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-yellow-200 my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-green-700">Payment Successful 🎉</h1>
        <p className="text-yellow-900 font-medium">Thank you for your purchase!</p>
        <p className="text-yellow-900">Your order ID is:</p>
        <code className="block bg-yellow-100 text-yellow-800 p-3 rounded-md text-lg font-mono border border-yellow-300">
          {orderId}
        </code>
        <p className="text-sm text-yellow-700 mt-4">We’ve sent a confirmation email with your receipt.</p>
      </div>
    </motion.div>
    </section>
  );
}