"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState, useMemo, useRef } from "react";
import { Category } from "@/types/product";
import { fetchCategories } from "@/lib/api/products";
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
import GlassBanner from "@/components/ProductsBanner";

const CategoryCard = memo(function CategoryCard({
  category,
  index,
  onHover,
  onLeave,
  accentColor,
}: {
  category: Category;
  index: number;
  onHover: (categoryName: string) => void;
  onLeave: () => void;
  accentColor: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative h-full flex flex-col opacity-0 animate-fade-in-down p-4 [animation-delay:600ms] transition-all duration-300 rounded-3xl hover:shadow-2xl hover:shadow-[#6153E0]/20 hover:-translate-y-1"
      onMouseEnter={() => onHover(category.name)}
      onMouseLeave={onLeave}
    >
      {/* Gradient Overlay for Hover */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-current/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
        style={{ color: accentColor }}
      ></div>

      {/* Animated Borders: Gradient fade, expand from center */}
      <div
        className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-current to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out origin-center opacity-0 group-hover:opacity-100"
        style={{ color: accentColor + "80" }}
      ></div>
      <div
        className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-current to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out origin-center opacity-0 group-hover:opacity-100"
        style={{ color: accentColor + "80" }}
      ></div>

      <Link
        href={`/products/${category.name}`}
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

          {/* Product Count Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-white/90 text-[#6153E0] text-xs font-bold px-3 py-1 rounded-full">
              {category.productCount} options
            </span>
          </div>

          {/* Category Image */}
          <Image
            src={category.sampleImage}
            alt={category.displayName}
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

          {/* Enhanced overlay with browse button */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#6153E0]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-white/90 text-[#6153E0] py-2 rounded-xl font-semibold hover:bg-white transition-all duration-200 flex items-center justify-center gap-2">
                <ArrowRight size={16} />
                Browse Options
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3
              className="text-xl font-bold transition-colors line-clamp-1"
              style={{
                color: "#6153E0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6153E0";
              }}
            >
              {category.displayName}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={20} style={{ color: accentColor }} />
            </div>
          </div>

          <p className="text-[#6153E0]/70 text-sm line-clamp-2 mb-4 leading-relaxed h-10 flex items-start">
            Choose from {category.productCount} different pack sizes and options
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            <span className="text-xs bg-[#D6E012]/20 text-[#6153E0] px-2 py-1 rounded-full border border-[#D6E012]/30">
              Natural
            </span>
            <span className="text-xs bg-[#DDC7FF]/30 text-[#6153E0] px-2 py-1 rounded-full border border-[#DDC7FF]/50">
              Multiple Sizes
            </span>
          </div>
        </div>
      </Link>

      {/* Browse CTA */}
      <div className="pt-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-[#6153E0]">
              {category.productCount} options
            </span>
            <span className="text-sm text-[#6153E0]/60 ml-1">available</span>
          </div>
          <button
            className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg"
            style={{
              background: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, ${accentColor}dd, ${accentColor}88)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, ${accentColor}, ${accentColor}dd)`;
            }}
          >
            <ArrowRight size={16} />
            <span>Browse</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default function ProductsPage() {
  // Theme and color utilities
  const themes = {
    "ginger-beer": {
      bg: "#F8F4FF",
      hero: "from-[#E2DFFF] via-white to-[#FFE6F0]",
      accent: "#6153E0",
      colors: { r: 226, g: 223, b: 255 },
      secondary: { r: 255, g: 230, b: 240 },
    },
    "ginger-beer-maracuya": {
      bg: "#FFFBF0",
      hero: "from-[#FEF3C7] via-[#FEFCE8] to-[#FFE4B5]",
      accent: "#F59E0B",
      colors: { r: 254, g: 243, b: 199 },
      secondary: { r: 255, g: 228, b: 181 },
    },
    sodas: {
      bg: "#FEF2F2",
      hero: "from-[#FECACA] via-white to-[#FDE8E8]",
      accent: "#EF4444",
      colors: { r: 254, g: 202, b: 202 },
      secondary: { r: 253, g: 232, b: 232 },
    },
    juices: {
      bg: "#F0FDF4",
      hero: "from-[#DCFCE7] via-white to-[#BBF7D0]",
      accent: "#22C55E",
      colors: { r: 220, g: 252, b: 231 },
      secondary: { r: 187, g: 247, b: 208 },
    },
  };
  const getCategoryTheme = (categoryName: string) =>
    themes[categoryName as keyof typeof themes] || themes["ginger-beer"];
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 97, g: 83, b: 224 };
  };
  const blendColors = (
    color1: { r: number; g: number; b: number },
    color2: { r: number; g: number; b: number },
    progress: number
  ) => {
    const r = Math.round(color1.r + (color2.r - color1.r) * progress);
    const g = Math.round(color1.g + (color2.g - color1.g) * progress);
    const b = Math.round(color1.b + (color2.b - color1.b) * progress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Animation logic as a custom hook
  function useSmoothTransition() {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [transitionProgress, setTransitionProgress] = useState(0);
    const animationId = useRef<number | null>(null);

    const handleCategoryHover = (categoryName: string) => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
      if (hoveredCategory === categoryName) return;
      setHoveredCategory(categoryName);
      let progress = transitionProgress;
      const targetProgress = categoryName === "ginger-beer" ? 0 : 1;
      const increment = targetProgress > progress ? 0.05 : -0.08;
      const animate = () => {
        progress += increment;
        if (
          (increment > 0 && progress >= targetProgress) ||
          (increment < 0 && progress <= targetProgress)
        ) {
          setTransitionProgress(targetProgress);
          animationId.current = null;
          return;
        }
        setTransitionProgress(Math.max(0, Math.min(1, progress)));
        animationId.current = requestAnimationFrame(animate);
      };
      animationId.current = requestAnimationFrame(animate);
    };
    const handleCategoryLeave = () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
      setHoveredCategory(null);
      let progress = transitionProgress;
      const animate = () => {
        progress -= 0.08;
        if (progress <= 0) {
          setTransitionProgress(0);
          animationId.current = null;
          return;
        }
        setTransitionProgress(Math.max(0, progress));
        animationId.current = requestAnimationFrame(animate);
      };
      animationId.current = requestAnimationFrame(animate);
    };
    useEffect(() => {
      return () => {
        if (animationId.current) {
          cancelAnimationFrame(animationId.current);
        }
      };
    }, []);
    return {
      hoveredCategory,
      transitionProgress,
      handleCategoryHover,
      handleCategoryLeave,
    };
  }

  // Main state
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {
    hoveredCategory,
    transitionProgress,
    handleCategoryHover,
    handleCategoryLeave,
  } = useSmoothTransition();

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  // Memoized blended colors
  const baseTheme = themes["ginger-beer"];
  const targetTheme = hoveredCategory
    ? getCategoryTheme(hoveredCategory)
    : baseTheme;
  const blendedColor1 = useMemo(
    () => blendColors(baseTheme.colors, targetTheme.colors, transitionProgress),
    [baseTheme, targetTheme, transitionProgress]
  );
  const blendedColor2 = useMemo(
    () =>
      blendColors(
        baseTheme.secondary,
        targetTheme.secondary,
        transitionProgress
      ),
    [baseTheme, targetTheme, transitionProgress]
  );
  const gradient = useMemo(
    () =>
      `linear-gradient(to bottom right, ${blendedColor1}, #FFFFFF, ${blendedColor2})`,
    [blendedColor1, blendedColor2]
  );
  const baseAccentRgb = { r: 97, g: 83, b: 224 };
  const targetAccentRgb = hoveredCategory
    ? hexToRgb(targetTheme.accent)
    : baseAccentRgb;
  const blendedAccent = useMemo(
    () => blendColors(baseAccentRgb, targetAccentRgb, transitionProgress),
    [baseAccentRgb, targetAccentRgb, transitionProgress]
  );

  return (
    <main
      className="w-full min-h-screen relative overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Unified Hero + Products Section */}
      <section className="relative text-[#3A3185] overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${blendedAccent}33` }}
        ></div>
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${blendedAccent}22` }}
        ></div>

        {/* Hero Content - Minimal spacing */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-8 md:py-12">
          {/* Minimal hero content or completely empty */}
        </div>

        {/* Featured Product Section - Expanded Hero Image */}
        <div className="relative z-10 px-6 md:px-16 py-4 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/products/ginger-beer-maracuya" className="block group">
              <div className="relative aspect-[21/9] bg-white/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in-down [animation-delay:400ms]">
                {/* Featured Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    ⭐ Featured
                  </span>
                </div>

                {/* Product Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FEF3C7]/30 to-[#FFE4B5]/20">
                  <Image
                    src="/images/placeholder-image.jpg"
                    alt="Ginger Beer Maracuya - Premium 6-pack"
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />

                  {/* Hero Title Overlay - Centered */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A3185]/70 via-[#3A3185]/20 to-transparent flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl mx-auto px-6">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                        Our Handcrafted Ginger Beers
                      </h1>
                      <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        Explore a world of flavor, brewed with passion and the
                        finest natural ingredients.
                      </p>
                    </div>
                  </div>

                  {/* Product Info Overlay - Bottom */}
                  <div className="absolute bottom-8 left-8 right-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      Ginger Beer Maracuya
                    </h3>
                    <p className="text-lg text-white/90 drop-shadow-md">
                      Our tropical passion fruit blend
                    </p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-white/95 text-[#3A3185] py-2 px-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                      <ArrowRight size={18} />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Products Content */}
        <div className="relative z-10 px-6 md:px-16 py-12">
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
                {categories.map((category: Category, index: number) => (
                  <CategoryCard
                    key={category.name}
                    category={category}
                    index={index}
                    onHover={handleCategoryHover}
                    onLeave={handleCategoryLeave}
                    accentColor={getCategoryTheme(category.name).accent}
                  />
                ))}
              </div>
            )}

            <GlassBanner />

            {/* Results Summary */}
            {!isLoading && !isError && (
              <div className="text-center mt-16">
                <p className="text-[#6153E0]/60 text-sm">
                  Showing {categories.length} product categories • Handcrafted
                  with love
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
