'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What makes Polenia Ginger Beer unique?',
    answer: 'We use real ginger root, small-batch brewing, and no artificial sweeteners for an authentic, bold flavor.',
  },
  {
    question: 'Is Polenia Ginger Beer alcoholic?',
    answer: 'No, it’s a non-alcoholic craft beverage perfect for all ages and occasions.',
  },
  {
    question: 'Where do you ship?',
    answer: 'We currently ship across the US. International shipping is coming soon!',
  },
  {
    question: 'Can I use it in cocktails?',
    answer: 'Absolutely! Polenia pairs perfectly in mules, spritzers, or even as a bold soda substitute.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="min-h-screen bg-yellow-50 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-900 text-center mb-12">Frequently Asked Questions</h1>

        <ul className="space-y-6">
          {faqs.map((faq, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-yellow-200"
            >
              <button
                className="w-full flex justify-between items-center text-left text-yellow-900 text-lg font-semibold"
                onClick={() => toggle(index)}
              >
                <span className="flex items-center gap-2">
                  <Info size={20} className="text-yellow-700" />
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-yellow-700" />
                ) : (
                  <ChevronDown className="text-yellow-700" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-yellow-800 mt-4 text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
