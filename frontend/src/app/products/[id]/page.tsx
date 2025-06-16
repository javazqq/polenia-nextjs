"use client";

import { useEffect, useState, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart, openCartDrawer, closeCartDrawer } from "@/slices/cartSlice";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/types/product";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Heart,
  Shield,
  Truck,
} from "lucide-react";
import CartDrawer from "@/components/CartDrawer";

// Memoized TrustIndicators component
const TrustIndicators = memo(function TrustIndicators() {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 opacity-0 animate-fade-in-down [animation-delay:800ms]">
      <div className="text-center">
        <div className="w-12 h-12 bg-[#D6E012]/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-[#D6E012]/30">
          <Shield size={20} className="text-[#6153E0]" />
        </div>
        <p className="text-xs text-[#6153E0]/70">Quality Guaranteed</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-[#DDC7FF]/30 rounded-full flex items-center justify-center mx-auto mb-2 border border-[#DDC7FF]/50">
          <Truck size={20} className="text-[#6153E0]" />
        </div>
        <p className="text-xs text-[#6153E0]/70">Free Shipping</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-[#FF6E98]/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-[#FF6E98]/30">
          <Heart size={20} className="text-[#6153E0]" />
        </div>
        <p className="text-xs text-[#6153E0]/70">Made with Love</p>
      </div>
    </div>
  );
});

export default function ProductPage() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const id = params?.id as string;

  const dispatch = useDispatch();
  const router = useRouter();

  const isCartDrawerOpen = useSelector(
    (state: RootState) => state.cart.isCartDrawerOpen
  );

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      })
    );

    dispatch(openCartDrawer());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#DDC7FF] border-t-[#6153E0] rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] flex justify-center items-center">
        <div className="text-center p-8 bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-2xl max-w-md mx-auto backdrop-blur-sm opacity-0 animate-fade-in-down">
          <p className="text-[#FF6E98] font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-[#6153E0]/70 text-sm">
            Failed to load product details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#DDC7FF]/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 py-20">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-[#6153E0] hover:text-[#FF6E98] mb-8 group opacity-0 animate-fade-in-down"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="font-semibold">Back to Products</span>
          </button>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start opacity-0 animate-fade-in-down [animation-delay:100ms]">
              {/* Image Section */}
              <div className="space-y-6">
                <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#DDC7FF]/30 to-[#FF6E98]/20 shadow-2xl border border-white/50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6153E0]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  {/* Floating elements */}
                  <div className="absolute top-6 right-6">
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors">
                      <Heart
                        size={20}
                        className="text-[#6153E0] hover:text-[#FF6E98] transition-colors"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="space-y-8 opacity-0 animate-fade-in-down [animation-delay:200ms]">
                {/* Badge */}
                <span className="inline-block px-4 py-2 bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] rounded-full text-sm font-semibold border border-[#DDC7FF]/50 opacity-0 animate-fade-in-down [animation-delay:300ms]">
                  ✨ Premium Quality
                </span>
                {/* Title and Rating */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#6153E0] mb-4 leading-tight opacity-0 animate-fade-in-down [animation-delay:400ms]">
                    {product.name}
                  </h1>
                </div>
                {/* Description */}
                <p className="text-lg text-[#6153E0]/80 leading-relaxed opacity-0 animate-fade-in-down [animation-delay:500ms]">
                  {product.description}
                </p>
                {/* Features */}
                <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-down [animation-delay:600ms]">
                  <span className="px-3 py-1 bg-[#D6E012]/20 text-[#6153E0] rounded-full text-sm font-semibold border border-[#D6E012]/30">
                    Natural Ingredients
                  </span>
                  <span className="px-3 py-1 bg-[#DDC7FF]/30 text-[#6153E0] rounded-full text-sm font-semibold border border-[#DDC7FF]/50">
                    Organic Certified
                  </span>
                  <span className="px-3 py-1 bg-[#FF6E98]/20 text-[#6153E0] rounded-full text-sm font-semibold border border-[#FF6E98]/30">
                    Handcrafted
                  </span>
                </div>
                {/* Price and Stock */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#DDC7FF]/30 opacity-0 animate-fade-in-down [animation-delay:700ms]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-[#6153E0]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-[#6153E0]/60 ml-2">
                        per bottle
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.countInStock > 0
                          ? "bg-[#D6E012]/20 text-[#6153E0] border border-[#D6E012]/30"
                          : "bg-[#FF6E98]/20 text-[#6153E0] border border-[#FF6E98]/30"
                      }`}
                    >
                      {product.countInStock > 0
                        ? `${product.countInStock} in stock`
                        : "Out of Stock"}
                    </span>
                  </div>
                  {/* Quantity and Add to Cart */}
                  {product.countInStock > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-[#6153E0]">
                          Quantity:
                        </span>
                        <div className="flex items-center bg-white border border-[#DDC7FF]/50 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              setQuantity((q) => Math.max(1, q - 1))
                            }
                            className="px-4 py-2 text-[#6153E0] hover:bg-[#DDC7FF]/20 disabled:opacity-50 transition-colors"
                            disabled={quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-4 py-2 text-[#6153E0] font-semibold border-x border-[#DDC7FF]/50">
                            {quantity}
                          </span>
                          <button
                            onClick={() =>
                              setQuantity((q) =>
                                Math.min(product.countInStock, q + 1)
                              )
                            }
                            className="px-4 py-2 text-[#6153E0] hover:bg-[#DDC7FF]/20 disabled:opacity-50 transition-colors"
                            disabled={quantity >= product.countInStock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-bold py-4 px-8 rounded-2xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                      >
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  )}
                </div>
                {/* Trust Indicators */}
                <TrustIndicators />
              </div>
            </div>
          </div>
        </div>
      </main>
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => dispatch(closeCartDrawer())}
      />
    </>
  );
}
