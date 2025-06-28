import Image from "next/image";
import poleniaLogo from "/public/images/polenia-logo.png";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";

export default function HeroV2() {
  return (
    <div className="h-screen relative overflow-hidden">
      <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] h-full flex items-center relative">
        {/* Background geometric elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large circle */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-[#6153E0]/20 to-[#FF6E98]/20 rounded-full transform translate-x-1/2 -translate-y-1/4"></div>

          {/* Medium circle */}
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-[#FF991F]/30 to-[#D6E012]/20 rounded-full"></div>

          {/* Small floating elements */}
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#FF6E98]/40 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-2/3 right-1/2 w-8 h-8 bg-[#6153E0]/50 rounded-full animate-bounce [animation-delay:2s]"></div>

          {/* Geometric shapes */}
          <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-gradient-to-r from-[#D6E012] to-[#FF991F] transform rotate-45 animate-spin [animation-duration:8s]"></div>
          <div className="absolute top-1/2 right-1/6 w-6 h-20 bg-gradient-to-b from-[#6153E0]/60 to-transparent transform rotate-12"></div>
        </div>

        {/* Hero content - Left aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-left space-y-8">
            {/* Logo */}
            <div className="opacity-0 animate-fade-in-right [animation-delay:150ms]">
              <Image
                src={poleniaLogo}
                alt="Polenia Ginger Beer Logo"
                width={400}
                height={125}
                priority
                className="w-64 h-auto md:w-96"
              />
            </div>

            {/* Tagline */}
            <div className="opacity-0 animate-fade-in-right [animation-delay:300ms]">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#6153E0] leading-tight">
                Premium Craft
                <br />
                <span className="bg-gradient-to-r from-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                  Ginger Beer
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#6153E0]/70 mt-4 max-w-lg leading-relaxed">
                クラフトジンジャービール専門店
                <br />
                <span className="font-medium text-[#6153E0]">
                  Handcrafted for the{" "}
                  <em className="text-[#FF6E98]">bold & curious</em>
                </span>
              </p>
            </div>

            {/* Features badges */}
            <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-right [animation-delay:450ms]">
              <span className="inline-flex items-center gap-2 bg-[#6153E0]/10 text-[#6153E0] px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                100% Natural
              </span>
              <span className="inline-flex items-center gap-2 bg-[#FF6E98]/10 text-[#FF6E98] px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                Small Batch
              </span>
              <span className="inline-flex items-center gap-2 bg-[#FF991F]/10 text-[#FF991F] px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                Bold Flavor
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-right [animation-delay:600ms]">
              <a href="/products" className="group">
                <button className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group-hover:from-[#FF6E98] group-hover:to-[#FF991F] flex items-center justify-center gap-2">
                  今すぐ注文！
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </a>
              <a href="/about" className="group">
                <button className="bg-white/80 backdrop-blur-sm text-[#6153E0] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 border border-[#DDC7FF] group-hover:border-[#6153E0]">
                  Learn More
                </button>
              </a>
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="relative opacity-0 animate-fade-in-left [animation-delay:400ms]">
            {/* Main visual container */}
            <div className="relative">
              {/* Background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6153E0]/20 via-[#FF6E98]/20 to-[#FF991F]/20 rounded-3xl transform rotate-3 scale-105"></div>

              {/* Content area */}
              <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/40 shadow-2xl">
                {/* Decorative elements inside */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#D6E012] to-[#FF991F] rounded-full opacity-20"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-[#6153E0] to-[#FF6E98] rounded-lg opacity-30 transform rotate-12"></div>

                {/* Text content */}
                <div className="relative z-10 text-center space-y-4">
                  <h3 className="text-2xl font-bold text-[#6153E0]">
                    Authentic Taste
                  </h3>
                  <p className="text-[#6153E0]/70 leading-relaxed">
                    Each bottle is carefully crafted with premium ginger root
                    and natural ingredients, delivering an authentic spicy kick
                    that awakens your senses.
                  </p>
                  <div className="flex justify-center gap-2 pt-4">
                    <div className="w-3 h-3 bg-[#6153E0] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#FF6E98] rounded-full animate-pulse [animation-delay:200ms]"></div>
                    <div className="w-3 h-3 bg-[#FF991F] rounded-full animate-pulse [animation-delay:400ms]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#FF991F]"></div>
      </section>
    </div>
  );
}
