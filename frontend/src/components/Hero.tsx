"use client";

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="h-screen relative overflow-hidden">
      <section className="bg-gradient-to-br from-amber-50 via-amber-100 to-orange-200 text-center h-full flex flex-col justify-center items-center relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-amber-800 mb-6 shadow-lg"
          >
            ✨ Handcrafted with Love
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 mb-6 leading-tight"
          >
            Ginger
            <br />
            <span className="text-6xl md:text-7xl">Beer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-amber-800/80 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Experience the perfect blend of spicy ginger and refreshing zest.
            <br />
            <span className="font-medium">Crafted for the bold.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/order" className="group">
              <button className="bg-gradient-to-r from-amber-900 to-orange-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group-hover:from-amber-800 group-hover:to-orange-700">
                Order Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
              </button>
            </a>
            
            <button className="bg-white/80 backdrop-blur-sm text-amber-900 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 border border-amber-200">
              Learn More
            </button>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12 text-amber-800/70"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              100% Natural
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Small Batch
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Locally Sourced
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Waves SVG background */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] min-h-[120px] max-h-[200px]">
        <svg
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18
              58-18 88-18 58 18 88 18v44h-352z"
            />
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0.3)" />
            </linearGradient>
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="url(#waveGradient)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255, 220, 180, 0.6)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255, 200, 150, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(251, 146, 60, 0.9)" />
          </g>
        </svg>
      </div>
    </div>
  );
}