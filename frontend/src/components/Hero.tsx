"use client";

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className=" h-screen relative overflow-hidden">
      <section className=" bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 text-center h-full flex flex-col justify-center items-center">
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-6xl font-extrabold text-yellow-900 drop-shadow-lg">Ginger Beer</h1>
          <p className="text-2xl mt-4 text-yellow-800">Crafted ginger beer with a spicy kick and refreshing zest</p>
          <button className="mt-8 bg-yellow-900 text-white px-8 py-4 rounded-full text-lg hover:bg-yellow-800 transition">
            Order Now
          </button>
        </motion.div>
      </section>

      {/* Waves SVG background moved outside the section */}
      <svg
  className="absolute bottom-0 left-0 w-full pointer-events-none h-[15vh] min-h-[100px] max-h-[150px]"
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
  </defs>
  <g className="parallax">
  <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 255, 255, 0.6)" />
  <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255, 220, 180, 0.5)" />
  <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255, 200, 150, 0.4)" />
  <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255, 180, 120, 1)" />
</g>
</svg>
    </div>
  );
}
