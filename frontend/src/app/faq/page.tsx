"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What makes Polenia Ginger Beer unique?",
    answer:
      "We use real ginger root, small-batch brewing, and no artificial sweeteners for an authentic, bold flavor.",
  },
  {
    question: "Is Polenia Ginger Beer alcoholic?",
    answer:
      "No, it’s a non-alcoholic craft beverage perfect for all ages and occasions.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We currently ship across the US. International shipping is coming soon!",
  },
  {
    question: "Can I use it in cocktails?",
    answer:
      "Absolutely! Polenia pairs perfectly in mules, spritzers, or even as a bold soda substitute.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#DDC7FF]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] rounded-full text-sm font-semibold mb-6 border border-[#DDC7FF]/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              💡 Got Questions?
            </motion.span>

            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#6153E0] mb-6">
              Frequently Asked Questions
            </h1>

            <p className="text-lg md:text-xl text-[#6153E0]/80 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about Polenia Ginger Beer and more
            </p>
          </motion.div>

          {/* FAQ List */}
          <motion.ul
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {faqs.map((faq, index) => (
              <motion.li
                key={index}
                className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl shadow-lg border border-[#DDC7FF]/30 hover:border-[#FF6E98]/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left p-6 text-[#6153E0] text-lg font-semibold group"
                  onClick={() => toggle(index)}
                >
                  <span className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center flex-shrink-0">
                      <Info size={16} className="text-white" />
                    </div>
                    <span className="group-hover:text-[#FF6E98] transition-colors">
                      {faq.question}
                    </span>
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown
                      className="text-[#6153E0] group-hover:text-[#FF6E98] transition-colors"
                      size={20}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#DDC7FF]/30">
                          <p className="text-[#6153E0]/80 text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16 p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#DDC7FF]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[#6153E0] mb-4">
              Still have questions?
            </h3>
            <p className="text-[#6153E0]/70 mb-6 max-w-md mx-auto">
              We're here to help! Reach out to our friendly team for any
              additional information.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-semibold px-8 py-3 rounded-2xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300 shadow-lg"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
