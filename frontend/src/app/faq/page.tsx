"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  Star,
  Zap,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Users,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import poleniaLogo from "/public/images/polenia-logo.png";

const faqCategories = [
  {
    title: "Product Information",
    icon: <Info className="w-5 h-5" />,
    color: "from-[#6153E0] to-[#FF6E98]",
    faqs: [
      {
        question: "What makes Polenia Ginger Beer unique?",
        answer:
          "Polenia stands apart with our commitment to authenticity. We use real, organic ginger root sourced from premium farms, employ traditional small-batch brewing methods, and refuse to use artificial sweeteners or preservatives. Our 14-day fermentation process allows natural flavors to develop their full complexity, creating a bold, spicy kick that awakens your senses while maintaining perfect balance.",
      },
      {
        question: "Is Polenia Ginger Beer alcoholic?",
        answer:
          "No, Polenia is a completely non-alcoholic craft beverage. Our brewing process creates natural carbonation and complex flavors without any alcohol content, making it perfect for all ages and occasions. You can enjoy it anytime, anywhere, without any concerns about alcohol consumption.",
      },
      {
        question: "What ingredients do you use?",
        answer:
          "We use only the finest natural ingredients: organic ginger root, pure cane sugar, filtered water, natural lime juice, and our proprietary blend of spices including cardamom and black pepper. No artificial flavors, colors, or preservatives are ever used in our brewing process.",
      },
      {
        question: "How spicy is Polenia Ginger Beer?",
        answer:
          "Polenia has a bold, authentic ginger bite that's more pronounced than typical commercial ginger beers, but it's balanced with subtle sweetness. On a scale of 1-10, we'd rate it around 6-7 for spice level. The heat comes from real ginger, so it's a warming, pleasant sensation rather than overwhelming.",
      },
    ],
  },
  {
    title: "Ordering & Shipping",
    icon: <Star className="w-5 h-5" />,
    color: "from-[#FF6E98] to-[#FF991F]",
    faqs: [
      {
        question: "Where do you ship?",
        answer:
          "We currently ship across all 50 US states, with most orders arriving within 3-5 business days. We're working on expanding to Canada and select international markets in 2025. Free shipping is available on orders over $50.",
      },
      {
        question: "How is Polenia packaged for shipping?",
        answer:
          "Each order is carefully packed in eco-friendly, recyclable materials with protective cushioning to ensure your bottles arrive in perfect condition. We use temperature-controlled shipping during extreme weather to maintain product quality.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely! You'll receive a tracking number via email as soon as your order ships. You can also log into your account on our website to view real-time order status and delivery updates.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "If any bottles arrive damaged, please contact us within 48 hours with photos of the damage. We'll immediately send replacements at no charge and work with our shipping partners to prevent future issues.",
      },
    ],
  },
  {
    title: "Usage & Recipes",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-[#FF991F] to-[#D6E012]",
    faqs: [
      {
        question: "Can I use Polenia in cocktails?",
        answer:
          "Absolutely! Polenia is exceptional in cocktails. Try it in Moscow Mules, Dark & Stormy cocktails, or gin and ginger highballs. Its bold flavor profile holds up beautifully against spirits and adds complexity to mixed drinks. We have a recipe collection on our website with creative cocktail ideas.",
      },
      {
        question: "What food pairs well with Polenia?",
        answer:
          "Polenia pairs wonderfully with spicy foods like Thai or Indian cuisine, grilled meats, aged cheeses, and chocolate desserts. The ginger's heat complements spicy dishes while cleansing the palate, and its complexity enhances rich, savory flavors.",
      },
      {
        question: "How should I serve Polenia?",
        answer:
          "For the best experience, serve Polenia well-chilled over ice in a tall glass. Garnish with a lime wedge or fresh mint sprig. The cold temperature helps balance the ginger's heat while the garnish adds aromatic complexity.",
      },
      {
        question: "Can I cook with Polenia Ginger Beer?",
        answer:
          "Yes! Polenia works great in cooking. Use it for beer-battered fish, marinades for chicken or pork, glazes for ham, or even in desserts like ginger beer floats or poaching liquids for pears. The cooking process mellows the spice while concentrating the ginger flavor.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#E8E1FF] via-[#F8F4FF] to-[#F8F4FF] text-center py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          {/* Standalone Logo */}
          {/* <div className="mb-12 flex justify-center">
            <Image
              src={poleniaLogo}
              alt="Polenia Ginger Beer Logo"
              width={320}
              height={99}
              priority
              className="w-80 h-auto"
            />
          </div> */}

          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-[#6153E0] mb-4">
              Got Questions?
            </h1>
            <p className="text-xl md:text-2xl text-[#6153E0]/80 max-w-2xl mx-auto leading-relaxed">
              Welcome to the Polenia FAQ center. Find answers to everything
              about our craft ginger beer.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <a
              href="#faq"
              className="inline-block bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore FAQs
            </a>
          </div>
        </div>

        {/* Angled Shape Divider */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-white"
          style={{
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
          }}
        ></div>
      </section>

      {/* FAQ Categories Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6153E0] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              Find answers to common questions about our craft ginger beer,
              organized by category for your convenience.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : "bg-white/80 text-[#6153E0] hover:bg-white hover:shadow-md border border-[#DDC7FF]/30"
                }`}
              >
                <div
                  className={`${activeCategory === index ? "text-white" : "text-[#6153E0]"}`}
                >
                  {category.icon}
                </div>
                {category.title}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqCategories[activeCategory].faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center text-left p-6 text-[#6153E0] text-lg font-semibold group"
                    onClick={() => toggle(index)}
                  >
                    <span className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${faqCategories[activeCategory].color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        {faqCategories[activeCategory].icon}
                      </div>
                      <span className="group-hover:text-[#FF6E98] transition-colors">
                        {faq.question}
                      </span>
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown
                        className="text-[#6153E0] group-hover:text-[#FF6E98] transition-colors"
                        size={24}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="bg-gradient-to-br from-[#FFFBF4] to-[#F8F4FF] rounded-2xl p-6 border border-[#DDC7FF]/30">
                            <p className="text-[#6153E0]/80 text-base leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFFBF4] to-[#F8F4FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6153E0] mb-4">
              Why Choose Polenia?
            </h2>
            <p className="text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              The numbers speak for themselves - quality, satisfaction, and
              authenticity in every bottle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#6153E0] mb-2">
                14 Days
              </h3>
              <p className="text-[#6153E0]/70 font-medium mb-2">
                Fermentation Process
              </p>
              <p className="text-sm text-gray-600">
                Traditional slow brewing for complex flavors
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#6153E0] mb-2">98%</h3>
              <p className="text-[#6153E0]/70 font-medium mb-2">
                Customer Satisfaction
              </p>
              <p className="text-sm text-gray-600">
                Based on verified customer reviews
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#6153E0] mb-2">100%</h3>
              <p className="text-[#6153E0]/70 font-medium mb-2">
                Natural Ingredients
              </p>
              <p className="text-sm text-gray-600">
                No artificial flavors or preservatives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6153E0] mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-[#6153E0]/70 max-w-3xl mx-auto">
              Our friendly support team is here to help with any questions not
              covered in our FAQ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Options */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#6153E0] mb-6">
                Get In Touch
              </h3>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#6153E0]/10 to-[#FF6E98]/10 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#6153E0]">
                    Email Support
                  </h4>
                  <p className="text-[#6153E0]/70">support@polenia.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FF6E98]/10 to-[#FF991F]/10 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#6153E0]">
                    Phone Support
                  </h4>
                  <p className="text-[#6153E0]/70">1-800-POLENIA</p>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FF991F]/10 to-[#D6E012]/10 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#6153E0]">Live Chat</h4>
                  <p className="text-[#6153E0]/70">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 rounded-3xl border-2 border-dashed border-[#6153E0]/30 p-8 flex items-center justify-center">
              <div className="text-center text-[#6153E0]/60">
                <div className="w-16 h-16 bg-[#6153E0]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Contact Form</h3>
                <p className="mb-4">Quick contact form coming soon!</p>
                <p className="text-sm">
                  For now, please use the contact options on the left
                </p>
              </div>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Try Polenia?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Now that you know everything about our craft ginger beer, it's time
            to experience the authentic taste for yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/products" className="group">
              <button className="bg-white text-[#6153E0] px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                Shop Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
            <a href="/about" className="group">
              <button className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white hover:text-[#6153E0] transition-all duration-300">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
