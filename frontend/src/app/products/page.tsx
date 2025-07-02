"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/api/products";
import {
  ArrowRight,
  ShoppingCart,
  Star,
  Heart,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";

const ProductCard = memo(function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative h-full flex flex-col opacity-0 animate-fade-in-down p-4 [animation-delay:600ms] transition-all duration-300 rounded-3xl hover:shadow-2xl hover:shadow-[#6153E0]/20 hover:-translate-y-1">
      {/* Gradient Overlay for Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6153E0]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>

      {/* Animated Borders: Gradient fade, expand from center */}
      <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-[#DDC7FF] to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out origin-center opacity-0 group-hover:opacity-100"></div>
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#DDC7FF] to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out origin-center opacity-0 group-hover:opacity-100"></div>

      <Link
        href={`/products/${product.id}`}
        className="relative z-10 flex flex-1 flex-col"
      >
        {/* Image Container - Reserved Space */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#DDC7FF]/30 to-[#FF6E98]/20 rounded-2xl">
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
        <div className="pt-6 flex-1 flex flex-col">
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
      <div className="pt-4">
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
    <main className="w-full min-h-screen bg-[#F8F4FF] relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#E2DFFF] via-white to-[#FFE6F0] text-[#3A3185] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#6153E0]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Our Handcrafted Ginger Beers
          </h1>
          <p className="text-lg md:text-xl text-[#3A3185]/80 max-w-2xl mx-auto">
            Explore a world of flavor, brewed with passion and the finest
            natural ingredients.
          </p>
        </div>
        {/* Section Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F4FF] to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-16 py-12 -mt-16">
        {/* Filter and Sort Bar */}
        {/* <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 mb-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border border-white/50">
          <div className="relative w-full md:w-auto md:flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6153E0]/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for a flavor..."
              className="bg-white/50 border border-transparent focus:bg-white focus:border-[#DDC7FF] rounded-xl w-full pl-12 pr-4 py-3 text-[#6153E0] placeholder:text-[#6153E0]/50 transition-all duration-300 outline-none"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex-1">
              <button className="w-full bg-white/80 border border-[#DDC7FF]/50 rounded-xl px-4 py-3 flex items-center justify-between text-[#6153E0] font-medium hover:bg-white transition-all">
                <span>Sort By</span>
                <ChevronDown size={18} />
              </button>
            </div>
            <div className="flex-1">
              <button className="w-full bg-white/80 border border-[#DDC7FF]/50 rounded-xl px-4 py-3 flex items-center justify-between text-[#6153E0] font-medium hover:bg-white transition-all">
                <span>Category</span>
                <ChevronDown size={18} />
              </button>
            </div>
            <div className="hidden md:flex gap-1 bg-[#F8F4FF] p-1 rounded-xl border border-[#DDC7FF]/50">
              <button className="p-2 rounded-lg bg-white text-[#6153E0] shadow-sm">
                <LayoutGrid size={20} />
              </button>
              <button className="p-2 rounded-lg text-[#6153E0]/60 hover:bg-white/50">
                <List size={20} />
              </button>
            </div>
          </div>
        </div> */}

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/80 rounded-3xl overflow-hidden animate-pulse"
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

          {isError && (
            <div className="text-center py-20">
              <div className="bg-white/80 border border-[#FF6E98]/30 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
                <p className="text-[#FF6E98] font-semibold mb-2">
                  Oops! Something went wrong
                </p>
                <p className="text-[#6153E0]/70 text-sm">
                  Failed to load products. Please try again later.
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: Product, index: number) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* Results Summary */}
          {!isLoading && !isError && (
            <div className="text-center mt-16">
              <p className="text-[#6153E0]/60 text-sm">
                Showing {products.length} products • Handcrafted with love
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
