'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export default function CTA() {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-orange-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/50">
          <div className="text-center">
            {/* Simple badge */}
            <motion.span
              className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Order?
            </motion.span>

            {/* Concise heading */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-amber-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Get Your Ginger Beer Today
            </motion.h2>

            {/* Brief description */}
            <motion.p
              className="text-lg text-amber-800/70 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Free shipping on orders over $50. Experience the craft today.
            </motion.p>

            {/* Single focused CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.a
                href="/order"
                className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={20} />
                <span className="text-lg">Order Now</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.a>

              <motion.a
                href="/products"
                className="text-amber-800 font-semibold hover:text-amber-900 transition-colors flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <span>Browse Products</span>
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}