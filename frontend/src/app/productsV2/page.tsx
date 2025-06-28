"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/api/products";
import { Plus, ArrowRight } from "lucide-react";

export default function ProductsV2Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/* Header section - Mobile first responsive */}
        <header className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight px-2 sm:px-4">
              <span className="bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                Craft Collection
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#6153E0]/70 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
              手作りクラフトジンジャービール
              <br className="hidden sm:block" />
              <span className="font-medium text-[#6153E0] block sm:inline">
                Each bottle tells a story of{" "}
                <em className="text-[#FF6E98]">bold flavors</em>
              </span>
            </p>

            {/* Decorative line
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#6153E0]/50"></div>
              <div className="w-3 h-3 bg-[#FF6E98] rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-[#6153E0]/30"></div>
              <div className="w-2 h-2 bg-[#FF991F] rounded-full animate-pulse [animation-delay:300ms]"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#6153E0]/50"></div>
            </div>
            */}
          </div>
        </header>

        {/* Loading State - Mobile optimized */}
        {isLoading && (
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 animate-pulse px-2 sm:px-4"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#DDC7FF]/20 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-3 sm:space-y-4 w-full text-center sm:text-left">
                  <div className="h-5 sm:h-6 lg:h-8 bg-[#DDC7FF]/20 rounded-full w-3/4 mx-auto sm:mx-0"></div>
                  <div className="h-3 sm:h-4 bg-[#DDC7FF]/15 rounded-full w-1/2 mx-auto sm:mx-0"></div>
                  <div className="h-8 sm:h-10 lg:h-12 bg-[#DDC7FF]/20 rounded-full w-1/3 mx-auto sm:mx-0"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#FF6E98]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-[#6153E0] mb-2">
                Something went wrong
              </h3>
              <p className="text-[#6153E0]/70">
                We couldn't load the products. Please refresh the page or try
                again later.
              </p>
            </div>
          </div>
        )}

        {/* Featured Product + Smaller Products Layout - Mobile First */}
        {!isLoading && !isError && products.length > 0 && (
          <section className="space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-24">
            {/* Main Featured Product - Mobile optimized */}
            <div className="relative mb-12 sm:mb-16 lg:mb-24 xl:mb-32">
              {/* Featured product content - Mobile first design */}
              <div className="relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
                {/* Product Image - Better mobile sizing */}
                <div className="w-full lg:w-1/2 relative order-1 lg:order-1">
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto">
                    {/* Main product image */}
                    <Image
                      src={products[0].image}
                      alt={products[0].name}
                      fill
                      className="object-contain transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
                      priority
                    />

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Product Info - Mobile optimized */}
                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-2 px-2 sm:px-4 lg:px-0">
                  {/* Product Name - Better mobile typography */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                      {products[0].name}
                    </span>
                  </h2>

                  {/* Product Description - Optimized spacing */}
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#6153E0]/70 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {products[0].description}
                  </p>

                  {/* Price - Better mobile alignment */}
                  <div className="flex items-baseline justify-center lg:justify-start gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-[#6153E0]">
                      ${products[0].price.toFixed(2)}
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg text-[#6153E0]/50">
                      per bottle
                    </span>
                  </div>

                  {/* Features badges - Better mobile layout */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start max-w-xs mx-auto lg:mx-0">
                    <span className="inline-flex items-center bg-[#6153E0]/10 text-[#6153E0] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      Natural
                    </span>
                    <span className="inline-flex items-center bg-[#FF6E98]/10 text-[#FF6E98] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      Handcrafted
                    </span>
                    <span className="inline-flex items-center bg-[#FF991F]/10 text-[#FF991F] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      Premium
                    </span>
                  </div>

                  {/* Action Buttons - Enhanced mobile UX */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4 justify-center lg:justify-start max-w-sm mx-auto lg:mx-0">
                    <Link
                      href={`/products/${products[0].id}`}
                      className="w-full sm:flex-1"
                    >
                      <button className="w-full group relative overflow-hidden bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:from-[#FF6E98] hover:to-[#FF991F] text-sm sm:text-base font-medium">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        // Add to cart logic here
                      }}
                      className="w-full sm:flex-1 group relative overflow-hidden bg-white/70 backdrop-blur-sm border-2 border-[#6153E0]/30 text-[#6153E0] hover:text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:border-[#FF6E98] hover:shadow-xl text-sm sm:text-base font-medium"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6E98] to-[#FF991F] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Products - Mobile optimized grid */}
            {products.length > 1 && (
              <div className="px-2 sm:px-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#6153E0] mb-8 sm:mb-12 text-center">
                  More from our Collection
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {products.slice(1).map((product, index) => (
                    <div key={product.id} className="group relative">
                      {/* Product container - Better mobile sizing */}
                      <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:bg-white/60 hover:shadow-2xl hover:-translate-y-2 border border-white/30">
                        {/* Small floating accent */}
                        <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>

                        {/* Product Image - Mobile optimized */}
                        <div className="relative h-36 sm:h-44 lg:h-48 mb-4 sm:mb-6">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        {/* Product Info - Mobile responsive */}
                        <div className="text-center space-y-3 sm:space-y-4">
                          <h4 className="text-lg sm:text-xl font-bold text-[#6153E0] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6153E0] group-hover:to-[#FF6E98] transition-all duration-300 leading-tight">
                            {product.name}
                          </h4>

                          <p className="text-xs sm:text-sm text-[#6153E0]/60 leading-relaxed line-clamp-2 px-1">
                            {product.description}
                          </p>

                          <div className="text-xl sm:text-2xl font-light text-[#6153E0]">
                            ${product.price.toFixed(2)}
                          </div>

                          {/* Action buttons - Enhanced mobile touch targets */}
                          <div className="flex gap-2 pt-1 sm:pt-2">
                            <Link
                              href={`/products/${product.id}`}
                              className="flex-1"
                            >
                              <button className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                                <span className="relative z-10">Details</span>
                              </button>
                            </Link>

                            <button
                              onClick={() => {
                                // Add to cart logic here
                              }}
                              className="group/btn relative overflow-hidden bg-white/80 border border-[#6153E0]/30 text-[#6153E0] hover:text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:border-[#FF6E98] min-w-[44px] flex items-center justify-center"
                            >
                              <span className="relative z-10">
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </span>
                              <div className="absolute inset-0 bg-[#FF6E98] scale-0 group-hover/btn:scale-100 transition-transform duration-300 rounded-full"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Footer - Mobile optimized */}
        {!isLoading && !isError && (
          <footer className="mt-16 sm:mt-20 lg:mt-24 text-center relative px-2 sm:px-4">
            {/* Minimal decorative element */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] rounded-full opacity-30 animate-pulse [animation-duration:6s]"></div>
            </div>

            {/* Subtle gradient line */}
            <div className="w-full max-w-sm sm:max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-[#6153E0]/30 to-transparent mb-6 sm:mb-8"></div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-[#6153E0]/60 text-xs sm:text-sm tracking-wide font-medium px-2">
                Handcrafted with Passion • Premium Ingredients • Delivered Fresh
              </p>
              <p className="text-[#6153E0]/40 text-xs px-2">
                クラフトジンジャービール専門店 • Made for the bold & curious
              </p>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}
