"use client";

import { motion } from "framer-motion";
import { Sparkles, Beer, ShieldCheck, Zap, Heart, Award } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Beer,
      title: "Authentic Flavor",
      desc: "Our ginger beer is brewed with freshly ground ginger root, delivering a bold, zesty kick and a warming spice that captures the essence of traditional craft recipes.",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-100",
      color: "text-amber-700",
      stats: "15+ spices",
    },
    {
      icon: ShieldCheck,
      title: "Natural Ingredients",
      desc: "We use only natural, responsibly sourced ingredients — no artificial sweeteners, preservatives, or additives — just clean, honest refreshment you can feel good about.",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
      color: "text-green-700",
      stats: "100% organic",
    },
    {
      icon: Sparkles,
      title: "Craft Quality",
      desc: "Made in small batches for superior taste and consistency, each bottle reflects our dedication to traditional brewing techniques and uncompromising quality.",
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-100",
      color: "text-purple-700",
      stats: "Small batch",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            🍻 The Craft Behind the Fizz
          </motion.span>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 mb-6 leading-tight">
            Why Choose
            <br />
            <span className="text-4xl md:text-5xl">Our Ginger Beer?</span>
          </h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-amber-800/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Every bottle tells a story of <span className="font-semibold text-amber-900">passion</span>, 
            <span className="font-semibold text-amber-900"> tradition</span>, and 
            <span className="font-semibold text-amber-900"> uncompromising quality</span>.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 text-amber-800">
              <Award size={20} className="text-amber-600" />
              <span className="font-semibold">Award Winning</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-800">
              <Heart size={20} className="text-red-500" />
              <span className="font-semibold">Made with Love</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-800">
              <Zap size={20} className="text-yellow-500" />
              <span className="font-semibold">Bold & Spicy</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:border-amber-200/50 h-full flex flex-col`}>
                {/* Stats Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/80 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-amber-800">
                    {feature.stats}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className="flex justify-center mb-6"
                >
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300,
                      damping: 15,
                    }}
                    className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`text-2xl font-bold ${feature.color} mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`${feature.color} opacity-80 leading-relaxed text-base flex-1`}>
                    {feature.desc}
                  </p>

                  {/* Interactive Element */}
                  <motion.div
                    className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-lg text-amber-800/70 mb-6">
            Ready to taste the difference?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-900 to-orange-800 text-white font-bold px-10 py-4 rounded-2xl hover:from-amber-800 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Experience the Craft
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}