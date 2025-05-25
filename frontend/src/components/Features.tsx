'use client';

import { motion } from 'framer-motion';
import { Sparkles, Beer, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Beer,
      title: 'Authentic Flavor',
      desc: 'Our ginger beer is brewed with freshly ground ginger root, delivering a bold, zesty kick and a warming spice that captures the essence of traditional craft recipes.'
    },
    {
      icon: ShieldCheck,
      title: 'Natural Ingredients',
      desc: 'We use only natural, responsibly sourced ingredients — no artificial sweeteners, preservatives, or additives — just clean, honest refreshment you can feel good about.'
    },
    {
      icon: Sparkles,
      title: 'Craft Quality',
      desc: 'Made in small batches for superior taste and consistency, each bottle reflects our dedication to traditional brewing techniques and uncompromising quality.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-yellow-50">
      <div className="max-w-4xl mx-auto text-center">
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  <h2 className="text-3xl font-bold text-yellow-900 mb-4">Why Ginger Beer?</h2>
  <p className="text-lg text-yellow-700 mb-12">
    Experience the authentic flavor of real ginger root in a refreshing ginger beer.
  </p>
</motion.div>        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.2, // stagger by 0.2s
              }}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 20, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8 text-yellow-700" />
              </motion.div>
              <h3 className="mt-4 text-xl font-semibold text-yellow-800">{feature.title}</h3>
              <p className="mt-2 text-yellow-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
