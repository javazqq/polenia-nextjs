'use client';

import { useParams } from 'next/navigation';
import { useGetProductDetailsQuery } from "@/slices/productsApiSlice";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-yellow-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center text-red-600 font-bold py-20">
        Failed to load product details.
      </div>
    );
  }

  return (
    <section className="w-full px-6 md:px-16 py-24 min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
      <motion.div
        className="grid md:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image */}
        <motion.div
          className="relative h-[28rem] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-yellow-900/10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="max-w-xl text-gray-900"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-5xl font-black mb-6 drop-shadow-sm tracking-tight">
            {product.name}
          </h1>

          <p className="text-lg text-yellow-900 mb-8 leading-relaxed">
            {product.description}
          </p>

          <hr className="border-yellow-700 mb-8" />

          <div className="flex items-center justify-between">
            <span className="inline-block bg-yellow-900 text-yellow-100 font-semibold text-2xl px-6 py-2 rounded-full shadow-lg">
              ${product.price.toFixed(2)}
            </span>

            <motion.button
              className="px-7 py-3 bg-yellow-800 hover:bg-yellow-700 text-white rounded-xl shadow-lg transition"
              aria-label={`Add ${product.name} to cart`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
