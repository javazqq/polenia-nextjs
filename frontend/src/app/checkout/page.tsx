"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { clearCartItems } from "@/slices/cartSlice";
import { setCredentials } from "@/slices/authSlice";
import Image from "next/image";
import { Check, Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGuest = searchParams?.get("guest") === "true";
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Form state for guest checkout
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    name: "",
    email:"",
    phone:"",
    street1: "",
    city: "",
    state: "",
    zipCode: "",
    reference: "",  
    country: "Mexico", // Default country
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingDetails, setShippingDetails] = useState<any | null>(null);
  const [shippingQuoteId, setShippingQuoteId] = useState<string | null>(null);
  const [shippingRateId, setShippingRateId] = useState<string | null>(null);

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  const handlePlaceOrder = async () => {
    setError("");

    // Validation checks
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (isGuest) {
      if (
        !address.name ||
        !address.email ||
        !address.phone ||
        !address.street1 ||
        !address.city ||
        !address.state ||
        !address.zipCode ||
        !address.reference
      ) {
        setError("Please fill all required address fields.");
        return;
      }

      if (shippingCost === null) {
        setError("Please calculate shipping cost before placing your order.");
        return;
      }
    }

    setLoading(true);

    try {
      let guestToken = null;

      // Si es invitado, crear cuenta temporal
      if (isGuest) {
        const guestRes = await fetch("/api/users/guest", {
          method: "POST",
          credentials: "include",
        });

        if (!guestRes.ok) {
          const guestData = await guestRes.json();
          throw new Error(guestData.message || "Failed to create guest user");
        }

        const guestData = await guestRes.json();
        guestToken = guestData.token; // Store token for URL, don't dispatch to Redux
      }

      // Create order in backend
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items: cartItems,
            total: calculateSubtotal() + (shippingCost || 0),
            shipping_price: shippingCost || 0,
            guest_name: isGuest ? address.name : undefined,
            guest_email: isGuest ? address.email : undefined,
            guest_address: isGuest ? address : undefined,
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Create shipping record in backend
      // Preparar los paquetes con todos los campos necesarios para Skydropx
      console.log("Cart items before creating parcels:", JSON.stringify(cartItems, null, 2));
      
      const parcelsForShipping: any[] = [];
      cartItems.forEach((item) => {
        console.log("Processing item:", item.name, "parcel:", item.parcel);
        // Solo usar quantity, no multiplicar por packageNumber
        for (let i = 0; i < item.quantity; i++) {
          if (item.parcel) {
            const { length, width, height, weight, packageNumber, consignmentNote, packageType, packageProtected, declaredValue } = item.parcel;
            console.log("Using parcel data:", { length, width, height, weight, packageNumber, consignmentNote, packageType, packageProtected, declaredValue });
            parcelsForShipping.push({
              length,
              width,
              height,
              weight,
              package_number: 1, // Cada objeto representa un paquete individual
              package_protected: packageProtected ?? true,
              declared_value: declaredValue || 2500,
              consignment_note: consignmentNote || "50202300", // Como string
              package_type: packageType || "4G",
            });
          } else {
            console.log("Using fallback parcel data for item:", item.name);
            parcelsForShipping.push({
              length: 10,
              width: 10,
              height: 10,
              weight: 1,
              package_number: 1,
              package_protected: true,
              declared_value: 2500,
              consignment_note: "50202300", // Como string
              package_type: "4G",
            });
          }
        }
      });

      console.log("Final parcels for shipping:", JSON.stringify(parcelsForShipping, null, 2));
      console.log("Total parcels count:", parcelsForShipping.length);

      const shippingRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shipping`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderData.orderId,
            shipping_quotation_id: shippingQuoteId,
            shipping_rate_id: shippingRateId,
            address_from: JSON.stringify({
              street1: "Calle los molinos #7",
              name: "Jorge Vazquez",
              company: "Polenia",
              phone:"2282282364",
              email:"jorge.avazqqrespaldo@gmail.com",
              reference:"Escuela de tiro con arco Mendiola",
            }),
            address_to: JSON.stringify(address),
            parcels: JSON.stringify(parcelsForShipping),
          }),
        }
      );
      if (!shippingRes.ok) {
        const shippingErr = await shippingRes.json();
        throw new Error(
          shippingErr.error || "Failed to create shipping record"
        );
      }

      // Crear preferencia de pago en el backend
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-preference`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            cartItems,
            userName: isGuest ? address.name : undefined,
            userEmail: isGuest ? address.email : undefined,
            orderId: orderData.orderId,
            guestToken: guestToken, // Pass guest token to payment
            shipping_price: shippingCost || 0, // <-- Enviar shipping_price
          }),
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok) {
        throw new Error(
          paymentData.error || "Failed to create payment preference"
        );
      }

      dispatch(clearCartItems());

      // Store order info for success page
      const orderInfo = {
        orderId: orderData.orderId,
        guestToken: guestToken,
        isGuest: isGuest,
      };

      sessionStorage.setItem("pendingOrder", JSON.stringify(orderInfo));

      // Redirigir a MercadoPago
      window.location.href = paymentData.checkoutUrl;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Cotizar envío cuando la dirección esté completa
  const handleQuote = async () => {
    setError("");
    setShippingCost(null);
    setShippingDetails(null);
    setShippingQuoteId(null);
    setShippingRateId(null);

    if (
      !address.street1 ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      setError("Please fill all required address fields to quote shipping.");
      return;
    }

    setLoading(true);

    try {      const parcels: any[] = [];
      cartItems.forEach((item) => {
        // Solo usar quantity, no multiplicar por packageNumber
        for (let i = 0; i < item.quantity; i++) {
          if (item.parcel) {
            const { length, width, height, weight } = item.parcel;
            // Para cotización, solo enviar dimensiones básicas
            parcels.push({ 
              length, 
              width, 
              height, 
              weight
            });
          } else {
            // Fallback si no hay parcel en el producto
            parcels.push({
              length: 10,
              width: 10,
              height: 10,
              weight: 1
            });
          }
        }
      });

      const quoteData = {
        quotation: {
          order_id: "checkout-" + Date.now(),
          address_from: {
            country_code: "MX",
            postal_code: "68258", // Cambia por tu CP de origen real
            area_level1: "Oaxaca",
            area_level2: "San Pablo Etla",
            area_level3: "Centro",
          },
          address_to: {
            country_code: "MX",
            postal_code: address.zipCode,
            area_level1: address.state,
            area_level2: address.city,
            area_level3: address.street1,
          },
          parcels,
          // requested_carriers: ["fedex"], // Quitar filtro para cotizar con todos los carriers
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shipping/quote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to get shipping quote");
      }

      const preferred = data.rates?.find(
        (q: any) =>
          q.success === true ||
          (q.total && q.total !== null && q.status === "price_found_internal")
      );

      if (preferred) {
        setShippingCost(Number(preferred.total));
        setShippingDetails({
          provider: preferred.provider_name,
          service: preferred.provider_service_name,
          days: preferred.days,
          currency: preferred.currency_code,
          cost: preferred.cost,
          total: preferred.total,
          plan_type: preferred.plan_type,
        });
        setShippingQuoteId(data.id);
        setShippingRateId(preferred.id);
      } else {
        setError(
          "No shipping quotes available for your location. Please try a different address."
        );
      }
    } catch (err: any) {
      setError(
        err.message || "Error calculating shipping cost. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6E98]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF991F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#DDC7FF]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-12">
        <div className="max-w-4xl mx-auto transition-opacity duration-500 opacity-100 translate-y-0">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#FFFBF4]/90 backdrop-blur-sm text-[#6153E0] rounded-full text-sm font-semibold mb-6 border border-[#DDC7FF]/50 transition-all duration-300 scale-100 opacity-100">
              🛒 Secure Checkout
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#6153E0] mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-[#6153E0]/80 max-w-2xl mx-auto">
              Just one step away from enjoying our premium ginger beer
            </p>

            {/* Progress Steps for Guest Checkout */}
            {isGuest && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium text-[#6153E0]">
                    Info
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-[#DDC7FF]/50"></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      shippingCost !== null
                        ? "bg-gradient-to-br from-[#FF991F] to-[#D6E012] text-white"
                        : "bg-[#DDC7FF]/50 text-[#6153E0]/50"
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                      shippingCost !== null
                        ? "text-[#6153E0]"
                        : "text-[#6153E0]/50"
                    }`}
                  >
                    Shipping
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-[#DDC7FF]/50"></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      shippingCost !== null
                        ? "bg-gradient-to-br from-[#6153E0] to-[#FF6E98] text-white"
                        : "bg-[#DDC7FF]/50 text-[#6153E0]/50"
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                      shippingCost !== null
                        ? "text-[#6153E0]"
                        : "text-[#6153E0]/50"
                    }`}
                  >
                    Payment
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 transition-all duration-300">
              <div className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl p-12 border border-[#DDC7FF]/30 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-xl font-bold text-[#6153E0] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[#6153E0]/70 mb-6">
                  Add some delicious ginger beer to get started!
                </p>
                <button
                  onClick={() => router.push("/products")}
                  className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white font-semibold px-6 py-3 rounded-xl hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-300"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <section className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#6153E0] flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#DDC7FF]/30 hover:border-[#FF6E98]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#DDC7FF]/30 to-[#FF6E98]/20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#6153E0] mb-1">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#6153E0]/70">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-[#6153E0] text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#DDC7FF]/50 pt-4">
                  {/* Shipping breakdown if quoted */}
                  {shippingCost !== null && (
                    <div className="flex justify-between items-center bg-white/80 text-[#6153E0] p-4 rounded-2xl mb-2 border border-[#DDC7FF]/30">
                      <span className="text-lg font-semibold">Shipping:</span>
                      <span className="text-lg font-bold">
                        ${shippingCost.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white p-4 rounded-2xl transition-all duration-300">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold">
                      $
                      {(
                        calculateSubtotal() +
                        (shippingCost !== null ? shippingCost : 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Guest Information / Checkout Form */}
              <section className="bg-[#FFFBF4]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#DDC7FF]/30 transition-all duration-300">
                {isGuest ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-[#6153E0] flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      Shipping
                    </h2>
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={address.name}
                          onChange={(e) => 
                            setAddress((prev) => ({ ...prev, name: e.target.value }))}
                            //setName(e.target.value)}
                          className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={address.email}
                          onChange={(e) => 
                            setAddress((prev) => ({ ...prev, email: e.target.value }))
                            // setEmail(e.target.value)
                          }
                          className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={address.phone}
                          onChange={(e) => 
                            setAddress((prev) => ({ ...prev, phone: e.target.value }))
                            // setPhone(e.target.value)
                          }
                          className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#6153E0] mb-4">
                          Shipping Address
                        </label>

                        {/* Street Address */}
                        <div className="mb-3">
                          <input
                            type="text"
                            placeholder="Street address"
                            value={address.street1}
                            onChange={(e) =>
                              setAddress((prev) => ({
                                ...prev,
                                street1: e.target.value,
                              }))
                            }
                            className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                            required
                          />
                        </div>

                        {/* City and State Row */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            placeholder="City"
                            value={address.city}
                            onChange={(e) =>
                              setAddress((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                            required
                          />
                          <input
                            type="text"
                            placeholder="State/Province"
                            value={address.state}
                            onChange={(e) =>
                              setAddress((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                            className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                            required
                          />
                        </div>

                        {/* ZIP and Country Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="ZIP/Postal Code"
                            value={address.zipCode}
                            onChange={(e) =>
                              setAddress((prev) => ({
                                ...prev,
                                zipCode: e.target.value,
                              }))
                            }
                            className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                            required
                          />
                        </div>

                        {/* Reference */}
                        <div className="grid gap-3 mt-3">
                          <input
                            type="text"
                            placeholder="Reference"
                            value={address.reference}
                            onChange={(e) =>
                              setAddress((prev) => ({
                                ...prev,
                                reference: e.target.value,
                              }))
                            }
                            className="w-full border border-[#DDC7FF]/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6153E0] focus:border-transparent bg-white/80 backdrop-blur-sm text-[#6153E0] placeholder-[#6153E0]/50 transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D6E012] to-[#6153E0] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">
                        <Check />
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#6153E0] mb-2">
                      Ready to Checkout
                    </h2>
                    <p className="text-[#6153E0]/70 mb-6">
                      Your account information will be used for shipping
                    </p>
                  </div>
                )}

                {/* Shipping Quote Section */}
                <div className="mb-6">
                  {/* <h3 className="text-lg font-bold text-[#6153E0] mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#FF991F] to-[#D6E012] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">🚚</span>
                    </div>
                    Shipping Information
                  </h3> */}

                  {/* Quote Button */}
                  <button
                    onClick={handleQuote}
                    type="button"
                    disabled={
                      loading ||
                      (isGuest &&
                        (!address.street1 ||
                          !address.city ||
                          !address.state ||
                          !address.zipCode))
                    }
                    className="w-full bg-gradient-to-r from-[#FF991F] to-[#D6E012] hover:from-[#D6E012] hover:to-[#FF991F] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mb-4"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Calculating...</span>
                      </>
                    ) : (
                      <>
                        <span>🚚</span>
                        <span>Calculate Shipping Cost</span>
                      </>
                    )}
                  </button>

                  {/* Shipping Cost Display */}
                  {shippingCost !== null && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#D6E012]/30 mb-4 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#6153E0] font-semibold flex items-center">
                          <span className="mr-2">💰</span>
                          Shipping Cost:
                        </span>
                        <span className="text-xl font-bold text-[#FF991F]">
                          ${shippingCost.toFixed(2)} MXN
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Shipping Details */}
                  {shippingDetails && (
                    <div className="bg-gradient-to-r from-[#FFFBF4]/90 to-[#DDC7FF]/20 backdrop-blur-sm rounded-2xl p-4 border border-[#DDC7FF]/30 transition-all duration-300">
                      <h4 className="font-semibold text-[#6153E0] mb-3 flex items-center">
                        <span className="mr-2">📦</span>
                        Shipping Details
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/60 rounded-xl p-3">
                          <div className="text-[#6153E0]/70 mb-1">Provider</div>
                          <div className="font-semibold text-[#6153E0]">
                            {shippingDetails.provider}
                          </div>
                        </div>
                        <div className="bg-white/60 rounded-xl p-3">
                          <div className="text-[#6153E0]/70 mb-1">
                            Delivery Time
                          </div>
                          <div className="font-semibold text-[#6153E0]">
                            {shippingDetails.days} days
                          </div>
                        </div>
                        <div className="bg-white/60 rounded-xl p-3">
                          <div className="text-[#6153E0]/70 mb-1">Service</div>
                          <div className="font-semibold text-[#6153E0]">
                            {shippingDetails.service}
                          </div>
                        </div>
                        <div className="bg-white/60 rounded-xl p-3">
                          <div className="text-[#6153E0]/70 mb-1">
                            Total Cost
                          </div>
                          <div className="font-semibold text-[#FF991F]">
                            ${Number(shippingDetails.total).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shipping Required Notice */}
                  {!shippingCost && isGuest && (
                    <div className="bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-[#FF6E98] text-sm text-center flex items-center justify-center">
                        <span className="mr-2">ℹ️</span>
                        Please fill in your address and calculate shipping
                        before placing your order
                      </p>
                    </div>
                  )}
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || (isGuest && shippingCost === null)}
                  className="w-full bg-gradient-to-r from-[#6153E0] to-[#FF6E98] hover:from-[#FF6E98] hover:to-[#FF991F] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        <Lock />
                      </span>
                      <span>
                        {isGuest && shippingCost === null
                          ? "Calculate Shipping First"
                          : "Place Secure Order"}
                      </span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-xl backdrop-blur-sm transition-all duration-300">
                    <p className="text-[#FF6E98] font-medium text-center flex items-center justify-center">
                      <span className="mr-2">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-[#D6E012]/10 border border-[#D6E012]/30 rounded-xl backdrop-blur-sm">
                  <p className="text-xs text-[#6153E0]/70 text-center flex items-center justify-center">
                    <span className="mr-2">🔐</span>
                    Your payment information is secured with end-to-end
                    encryption
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
