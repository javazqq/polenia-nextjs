"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import {
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Users,
  Award,
  Leaf,
  Heart,
  Clock,
  Globe,
} from "lucide-react";
// Distributor object shape is inferred from local data and DistributorsMap props.

// Dynamic import for the map to avoid SSR issues
const DistributorsMap = dynamic(() => import("./DistributorsMap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-96 bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 rounded-2xl flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-[#6153E0] text-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#6153E0] border-t-transparent rounded-full mx-auto mb-2"></div>
        <p>Loading map...</p>
      </div>
    </div>
  ),
});

// Distributor data with coordinates
const distributors = [
  {
    name: "Muss Cafe",
    location: "Oaxaca, México",
    type: "Specialty coffee & craft beverages",
    contact: "info@musscafe.mx",
    colorFrom: "#6153E0",
    colorTo: "#FF6E98",
    lat: 17.0732,
    lng: -96.7266,
  },
  {
    name: "Pan con Madre",
    location: "Oaxaca, México",
    type: "Artisan bakery & beverages",
    contact: "hola@panconmadre.mx",
    colorFrom: "#FF6E98",
    colorTo: "#FF991F",
    lat: 17.0654,
    lng: -96.7194,
  },
  {
    name: "La Pitaya",
    location: "Oaxaca, México",
    type: "Local restaurant & bar",
    contact: "contacto@lapitaya.mx",
    colorFrom: "#FF991F",
    colorTo: "#D6E012",
    lat: 17.0608,
    lng: -96.7264,
  },
  {
    name: "Lluvia y Cosecha",
    location: "Oaxaca, México",
    type: "Farm-to-table restaurant",
    contact: "info@lluviaycosecha.mx",
    colorFrom: "#22C55E",
    colorTo: "#6153E0",
    lat: 17.0667,
    lng: -96.7156,
  },
];

// Simple reveal wrapper to animate content when it enters the viewport
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function DistributorsBanner() {
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(
    null
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFFBF4] to-[#F8F4FF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
            Our Distributors
          </h2>
          <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
            Polenia is proud to partner with select distributors who share our
            commitment to quality and customer satisfaction. Find us at these
            trusted locations:
          </p>
        </div>

        {/* Horizontal Layout: Distributor Cards + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Distributor Cards (Right on mobile) */}
          <div
            className="order-2 lg:order-1 space-y-6 max-h-96 overflow-y-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-[#DDC7FF]/40 hover:scrollbar-track-transparent px-6 py-3 transition-all duration-300"
            role="list"
            aria-label="Distributor locations list"
          >
            {distributors.map((d) => (
              <div key={d.name} role="listitem" className="rounded-2xl">
                <button
                  type="button"
                  className={`w-full text-left bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6153E0]/50 cursor-pointer ${
                    selectedDistributor === d.name
                      ? "ring-2 ring-opacity-50"
                      : ""
                  }`}
                  style={
                    selectedDistributor === d.name
                      ? ({
                          "--tw-ring-color": d.colorFrom,
                        } as CSSProperties)
                      : undefined
                  }
                  onClick={() =>
                    setSelectedDistributor(
                      d.name === selectedDistributor ? null : d.name
                    )
                  }
                  aria-pressed={selectedDistributor === d.name}
                  aria-label={`${d.name} in ${d.location}. ${d.type}. Contact ${d.contact}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(to bottom right, ${d.colorFrom}, ${d.colorTo})`,
                      }}
                    >
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-[#6153E0] truncate">
                        {d.name}
                      </h4>
                      <p className="text-[#6153E0]/70 text-sm truncate">
                        {d.location}
                      </p>
                      <p className="text-gray-700 text-xs truncate">{d.type}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="font-medium text-xs text-[#6153E0]/80">
                      {d.contact}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: Interactive Map (First on mobile) */}
          <div
            className="order-1 lg:order-2"
            role="region"
            aria-label="Distributors map"
          >
            <DistributorsMap
              distributors={distributors}
              selectedDistributor={selectedDistributor}
              onDistributorSelect={setSelectedDistributor}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-[#6153E0]/60 text-sm">
            Click on distributor cards or map markers to explore locations • Map
            will automatically zoom to selected distributor
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#F8F4FF] relative overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] min-h-screen flex items-center py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left: Copy */}
          <Reveal className="lg:col-span-6 text-center lg:text-left space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="text-[#6153E0]">Crafting Bold, Natural</span>
              <br />
              <span className="bg-gradient-to-r from-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                Ginger Beer by Polenia
              </span>
            </h1>
            <p className="text-base md:text-xl text-[#6153E0]/70 max-w-xl mx-auto lg:mx-0">
              Small-batch, clean ingredients, and uncompromising flavor. We
              marry tradition with precision to create a bright, refreshing
              kick—every time.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#6153E0] px-4 py-2 rounded-full text-sm border border-[#DDC7FF]">
                <Sparkles className="w-4 h-4" /> 100% Natural
              </span>
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#FF6E98] px-4 py-2 rounded-full text-sm border border-[#FFCADB]">
                <Star className="w-4 h-4" /> Small Batch
              </span>
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#FF991F] px-4 py-2 rounded-full text-sm border border-[#FFD9B2]">
                <Zap className="w-4 h-4" /> Bold Flavor
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#story" className="group w-full sm:w-auto">
                <span className="inline-flex items-center justify-center w-full bg-white text-[#6153E0] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 hover:shadow-xl transition-all duration-300 border border-[#DDC7FF]">
                  Read Our Story
                </span>
              </Link>
              <Link href="/products" className="group w-full sm:w-auto">
                <span className="inline-flex items-center justify-center w-full bg-[#6153E0] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#5448c9] hover:shadow-xl transition-all duration-300">
                  Shop Now
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Right: Visual mosaic */}
          <Reveal className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-xl mx-auto lg:mx-0">
              <div className="col-span-1 aspect-[4/5] bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                <div className="text-center text-[#6153E0]/70 px-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  Ingredient Sourcing
                </div>
              </div>
              <div className="col-span-1 aspect-square bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                <div className="text-center text-[#FF6E98]/70 px-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  Slow Fermentation
                </div>
              </div>
              <div className="col-span-2 aspect-[7/3] bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                <div className="text-center text-[#FF991F]/70 px-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  Quality You Can Taste
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Copy */}
            <Reveal className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-3">
                  Our Story
                </h2>
                <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl">
                  Born from a passion for authentic flavors and traditional
                  brewing methods, Polenia blends craftsmanship with bold ginger
                  tradition.
                </p>
              </div>

              <div className="bg-[#F8F4FF] border border-[#DDC7FF]/60 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-[#6153E0] mb-3">
                  From Tradition to Innovation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Founded in 2020, we set out to create the world&#39;s most
                  flavorful ginger beer. We studied cultivation and fermentation
                  techniques across Asia, then refined our process to honor
                  tradition while embracing modern precision.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  What began as small-batch experiments is now a beloved craft
                  beverage. Every bottle speaks to our dedication to quality and
                  the perfect balance of heat, citrus, and sweetness.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-white/80 border border-white/60 p-4 text-center">
                    <span className="block text-2xl font-bold text-[#6153E0]">
                      2020
                    </span>
                    <span className="block text-xs text-[#6153E0]/70">
                      Year Founded
                    </span>
                  </div>
                  <div className="rounded-xl bg-white/80 border border-white/60 p-4 text-center">
                    <span className="block text-2xl font-bold text-[#FF6E98]">
                      50k+
                    </span>
                    <span className="block text-xs text-[#6153E0]/70">
                      Bottles Crafted
                    </span>
                  </div>
                  <div className="rounded-xl bg-white/80 border border-white/60 p-4 text-center">
                    <span className="block text-2xl font-bold text-[#FF991F]">
                      25+
                    </span>
                    <span className="block text-xs text-[#6153E0]/70">
                      Partners
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[#6153E0]">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Est. 2020</span>
                </div>
                <div className="flex items-center gap-2 text-[#FF6E98]">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Oaxaca, México</span>
                </div>
              </div>
            </Reveal>

            {/* Visual */}
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="col-span-1 aspect-square rounded-2xl border border-dashed border-[#6153E0]/30 bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 flex items-center justify-center">
                  <div className="text-center text-[#6153E0]/70">
                    <div className="w-14 h-14 bg-[#6153E0]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-7 h-7" />
                    </div>
                    Founders Photo
                    <div className="text-xs">Coming Soon</div>
                  </div>
                </div>
                <div className="col-span-1 aspect-[3/4] rounded-2xl border border-dashed border-[#FF6E98]/30 bg-gradient-to-br from-[#FF6E98]/10 to-[#FF991F]/10 flex items-center justify-center">
                  <div className="text-center text-[#FF6E98]/70 px-2">
                    Brew House
                  </div>
                </div>
                <div className="col-span-2 aspect-[7/3] rounded-2xl border border-dashed border-[#FF991F]/30 bg-gradient-to-r from-[#FF991F]/10 via-[#D6E012]/10 to-[#6153E0]/10 flex items-center justify-center">
                  <div className="text-center text-[#FF991F]/70 px-2">
                    Tasting Room
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFFBF4] to-[#F8F4FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Our Brewing Process
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              A four-step craft designed for clarity, consistency, and big
              ginger character.
            </p>
          </Reveal>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* 1 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#6153E0] to-[#FF6E98] text-white font-bold">
                  1
                </span>
                <h3 className="text-lg font-semibold text-[#6153E0]">
                  Premium Ingredients
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-700">
                Certified organic ginger and simple, clean inputs set the
                foundation.
              </p>
            </div>
            {/* 2 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6E98] to-[#FF991F] text-white font-bold">
                  2
                </span>
                <h3 className="text-lg font-semibold text-[#6153E0]">
                  Slow Fermentation
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-700">
                A patient, temperature-controlled ferment lets flavor fully
                develop.
              </p>
            </div>
            {/* 3 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF991F] to-[#D6E012] text-white font-bold">
                  3
                </span>
                <h3 className="text-lg font-semibold text-[#6153E0]">
                  Bright Finishing
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-700">
                Balanced sweetness and citrus lift give a crisp, refreshing
                snap.
              </p>
            </div>
            {/* 4 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#6153E0] to-[#FF6E98] text-white font-bold">
                  4
                </span>
                <h3 className="text-lg font-semibold text-[#6153E0]">
                  Quality Control
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-700">
                Tasting, testing, and adjustments to ensure consistency in every
                batch.
              </p>
            </div>
          </div>

          {/* Process Gallery */}
          <Reveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="aspect-video rounded-2xl border border-dashed border-[#6153E0]/30 bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 flex items-center justify-center p-4">
              <div className="text-center text-[#6153E0]/70">
                <div className="w-12 h-12 bg-[#6153E0]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                Ingredient Sourcing
                <div className="text-xs">Photo Coming Soon</div>
              </div>
            </div>
            <div className="aspect-video rounded-2xl border border-dashed border-[#FF6E98]/30 bg-gradient-to-br from-[#FF6E98]/10 to-[#FF991F]/10 flex items-center justify-center p-4">
              <div className="text-center text-[#FF6E98]/70">
                <div className="w-12 h-12 bg-[#FF6E98]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                Brewing Process
                <div className="text-xs">Photo Coming Soon</div>
              </div>
            </div>
            <div className="aspect-video rounded-2xl border border-dashed border-[#FF991F]/30 bg-gradient-to-br from-[#FF991F]/10 to-[#D6E012]/10 flex items-center justify-center p-4">
              <div className="text-center text-[#FF991F]/70">
                <div className="w-12 h-12 bg-[#FF991F]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                Final Product
                <div className="text-xs">Photo Coming Soon</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Our Values
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              The principles that shape how we source, craft, and serve.
            </p>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Sparkles,
                title: "Authenticity",
                colorFrom: "#6153E0",
                colorTo: "#FF6E98",
                body: "Tradition-first brewing with modern precision where it counts.",
              },
              {
                icon: Leaf,
                title: "Sustainability",
                colorFrom: "#FF6E98",
                colorTo: "#FF991F",
                body: "Thoughtful sourcing and packaging to reduce our footprint.",
              },
              {
                icon: Heart,
                title: "Community",
                colorFrom: "#FF991F",
                colorTo: "#D6E012",
                body: "Partners, growers, and customers united by better beverages.",
              },
              {
                icon: Star,
                title: "Excellence",
                colorFrom: "#D6E012",
                colorTo: "#6153E0",
                body: "Relentless standards from the first root to the final pour.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-[#FFFBF4]/60 backdrop-blur-sm border border-[#DDC7FF]/60 shadow-sm p-6 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: `linear-gradient(to bottom right, ${v.colorFrom}, ${v.colorTo})`,
                  }}
                >
                  <v.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#6153E0] mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base">{v.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8F4FF] to-[#E8E1FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              The people behind Polenia—craft, quality, and community in every
              decision.
            </p>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6 md:p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="w-32 h-32 bg-gradient-to-br from-[#6153E0]/20 to-[#FF6E98]/20 rounded-full mx-auto mb-6 border-4 border-dashed border-[#6153E0]/30 flex items-center justify-center">
                <div className="text-[#6153E0]/70">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-xs">Photo</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-1">
                Leiss Mirón
              </h3>
              <p className="text-[#FF6E98] font-medium mb-3">
                Founder & Master Brewer
              </p>
              <p className="text-gray-700 text-sm">
                With 15+ years in beverage crafting, Leiss brings traditional
                brewing wisdom to each batch.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6 md:p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF6E98]/20 to-[#FF991F]/20 rounded-full mx-auto mb-6 border-4 border-dashed border-[#FF6E98]/30 flex items-center justify-center">
                <div className="text-[#FF6E98]/70">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-xs">Photo</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-1">
                Jorge Vazquez
              </h3>
              <p className="text-[#FF6E98] font-medium mb-3">
                Head of Quality & Innovation
              </p>
              <p className="text-gray-700 text-sm">
                Jorge leads our R&D and quality checks to keep flavor and
                consistency high.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Distributors Section - Carousel Banner */}
      <DistributorsBanner />

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/2"></div>
          <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Experience Polenia?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the
            perfect balance of tradition, quality, and bold flavor in every
            bottle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/products" className="group w-full sm:w-auto">
              <span className="inline-flex w-full bg-white text-[#6153E0] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg font-bold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 items-center justify-center gap-3">
                Shop Our Collection
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            <Link href="/contact" className="group w-full sm:w-auto">
              <span className="inline-flex w-full bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg font-bold hover:bg-white hover:text-[#6153E0] transition-all duration-300 items-center justify-center">
                Get In Touch
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
