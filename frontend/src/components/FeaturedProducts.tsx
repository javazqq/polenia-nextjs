'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGetProductsQuery } from '@/slices/productsApiSlice';

export default function FeaturedProducts() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const featured = products.slice(0, 3); // show only first 3

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-full px-6 md:px-16 py-20 bg-yellow-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with scroll animation */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-yellow-900 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          }}
        >
          Featured Products
        </motion.h2>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-yellow-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {isError && (
          <div className="text-red-600 text-center font-semibold py-10">
            Failed to load products. Please try again later.
          </div>
        )}

        {!isLoading && !isError && (
          <motion.div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {featured.map((product) => (
              <motion.div
                key={product.id}
                className="bg-yellow-100 rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
                variants={cardVariants}
              >
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-yellow-900 mb-1 group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="px-5 pb-5 flex justify-between items-center">
                    <span className="text-lg font-bold text-yellow-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="text-sm bg-yellow-800 text-white px-4 py-1 rounded-full hover:bg-yellow-700 transition">
                      View
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA button with slight scroll animation */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/products"
            className="inline-block bg-yellow-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-yellow-700 transition"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
