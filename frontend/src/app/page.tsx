"use client";

import dynamic from "next/dynamic";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

// Dynamically import components with SSR disabled for client-only features
const Hero = dynamic(() => import("@/components/HeroV2"), { ssr: false });
const FeaturedProducts = dynamic(
  () => import("@/components/FeaturedProducts"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="overflow-y-scroll snap-y snap-mandatory">
      <section className="snap-start min-h-screen">
        <Hero />
      </section>
      {/* <section className="snap-start min-h-screen">
        <FeaturedProducts />
      </section>
      <section className="snap-start min-h-screen">
        <Features />
      </section>
      <section className="snap-start min-h-screen">
        <CTA />
      </section> */}
    </div>
  );
}
