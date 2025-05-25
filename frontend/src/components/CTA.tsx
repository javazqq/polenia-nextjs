'use client';

import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="bg-yellow-900 text-white py-16 px-4 text-center mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2, }}
      >
        Ready to Taste the Buzz?
      </motion.h2>

      <motion.p
        className="text-xl mb-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        Order your first batch of Ginger Beer now, and experience the authentic flavor!
      </motion.p>

      <motion.a
        href="/order"
        className="bg-yellow-700 hover:bg-yellow-600 text-white text-lg px-8 py-4 rounded-full inline-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        Order Now
      </motion.a>
    </section>
  );
}
