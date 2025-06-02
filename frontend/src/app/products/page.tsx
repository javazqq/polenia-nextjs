'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { fetchProducts } from '@/lib/api/products';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
        fetchProducts()
        .then((data) => {
            setProducts(data);
            setIsLoading(false);
        })
        .catch(()=> {
            setIsError(true);
            setIsLoading(false);
        });
    }, []);

  return (
    <section className="w-full px-6 md:px-16 py-20 min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
      <motion.h1
        className="text-4xl font-extrabold mb-12 text-center text-yellow-900 drop-shadow-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Products
      </motion.h1>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-yellow-800 border-t-transparent rounded-full animate-spin"></div>
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
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300"
            >
              <Link href={`/products/${product.id}`} className="block cursor-pointer group">
                <div className="relative h-64 rounded-t-3xl overflow-hidden shadow-inner">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-semibold text-yellow-900 mb-2 group-hover:underline">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </Link>

              <div className="p-5 pt-0 flex justify-between items-center">
                <span className="inline-block bg-yellow-900 text-yellow-100 font-semibold text-lg px-4 py-1 rounded-full shadow-md">
                  ${product.price.toFixed(2)}
                </span>
                <button className="px-5 py-2 bg-yellow-800 hover:bg-yellow-700 text-white rounded-xl shadow-lg transition">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
