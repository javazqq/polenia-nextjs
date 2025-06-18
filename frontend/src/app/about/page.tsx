// src/app/about/page.tsx
"use client";

import {
  Flame,
  Heart,
  Leaf,
  ArrowRight,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#DDC7FF]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#D6E012]/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#FF6E98]/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto animate-fade-in-down">
          {/* Header Section */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] rounded-full text-sm font-semibold border border-[#DDC7FF]/50 mb-6 animate-fade-in-down delay-100">
              ✨ Our Story
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#6153E0] leading-tight mb-6 animate-fade-in-down delay-200">
              Meet Polenia
            </h1>

            <p className="text-xl md:text-2xl text-[#6153E0]/80 leading-relaxed max-w-4xl mx-auto animate-fade-in-down delay-300">
              Polenia isn't just a ginger beer — it's a spark in a bottle.
              Brewed in small batches, born from a craving for boldness, and
              infused with nature's fire — real ginger.
            </p>
          </div>

          {/* Story Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Story Card */}
            <div className="bg-[#FFFBF4]/80 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 hover:border-[#FF6E98]/50 transition-all duration-300 group animate-fade-in-down delay-400 hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Flame size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#6153E0] mb-4">
                A Sip of Our Story
              </h3>
              <p className="text-[#6153E0]/70 leading-relaxed">
                It all began in a cozy kitchen, where a family recipe met a wild
                idea: "Let's bottle the zing!" What started as weekend
                experiments turned into Polenia — a name inspired by old-world
                charm and new-world flavor.
              </p>
            </div>

            {/* Values Card */}
            <div className="bg-[#FFFBF4]/80 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 hover:border-[#FF6E98]/50 transition-all duration-300 group animate-fade-in-down delay-500 hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D6E012] to-[#6153E0] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Leaf size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#6153E0] mb-4">
                What Drives Us
              </h3>
              <p className="text-[#6153E0]/70 leading-relaxed">
                We believe ginger beer should be more than just fizzy. It should
                be fiery, full-bodied, and fearless — with only raw ginger, cane
                sugar, citrus, and a whole lot of heart.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-[#FFFBF4]/80 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 hover:border-[#FF6E98]/50 transition-all duration-300 group md:col-span-2 lg:col-span-1 animate-fade-in-down delay-600 hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6E98] to-[#6153E0] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#6153E0] mb-4">
                Our Mission
              </h3>
              <p className="text-[#6153E0]/70 leading-relaxed">
                To awaken taste buds and ignite conversation — one bottle at a
                time. We're here for the flavor-seekers, the craft lovers, and
                anyone tired of bland. This is ginger beer that bites back.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-[#DDC7FF]/30 mb-20 animate-fade-in-down delay-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#6153E0] mb-2">
                  100%
                </div>
                <div className="text-[#6153E0]/70 font-medium">
                  Natural Ingredients
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#6153E0] mb-2">5★</div>
                <div className="text-[#6153E0]/70 font-medium">
                  Customer Rating
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#6153E0] mb-2">
                  10k+
                </div>
                <div className="text-[#6153E0]/70 font-medium">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#6153E0] mb-2">
                  2019
                </div>
                <div className="text-[#6153E0]/70 font-medium">Founded</div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20 animate-fade-in-down delay-800">
            <div className="text-center p-6 animate-fade-in-down delay-900">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D6E012]/20 to-[#D6E012]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D6E012]/30">
                <Sparkles size={28} className="text-[#6153E0]" />
              </div>
              <h4 className="text-xl font-bold text-[#6153E0] mb-2">
                Premium Quality
              </h4>
              <p className="text-[#6153E0]/70">
                Every bottle is crafted with care using only the finest
                ingredients
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in-down delay-[1000ms]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DDC7FF]/30 to-[#DDC7FF]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#DDC7FF]/50">
                <Users size={28} className="text-[#6153E0]" />
              </div>
              <h4 className="text-xl font-bold text-[#6153E0] mb-2">
                Community First
              </h4>
              <p className="text-[#6153E0]/70">
                Building connections through shared love of exceptional flavor
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in-down delay-[1100ms]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6E98]/20 to-[#FF6E98]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#FF6E98]/30">
                <Award size={28} className="text-[#6153E0]" />
              </div>
              <h4 className="text-xl font-bold text-[#6153E0] mb-2">
                Award Winning
              </h4>
              <p className="text-[#6153E0]/70">
                Recognized for excellence in craft beverage innovation
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-fade-in-down delay-[1200ms]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-6">
              Ready to experience the difference?
            </h2>
            <p className="text-lg text-[#6153E0]/70 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've discovered what real
              ginger beer should taste like.
            </p>

            <div className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-bold px-8 py-4 rounded-2xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Explore Our Brews</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
