'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { fetchProducts } from '@/lib/api/products';
import { ArrowRight, ShoppingCart, Star, Filter, Search } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
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
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✨ Premium Collection
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 mb-6">
            Our Products
          </h1>
          
          <p className="text-lg md:text-xl text-amber-800/70 max-w-2xl mx-auto leading-relaxed">
            Discover our complete range of handcrafted ginger beers, each bottle a testament to quality and tradition
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-600 font-semibold mb-2">Oops! Something went wrong</p>
              <p className="text-red-500 text-sm">Failed to load products. Please try again later.</p>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:border-amber-200/50">
                  <Link href={`/products/${product.id}`} className="block">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                      {/* Badge */}
                      {index < 3 && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Popular
                          </span>
                        </div>
                      )}
                      
                      {/* Rating 
                      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-700">4.9</span>
                      </div>
                      */}
                      {/* Product Image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ArrowRight size={20} className="text-amber-600" />
                        </motion.div>
                      </div>
                      
                      <p className="text-amber-800/70 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Natural
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Organic
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Price and CTA */}
                  <div className="px-6 pb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-amber-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-amber-700/60 ml-1">each</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                      >
                        <ShoppingCart size={16} />
                        <span>Add</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Results Summary */}
        {!isLoading && !isError && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-amber-800/60 text-sm">
              Showing {products.length} products • Handcrafted with love
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}