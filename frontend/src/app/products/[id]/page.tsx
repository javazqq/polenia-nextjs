"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart, openCartDrawer, closeCartDrawer } from "@/slices/cartSlice";
import { fetchProductById, fetchProductsByCategory } from "@/lib/api/products";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isCategory, setIsCategory] = useState(false);
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

  // Dynamic color theming based on category
  const getCategoryTheme = (categoryName: string) => {
    const themes = {
      "ginger-beer": {
        primary: "#E2DFFF",
        secondary: "#FFE6F0",
        accent: "#6153E0",
        gradient: "linear-gradient(to bottom right, #E2DFFF, #FFFFFF, #FFE6F0)",
      },
      "ginger-beer-maracuya": {
        primary: "#FEF3C7",
        secondary: "#FFE4B5",
        accent: "#F59E0B",
        gradient: "linear-gradient(to bottom right, #FEF3C7, #FEFCE8, #FFE4B5)",
      },
      sodas: {
        primary: "#FECACA",
        secondary: "#FDE8E8",
        accent: "#EF4444",
        gradient: "linear-gradient(to bottom right, #FECACA, #FFFFFF, #FDE8E8)",
      },
      juices: {
        primary: "#DCFCE7",
        secondary: "#BBF7D0",
        accent: "#22C55E",
        gradient: "linear-gradient(to bottom right, #DCFCE7, #FFFFFF, #BBF7D0)",
      },
    };
    return themes[categoryName as keyof typeof themes] || themes["ginger-beer"];
  };

  // Get current theme based on category/product
  const currentTheme = getCategoryTheme(id as string);

  useEffect(() => {
    // Check if id is a number (individual product) or string (category)
    const isNumericId = /^\d+$/.test(id);

    if (isNumericId) {
      // Fetch individual product
      fetchProductById(id)
        .then((data) => {
          setProduct(data);
          setSelectedProduct(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      // Fetch products by category
      setIsCategory(true);
      fetchProductsByCategory(id)
        .then((data) => {
          setProducts(data);
          if (data.length > 0) {
            // Set the first product as default
            setSelectedProduct(data[0]);
            setProduct(data[0]);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;

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
    if (selectedProduct.parcel) {
      if (typeof selectedProduct.parcel === "string") {
        try {
          const parsedParcel = JSON.parse(selectedProduct.parcel);
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
          length: selectedProduct.parcel.length,
          width: selectedProduct.parcel.width,
          height: selectedProduct.parcel.height,
          weight: selectedProduct.parcel.weight,
          packageType: selectedProduct.parcel.packageType || "4G",
          declaredValue: selectedProduct.parcel.declaredValue || 2500,
          packageNumber: selectedProduct.parcel.packageNumber || 1,
          consignmentNote: selectedProduct.parcel.consignmentNote || "50202300",
          packageProtected: selectedProduct.parcel.packageProtected ?? true,
        };
      }
    }

    dispatch(
      addToCart({
        id: Number(selectedProduct.id),
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity,
        parcel: parcelData,
      })
    );

    dispatch(openCartDrawer());
  };

  // Helper functions for pack size handling
  const getPackSize = (productName: string): string => {
    const packMatch = productName.match(/(\d+)\s*[Pp]ack/);
    if (packMatch) {
      const number = packMatch[1];
      return `${number}-Pack`;
    }
    return "Single";
  };

  const getCleanProductName = (productName: string): string => {
    return productName
      .replace(/\d+\s*[Pp]ack/g, "")
      .replace(/\d+\s*(piece|pieces|unit|units)/gi, "")
      .trim();
  };

  const calculatePricePerUnit = (
    totalPrice: number,
    productName: string
  ): string => {
    const packMatch = productName.match(/(\d+)\s*[Pp]ack/);
    if (packMatch) {
      const units = parseInt(packMatch[1]);
      const pricePerUnit = totalPrice / units;
      return `$${pricePerUnit.toFixed(2)} per bottle`;
    }
    return "per pack";
  };

  if (isLoading) {
    const defaultTheme = getCategoryTheme(id as string);
    return (
      <div
        className="min-h-screen flex justify-center items-center transition-all duration-700"
        style={{ background: defaultTheme.gradient }}
      >
        <div
          className="w-12 h-12 border-4 border-t-4 rounded-full animate-spin"
          style={{
            borderColor: `${defaultTheme.accent}30`,
            borderTopColor: defaultTheme.accent,
          }}
        />
      </div>
    );
  }

  if (isError || !product) {
    const defaultTheme = getCategoryTheme(id as string);
    return (
      <div
        className="min-h-screen flex justify-center items-center transition-all duration-700"
        style={{ background: defaultTheme.gradient }}
      >
        <div className="text-center p-8 bg-white/20 border border-white/30 rounded-2xl max-w-md mx-auto backdrop-blur-sm opacity-0 animate-fade-in-down">
          <p
            className="font-semibold mb-2"
            style={{ color: defaultTheme.accent }}
          >
            Oops! Something went wrong
          </p>
          <p className="text-[#3A3185]/70 text-sm">
            Failed to load product details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main
        className="min-h-screen relative overflow-hidden pt-20 transition-all duration-700 ease-in-out"
        style={{ background: currentTheme.gradient }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse transition-colors duration-700"
            style={{ backgroundColor: `${currentTheme.accent}20` }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse [animation-delay:500ms] transition-colors duration-700"
            style={{ backgroundColor: `${currentTheme.accent}10` }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 hover:text-opacity-80 mb-8 group transition-all duration-300"
            style={{ color: `${currentTheme.accent}CC` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = `${currentTheme.accent}CC`;
            }}
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
                  src={selectedProduct?.image || product?.image || ""}
                  alt={selectedProduct?.name || product?.name || ""}
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
                      className="transition-colors"
                      style={{ color: currentTheme.accent }}
                    />
                  </button>
                </div>
              </div>
              {/* Thumbnail Gallery (Optional) - can be added here */}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6 opacity-0 animate-fade-in-down [animation-delay:400ms]">
              {/* Badge */}
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border opacity-0 animate-fade-in-down [animation-delay:500ms]"
                style={{
                  backgroundColor: `${currentTheme.accent}20`,
                  color: currentTheme.accent,
                  borderColor: `${currentTheme.accent}30`,
                }}
              >
                ✨ Example Tag
              </span>
              {/* Title */}
              <div className="opacity-0 animate-fade-in-down [animation-delay:600ms]">
                <h1
                  className="text-4xl md:text-5xl font-bold mb-3 leading-tight"
                  style={{ color: currentTheme.accent }}
                >
                  {isCategory
                    ? getCleanProductName(selectedProduct?.name || "")
                    : selectedProduct?.name}
                </h1>
                {isCategory && (
                  <p
                    className="text-lg font-medium"
                    style={{ color: `${currentTheme.accent}99` }}
                  >
                    Choose your perfect pack size
                  </p>
                )}
              </div>
              {/* Description */}
              <p
                className="text-lg leading-relaxed opacity-0 animate-fade-in-down [animation-delay:700ms]"
                style={{ color: `${currentTheme.accent}CC` }}
              >
                {selectedProduct?.description}
              </p>

              {/* Pack Size Selection - Only show for categories */}
              {isCategory && products.length > 1 && (
                <div className="opacity-0 animate-fade-in-down [animation-delay:750ms]">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: currentTheme.accent }}
                  >
                    Select Pack Size:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setProduct(prod);
                          setQuantity(1);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedProduct?.id === prod.id
                            ? "shadow-lg"
                            : "bg-white/80 hover:bg-white"
                        }`}
                        style={
                          selectedProduct?.id === prod.id
                            ? {
                                borderColor: currentTheme.accent,
                                backgroundColor: `${currentTheme.accent}10`,
                              }
                            : {
                                borderColor: `${currentTheme.accent}30`,
                              }
                        }
                        onMouseEnter={(e) => {
                          if (selectedProduct?.id !== prod.id) {
                            e.currentTarget.style.borderColor = `${currentTheme.accent}60`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedProduct?.id !== prod.id) {
                            e.currentTarget.style.borderColor = `${currentTheme.accent}30`;
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4
                            className="font-bold"
                            style={{ color: currentTheme.accent }}
                          >
                            {getPackSize(prod.name)}
                          </h4>
                          <span
                            className="text-2xl font-bold"
                            style={{ color: currentTheme.accent }}
                          >
                            ${prod.price.toFixed(2)}
                          </span>
                        </div>
                        <p
                          className="text-sm mb-1"
                          style={{ color: `${currentTheme.accent}AA` }}
                        >
                          {calculatePricePerUnit(prod.price, prod.name)}
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span
                            className={`px-2 py-1 rounded-full ${
                              prod.countInStock > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {prod.countInStock > 0
                              ? `${prod.countInStock} in stock`
                              : "Out of stock"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Features */}
              {/* <div className="flex flex-wrap gap-3 pt-2 opacity-0 animate-fade-in-down [animation-delay:800ms]">
                <span className="px-3 py-1.5 bg-white/80 text-[#6153E0] rounded-full text-sm font-medium border border-[#DDC7FF]/50">
                  Natural Ingredients
                </span>
                <span className="px-3 py-1.5 bg-white/80 text-[#6153E0] rounded-full text-sm font-medium border border-[#DDC7FF]/50">
                  Organic Certified
                </span>
                <span className="px-3 py-1.5 bg-white/80 text-[#6153E0] rounded-full text-sm font-medium border border-[#DDC7FF]/50">
                  Handcrafted
                </span>
              </div> */}
              {/* Price and Stock */}
              <div className="!my-8 bg-gradient-to-r from-[#6153E0]/5 to-[#FF6E98]/5 rounded-2xl p-6 border border-white opacity-0 animate-fade-in-down [animation-delay:900ms]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-4xl font-bold text-[#6153E0]">
                      ${selectedProduct?.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[#6153E0]/60">
                        {isCategory
                          ? calculatePricePerUnit(
                              selectedProduct?.price || 0,
                              selectedProduct?.name || ""
                            )
                          : "per bottle"}
                      </span>
                      {isCategory && (
                        <span className="text-xs bg-[#6153E0]/10 text-[#6153E0] px-2 py-1 rounded-full">
                          {getPackSize(selectedProduct?.name || "")}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      (selectedProduct?.countInStock || 0) > 0
                        ? "bg-[#D6E012]/20 text-[#6153E0] border border-[#D6E012]/30"
                        : "bg-[#FF6E98]/20 text-[#6153E0] border border-[#FF6E98]/30"
                    }`}
                  >
                    {(selectedProduct?.countInStock || 0) > 0
                      ? `${selectedProduct?.countInStock} in stock`
                      : "Out of Stock"}
                  </span>
                </div>
                {/* Quantity and Add to Cart */}
                {(selectedProduct?.countInStock || 0) > 0 && (
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
                            Math.min(selectedProduct?.countInStock || 0, q + 1)
                          )
                        }
                        className="w-10 h-10 text-2xl text-[#6153E0] hover:bg-[#DDC7FF]/40 disabled:opacity-50 transition-colors rounded-lg"
                        disabled={
                          quantity >= (selectedProduct?.countInStock || 0)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-bold py-4 px-6 rounded-xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 transform hover:-translate-y-1"
                    >
                      <ShoppingCart size={20} />
                      <span>
                        Add{" "}
                        {isCategory
                          ? getPackSize(selectedProduct?.name || "")
                          : ""}{" "}
                        to Cart
                      </span>
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
