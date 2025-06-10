import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import MovingBanner from "@/components/Banner";
export default function Home() {
  return (
    <>
    <Hero  />
    <MovingBanner text="🔥 Ginger Beer – Freshly Brewed • Spicy • Refreshing • Limited Stock • Order Now! " speed={50} />
    <FeaturedProducts  />
    <Features   />
    <CTA />

    </>

  );
}
