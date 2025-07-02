"use client";

import { useEffect, useState } from "react";
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
import Counter from "@/components/CounterComponent";
import TrustIndicators from "@/components/TrustIndicators";

export default function ProductPage() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

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

    const defaultParcel: {
      length: number;
      width: number;
      height: number;
      weight: number;
      packageType: string;
      declaredValue: number;
      packageNumber: number;
      consignmentNote: string;
      packageProtected: boolean;
    } = {
      length: 10,
      width: 10,
      height: 10,
      weight: 1,
      packageType: "4G",
      declaredValue: 2500,
      packageNumber: 1,
      consignmentNote: "50202300",
      packageProtected: true,
    };

    let parcelData = defaultParcel;
    if (product.parcel) {
      if (typeof product.parcel === "string") {
        try {
          const parsedParcel = JSON.parse(product.parcel);
          // Mapear de snake_case a camelCase
          parcelData = {
            length: parsedParcel.length,
            width: parsedParcel.width,
            height: parsedParcel.height,
            weight: parsedParcel.weight,
            packageType: parsedParcel.package_type || "4G",
            declaredValue: parsedParcel.declared_value || 2500,
            packageNumber: parsedParcel.package_number || 1,
            consignmentNote: parsedParcel.consignment_note || "50202300",
            packageProtected: parsedParcel.package_protected ?? true,
          };
        } catch {
          parcelData = defaultParcel;
        }
      } else {
        // Si ya viene como objeto, mapear también
        parcelData = {
          length: product.parcel.length,
          width: product.parcel.width,
          height: product.parcel.height,
          weight: product.parcel.weight,
          packageType: product.parcel.packageType || "4G",
          declaredValue: product.parcel.declaredValue || 2500,
          packageNumber: product.parcel.packageNumber || 1,
          consignmentNote: product.parcel.consignmentNote || "50202300",
          packageProtected: product.parcel.packageProtected ?? true,
        };
      }
    }

    dispatch(
      addToCart({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        parcel: parcelData,
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
      <main className="min-h-screen bg-[#F8F4FF] relative overflow-hidden pt-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#DDC7FF]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/10 rounded-full blur-3xl animate-pulse [animation-delay:500ms]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-[#6153E0]/80 hover:text-[#FF6E98] mb-8 group transition-colors duration-300"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="font-semibold">Back to Products</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
            {/* Image Section */}
            <div className="space-y-4 sticky top-28 opacity-0 animate-fade-in-down [animation-delay:200ms]">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-[#6153E0]/20">
                {/* Skeleton - only show if image not loaded */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-white/30 animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#DDC7FF]/50 border-t-[#6153E0] rounded-full animate-spin"></div>
                  </div>
                )}

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-700 hover:scale-105 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Floating elements */}
                <div className="absolute top-5 right-5 z-10">
                  <button className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-colors">
                    <Heart
                      size={20}
                      className="text-[#6153E0] hover:text-[#FF6E98] transition-colors"
                    />
                  </button>
                </div>
              </div>
              {/* Thumbnail Gallery (Optional) - can be added here */}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6 opacity-0 animate-fade-in-down [animation-delay:400ms]">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 bg-[#D6E012]/20 text-[#6153E0] rounded-full text-sm font-semibold border border-[#D6E012]/30 opacity-0 animate-fade-in-down [animation-delay:500ms]">
                ✨ Premium Quality
              </span>
              {/* Title */}
              <div className="opacity-0 animate-fade-in-down [animation-delay:600ms]">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] to-[#3A3185] mb-3 leading-tight">
                  {product.name}
                </h1>
                {/* Rating - can be added here */}
              </div>
              {/* Description */}
              <p className="text-lg text-[#6153E0]/80 leading-relaxed opacity-0 animate-fade-in-down [animation-delay:700ms]">
                {product.description}
              </p>
              {/* Features */}
              <div className="flex flex-wrap gap-3 pt-2 opacity-0 animate-fade-in-down [animation-delay:800ms]">
                <span className="px-3 py-1.5 bg-white/80 text-[#6153E0] rounded-full text-sm font-medium border border-[#DDC7FF]/50">
                  Natural Ingredients
                </span>
                <span className="px-3 py-1.5 bg-white/80 text-[#6153E0] rounded-full text-sm font-medium border border-[#DDC7FF]/50">
                  Organic Certified
                </span>
                <span className="px-3 py-1.5 bg-white/80 text-[#6153E0] rounded-full text-sm font-medium border border-[#DDC7FF]/50">
                  Handcrafted
                </span>
              </div>
              {/* Price and Stock */}
              <div className="!my-8 bg-gradient-to-r from-[#6153E0]/5 to-[#FF6E98]/5 rounded-2xl p-6 border border-white opacity-0 animate-fade-in-down [animation-delay:900ms]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-4xl font-bold text-[#6153E0]">
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
                  <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div className="bg-white/80 rounded-xl border border-[#DDC7FF]/50 flex items-center justify-between p-2">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 text-2xl text-[#6153E0] hover:bg-[#DDC7FF]/40 disabled:opacity-50 transition-colors rounded-lg"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <Counter
                        value={quantity}
                        fontSize={28}
                        padding={0}
                        places={[100, 10, 1]}
                        textColor="#6153E0"
                        fontWeight={600}
                        containerStyle={{
                          background: "none",
                          boxShadow: "none",
                          border: "none",
                          padding: 0,
                          minWidth: 0,
                        }}
                        counterStyle={{
                          background: "none",
                          boxShadow: "none",
                          border: "none",
                          padding: 0,
                          minWidth: 0,
                          gap: 0,
                        }}
                        digitStyle={{
                          minWidth: 20,
                          textAlign: "center",
                          background: "none",
                        }}
                        gradientHeight={0}
                      />
                      <button
                        onClick={() =>
                          setQuantity((q) =>
                            Math.min(product.countInStock, q + 1)
                          )
                        }
                        className="w-10 h-10 text-2xl text-[#6153E0] hover:bg-[#DDC7FF]/40 disabled:opacity-50 transition-colors rounded-lg"
                        disabled={quantity >= product.countInStock}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-bold py-4 px-6 rounded-xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 transform hover:-translate-y-1"
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
      </main>
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => dispatch(closeCartDrawer())}
      />
    </>
  );
}
