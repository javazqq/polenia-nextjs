import Image from "next/image";
import poleniaLogo from "/public/images/polenia-logo.png";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="h-screen relative overflow-hidden">
      <section className="bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] text-center h-full flex flex-col justify-center items-center relative pt-24 md:pt-0">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Main heading */}
          <div className="flex justify-center opacity-0 animate-fade-in-down [animation-delay:150ms]">
            <Image
              src={poleniaLogo}
              alt="Logo de Polenia Ginger Beer"
              width={700}
              height={220}
              priority
              className="mx-auto w-48 h-auto md:w-[700px] md:h-[220px]"
            />
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-2xl text-[#6153E0]/80 mb-8 max-w-2xl mx-auto leading-relaxed font-light opacity-0 animate-fade-in-down [animation-delay:300ms]">
            Cerveza de jengibre artesanal
            <br />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-down [animation-delay:500ms]">
            <Link href="/products" className="group w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-6 py-3 md:px-10 md:py-4 rounded-2xl text-base md:text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group-hover:from-[#FF6E98] group-hover:to-[#FF991F] flex items-center justify-center">
                ¡Ordena ahora!
                <span className="ml-2 flex items-center group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            <Link href="/about" className="group w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] px-6 py-3 md:px-10 md:py-4 rounded-2xl text-base md:text-lg font-semibold hover:bg-[#FFFBF4] hover:shadow-xl transition-all duration-300 border border-[#DDC7FF]">
                Saber más
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-[#6153E0]/70 opacity-0 animate-fade-in-down [animation-delay:700ms]">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-[#D6E012] rounded-full"></span>
              100% Natural
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-[#6153E0] rounded-full"></span>
              Lotes pequeños
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-[#FF991F] rounded-full"></span>
              Ingredientes locales
            </div>
          </div>
        </div>
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
              <stop offset="0%" stopColor="rgba(255, 251, 244, 0.8)" />
              <stop offset="100%" stopColor="rgba(97, 83, 224, 0.3)" />
            </linearGradient>
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="url(#waveGradient)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(221, 199, 255, 0.6)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255, 110, 152, 0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(97, 83, 224, 0.9)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
