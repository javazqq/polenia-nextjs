"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const GlassBanner = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto my-12 p-6 md:p-8 rounded-3xl overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#6153E0]/40 to-[#FF6E98]/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#FF991F]/30 to-[#D6E012]/30 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>

      {/* Glass Container */}
      <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/5">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Sparkles className="text-[#6153E0]" size={20} />
            <h2 className="text-2xl md:text-3xl font-bold text-[#3A3185]">
              Discover Our Summer Specials
            </h2>
          </div>
          <p className="text-[#3A3185]/80 max-w-lg">
            Freshly brewed, limited-edition flavors. Perfect for warm days and
            cool nights.
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-[#6153E0]/40 transition-all duration-300 flex items-center gap-2"
        >
          <span>Explore Now</span>
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default GlassBanner;
