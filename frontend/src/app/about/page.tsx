// src/app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Flame, Heart, Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <section className="min-h-screen py-20 px-4 flex justify-center items-center bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
      <div className="max-w-3xl mx-auto text-center space-y-12">

        <motion.h1
          className="text-5xl font-extrabold text-yellow-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Polenia
        </motion.h1>

        <motion.p
          className="text-xl text-yellow-800 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Polenia isn’t just a ginger beer — it’s a spark in a bottle. Brewed in small batches, born from a craving for boldness, and infused with nature’s fire — real ginger.
        </motion.p>

        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-yellow-900 flex items-center gap-2">
            <Flame className="text-yellow-700" /> A Sip of Our Story
          </h2>
          <p className="text-lg text-yellow-700 mt-2 leading-relaxed">
            It all began in a cozy kitchen, where a family recipe met a wild idea: “Let’s bottle the zing!” What started as weekend experiments turned into Polenia — a name inspired by old-world charm and new-world flavor.
          </p>
        </motion.div>

        {/* What Drives Us */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-yellow-900 flex items-center gap-2">
            <Leaf className="text-yellow-700" /> What Drives Us
          </h3>
          <p className="text-lg text-yellow-700 mt-2 leading-relaxed">
            We believe ginger beer should be more than just fizzy. It should be fiery, full-bodied, and fearless — with only raw ginger, cane sugar, citrus, and a whole lot of heart.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-yellow-900 flex items-center gap-2">
            <Heart className="text-yellow-700" /> Our Mission
          </h3>
          <p className="text-lg text-yellow-700 mt-2 leading-relaxed">
            To awaken taste buds and ignite conversation — one bottle at a time. We’re here for the flavor-seekers, the craft lovers, and anyone tired of bland. This is ginger beer that bites back.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
  className="mt-12"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <Link
    href="/order"
    className="inline-flex items-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition"
  >
    Explore Our Brews <ArrowRight size={18} />
  </Link>
</motion.div>
      </div>
    </section>
  );
}
