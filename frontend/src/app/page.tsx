import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import MovingBanner from "@/components/Banner";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="snap-start">
        <Hero />
      </section>
      <section className="snap-start">
        <FeaturedProducts />
      </section>
      <section className="snap-start">
        <Features />
      </section>
      <section className="snap-start">
        <CTA />
      </section>
    </div>
  );
}