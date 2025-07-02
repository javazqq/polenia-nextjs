import Image from "next/image";
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F4FF] relative overflow-hidden">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] h-full flex items-center relative py-24 sm:py-0">
          {/* Background geometric elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large circle */}
            <div className="absolute top-1/4 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#6153E0]/20 to-[#FF6E98]/20 rounded-full transform translate-x-1/2 -translate-y-1/4"></div>

            {/* Medium circle */}
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-[#FF991F]/30 to-[#D6E012]/20 rounded-full"></div>

            {/* Small floating elements */}
            <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#FF6E98]/40 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-2/3 right-1/2 w-8 h-8 bg-[#6153E0]/50 rounded-full animate-bounce [animation-delay:2s]"></div>

            {/* Geometric shapes */}
            <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-gradient-to-r from-[#D6E012] to-[#FF991F] transform rotate-45 animate-spin [animation-duration:8s]"></div>
            <div className="absolute top-1/2 right-1/6 w-6 h-20 bg-gradient-to-b from-[#6153E0]/60 to-transparent transform rotate-12"></div>
          </div>

          {/* Hero content - Centered on mobile, left-aligned on desktop */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Tagline */}
              <div className="opacity-0 animate-fade-in-right [animation-delay:300ms]">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#6153E0] leading-tight">
                  About Our Story
                  <br />
                  <span className="bg-gradient-to-r from-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                    & Mission
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-[#6153E0]/70 mt-4 max-w-lg leading-relaxed">
                  クラフトジンジャービール専門店
                  <br />
                  <span className="font-medium text-[#6153E0]">
                    Discover the passion behind{" "}
                    <em className="text-[#FF6E98]">every bottle</em>
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
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-right [animation-delay:600ms] justify-center lg:justify-start">
                <a href="/products" className="group">
                </a>
                <a href="#story" className="group">
                  <button className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-[#6153E0] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 border border-[#DDC7FF] group-hover:border-[#6153E0]">
                    Read Our Story
                  </button>
                </a>
              </div>
            </div>

            {/* Right column - Visual element */}
            <div className="relative opacity-0 animate-fade-in-left [animation-delay:400ms] max-w-md mx-auto lg:max-w-none">
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
                      Our Promise
                    </h3>
                    <p className="text-[#6153E0]/70 leading-relaxed">
                      We believe in crafting more than just beverages - we
                      create experiences that bring people together, one
                      authentic sip at a time.
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

      {/* Our Story Section */}
      <section id="story" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Our Story
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              Born from a passion for authentic flavors and traditional brewing
              methods, Polenia represents the perfect fusion of Japanese
              craftsmanship and bold ginger tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-20">
            {/* Story Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-[#6153E0]">
                From Tradition to Innovation
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2020 by a team of beverage enthusiasts in Tokyo,
                Polenia was born from a simple desire: to create the world's
                most authentic and flavorful ginger beer. Our founders traveled
                across Southeast Asia, studying traditional ginger cultivation
                and fermentation techniques.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                What started as weekend experiments in a small kitchen has grown
                into a beloved brand that honors both tradition and innovation.
                Every bottle tells a story of dedication, quality, and the
                relentless pursuit of the perfect balance between spice and
                refreshment.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-[#6153E0]">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Est. 2020</span>
                </div>
                <div className="flex items-center gap-2 text-[#FF6E98]">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Oaxaca, México</span>
                </div>
              </div>
            </div>

            {/* Story Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 rounded-3xl border-2 border-dashed border-[#6153E0]/30 flex items-center justify-center">
                <div className="text-center text-[#6153E0]/60">
                  <div className="w-16 h-16 bg-[#6153E0]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="font-medium">Founders Photo</p>
                  <p className="text-sm">Coming Soon</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FF991F] rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#D6E012] rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#FFFBF4] to-[#F8F4FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Our Brewing Process
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              Every bottle of Polenia follows a meticulous process that combines
              time-honored techniques with modern precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
            {/* Process Step 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                1. Premium Ingredients
              </h3>
              <p className="text-gray-700">
                We source the finest organic ginger roots from certified farms,
                ensuring each batch starts with the highest quality ingredients.
              </p>
            </div>

            {/* Process Step 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                2. Slow Fermentation
              </h3>
              <p className="text-gray-700">
                Our traditional fermentation process takes 14 days, allowing the
                natural flavors to develop their full complexity and depth.
              </p>
            </div>

            {/* Process Step 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                3. Quality Control
              </h3>
              <p className="text-gray-700">
                Every batch undergoes rigorous testing to ensure it meets our
                exacting standards for taste, quality, and consistency.
              </p>
            </div>
          </div>

          {/* Process Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {/* Image 1 */}
            <div className="aspect-video bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 rounded-2xl border-2 border-dashed border-[#6153E0]/30 flex items-center justify-center p-4">
              <div className="text-center text-[#6153E0]/60">
                <div className="w-12 h-12 bg-[#6153E0]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <p className="font-medium">Ingredient Sourcing</p>
                <p className="text-sm">Photo Coming Soon</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="aspect-video bg-gradient-to-br from-[#FF6E98]/10 to-[#FF991F]/10 rounded-2xl border-2 border-dashed border-[#FF6E98]/30 flex items-center justify-center p-4">
              <div className="text-center text-[#FF6E98]/60">
                <div className="w-12 h-12 bg-[#FF6E98]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="font-medium">Brewing Process</p>
                <p className="text-sm">Photo Coming Soon</p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="aspect-video bg-gradient-to-br from-[#FF991F]/10 to-[#D6E012]/10 rounded-2xl border-2 border-dashed border-[#FF991F]/30 flex items-center justify-center p-4">
              <div className="text-center text-[#FF991F]/60">
                <div className="w-12 h-12 bg-[#FF991F]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <p className="font-medium">Final Product</p>
                <p className="text-sm">Photo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Our Values
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              These core principles guide everything we do, from sourcing
              ingredients to delivering the final product to your door.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Value 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                Authenticity
              </h3>
              <p className="text-gray-700">
                We stay true to traditional brewing methods while embracing
                innovation that enhances quality.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                Sustainability
              </h3>
              <p className="text-gray-700">
                From eco-friendly packaging to sustainable sourcing, we're
                committed to protecting our planet.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                Community
              </h3>
              <p className="text-gray-700">
                We believe in building connections and supporting the
                communities that make our work possible.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D6E012] to-[#6153E0] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-4">
                Excellence
              </h3>
              <p className="text-gray-700">
                We never compromise on quality, ensuring every bottle exceeds
                expectations and delights the senses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#F8F4FF] to-[#E8E1FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6153E0] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              The passionate individuals behind every bottle of Polenia,
              dedicated to bringing you the finest craft ginger beer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#6153E0]/20 to-[#FF6E98]/20 rounded-full mx-auto mb-6 border-4 border-dashed border-[#6153E0]/30 flex items-center justify-center">
                <div className="text-[#6153E0]/60">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Photo</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-2">
                Leiss Mirón
              </h3>
              <p className="text-[#FF6E98] font-medium mb-4">
                Founder & Master Brewer
              </p>
              <p className="text-gray-700 text-sm">
                With over 15 years in beverage crafting, Leiss brings
                traditional Japanese brewing wisdom to every batch of Polenia.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF6E98]/20 to-[#FF991F]/20 rounded-full mx-auto mb-6 border-4 border-dashed border-[#FF6E98]/30 flex items-center justify-center">
                <div className="text-[#FF6E98]/60">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Photo</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#6153E0] mb-2">
                Jorge Vazquez
              </h3>
              <p className="text-[#FF6E98] font-medium mb-4">
                Head of Quality & Innovation
              </p>
              <p className="text-gray-700 text-sm">
                Jorge ensures every bottle meets our exacting standards while
                leading our research into new flavor profiles and brewing
                techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/2"></div>
          <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Polenia?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the
            perfect balance of tradition, quality, and bold flavor in every
            bottle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a href="/products" className="group">
              <button className="w-full sm:w-auto bg-white text-[#6153E0] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg font-bold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                Shop Our Collection
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
            <a href="/contact" className="group">
              <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg font-bold hover:bg-white hover:text-[#6153E0] transition-all duration-300">
                Get In Touch
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
