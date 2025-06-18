"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/api/products";
import { ArrowRight, ShoppingCart, Star, Heart } from "lucide-react";

const ProductCard = memo(function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group h-full bg-[#FFFBF4]/90 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#DDC7FF]/30 group-hover:border-[#FF6E98]/50 flex flex-col opacity-0 animate-fade-in-down [animation-delay:600ms]">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col">
        {/* Image Container - Reserved Space */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#DDC7FF]/30 to-[#FF6E98]/20">
          {/* Loading Skeleton for individual image */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#DDC7FF]/20 to-[#FF6E98]/10 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#DDC7FF]/30 border-t-[#6153E0] rounded-full animate-spin opacity-50"></div>
              </div>
            </div>
          )}

          {/* Badge */}
          {index < 3 && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </span>
            </div>
          )}

          {/* Heart/Favorite Button */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#6153E0] shadow-lg hover:text-[#FF6E98] transition-colors">
              <Heart size={14} />
            </button>
          </div>

          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-110 transition-all duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading={index < 4 ? "eager" : "lazy"} // Load first 4 images eagerly
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)} // Also set loaded on error to hide skeleton
          />

          {/* Enhanced overlay with quick add button */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#6153E0]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-white/90 text-[#6153E0] py-2 rounded-xl font-semibold hover:bg-white transition-all duration-200 flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                Quick Add
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product stats */}
          <div className="flex justify-between items-center text-xs text-[#6153E0]/60 mb-3">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#D6E012] rounded-full"></div>
              4.8★ (24 reviews)
            </span>
            <span>350ml</span>
          </div>

          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-[#6153E0] group-hover:text-[#FF6E98] transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={20} className="text-[#6153E0]" />
            </div>
          </div>

          <p className="text-[#6153E0]/70 text-sm line-clamp-2 mb-4 leading-relaxed h-10 flex items-start">
            {product.description}
          </p>

          {/* Ingredient highlights */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-1">
              {["🫚", "🍋", "🌿"].map((emoji, i) => (
                <span
                  key={i}
                  className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-xs border border-[#DDC7FF]/30"
                >
                  {emoji}
                </span>
              ))}
            </div>
            <span className="text-xs text-[#6153E0]/60">Fresh ingredients</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            <span className="text-xs bg-[#D6E012]/20 text-[#6153E0] px-2 py-1 rounded-full border border-[#D6E012]/30">
              Natural
            </span>
            <span className="text-xs bg-[#DDC7FF]/30 text-[#6153E0] px-2 py-1 rounded-full border border-[#DDC7FF]/50">
              Organic
            </span>
          </div>
        </div>
      </Link>

      {/* Price and CTA */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-[#6153E0]">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-[#6153E0]/60 ml-1">each</span>
          </div>
          <button className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300 flex items-center space-x-2 shadow-lg">
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Classic", "Spicy", "Fruity", "Limited Edition"];

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

  // Filter products by category
  // const filteredProducts =
  //   selectedCategory === "All"
  //     ? products
  //     : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#DDC7FF]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-20">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto opacity-0 animate-fade-in-down">
          <span className="inline-block px-4 py-2 bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] rounded-full text-sm font-semibold mb-6 border border-[#DDC7FF]/50 opacity-0 animate-fade-in-down [animation-delay:100ms]">
            ✨ Premium Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#6153E0] mb-6 opacity-0 animate-fade-in-down [animation-delay:200ms] leading-tight pb-2">
            Ginger Beer
          </h1>
          <p className="text-lg md:text-xl text-[#6153E0]/80 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-down [animation-delay:300ms]">
            Discover our complete range of handcrafted ginger beers, each bottle
            a testament to quality and tradition
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-4 justify-center mb-12 overflow-x-auto pb-2 opacity-0 animate-fade-in-down [animation-delay:400ms]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-[#6153E0] text-white shadow-lg shadow-[#6153E0]/25"
                  : "bg-white/70 backdrop-blur-sm text-[#6153E0] hover:bg-white hover:shadow-md border border-[#DDC7FF]/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#FFFBF4]/60 rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-[#DDC7FF]/30"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-[#DDC7FF]/30 rounded w-3/4"></div>
                  <div className="h-4 bg-[#DDC7FF]/20 rounded w-full"></div>
                  <div className="h-4 bg-[#DDC7FF]/20 rounded w-2/3"></div>
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-[#DDC7FF]/20 rounded-full w-16"></div>
                    <div className="h-6 bg-[#DDC7FF]/20 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20 opacity-0 animate-fade-in-down">
            <div className="bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
              <p className="text-[#FF6E98] font-semibold mb-2">
                Oops! Something went wrong
              </p>
              <p className="text-[#6153E0]/70 text-sm">
                Failed to load products. Please try again later.
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto opacity-0 animate-fade-in-down [animation-delay:500ms]">
            {products.map((product: Product, index: number) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Results Summary */}
        {!isLoading && !isError && (
          <div className="text-center mt-16 opacity-0 animate-fade-in-down [animation-delay:700ms]">
            <p className="text-[#6153E0]/60 text-sm">
              Showing {products.length} products • Handcrafted with love
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
