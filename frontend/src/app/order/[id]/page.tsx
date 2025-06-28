"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchOrderById } from "@/lib/api/orders";
import { Order, Address, OrderItem } from "@/types/order";
import {
  CheckCircle,
  Mail,
  Package,
  ArrowRight,
  MapPin,
  Truck,
  Download,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OrderPage() {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [skydropxOrder, setSkydropxOrder] = useState<any>(null);
  const [skydropxLoading, setSkydropxLoading] = useState(false);
  const [skydropxError, setSkydropxError] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const router = useRouter();

  // Get user info from Redux
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Helper function to render address
  const renderAddress = (address: Address | string | null | undefined) => {
    if (!address) return null;

    if (typeof address === "string") {
      // Legacy string address
      return (
        <div className="text-gray-900 w-full">
          <span>{address}</span>
        </div>
      );
    }

    // Structured address object
    return (
      <div className="text-gray-900 w-full">
        <div className="text-sm space-y-2">
          <div className="font-medium">{address.street1}</div>
          <div>
            {address.city}, {address.state} {address.zipCode}
          </div>
          <div className="font-semibold text-[#6153E0]">{address.country}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const guestToken = searchParams?.get("guestToken");

    console.log("Order page - userInfo:", userInfo);
    console.log("Order page - guestToken:", guestToken);

    if (userInfo?.token) {
      // Regular authenticated user
      console.log("Fetching order for authenticated user");
      fetchOrderById(id, userInfo.token)
        .then((data) => {
          console.log("Order data:", data);
          setOrder(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch order error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    } else if (guestToken) {
      // Guest user with token in URL
      console.log("Fetching order for guest user");
      fetchOrderById(id, guestToken)
        .then((data) => {
          console.log("Guest order data:", data);
          setOrder(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch guest order error:", error);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      // No authentication
      console.log("No authentication found");
      setIsError(true);
      setIsLoading(false);
    }
  }, [id, userInfo, searchParams]);

  // Fetch Skydropx shipment info when order is loaded and has status paid/processing
  useEffect(() => {
    if (!order || !order.id) return;
    setSkydropxLoading(true);
    fetch(`/api/shipping/skydropx-shipments/by-order/${order.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No Skydropx shipment");
        return res.json();
      })
      .then((data) => {
        console.log("Skydropx shipment data:", data);
        // Map Skydropx API response to a flat object for rendering
        setSkydropxOrder({
          status:
            data.data?.attributes?.workflow_status ||
            data.data?.attributes?.status ||
            "N/A",
          tracking_number:
            data.data?.attributes?.master_tracking_number || "N/A",
          carrier: data.data?.attributes?.carrier_name || "N/A",
          service_level_name:
            data.data?.attributes?.service_level_name || "N/A",
          label_url: data.data?.attributes?.label_url || null,
        });
        setSkydropxLoading(false);
      })
      .catch(() => {
        setSkydropxOrder(null);
        setSkydropxLoading(false);
        setSkydropxError(true);
      });
  }, [order]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#DDC7FF] border-t-[#6153E0] rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] flex justify-center items-center">
        <div className="text-center p-8 bg-[#FF6E98]/10 border border-[#FF6E98]/30 rounded-2xl max-w-md mx-auto backdrop-blur-sm opacity-0 animate-fade-in-down">
          <p className="text-[#FF6E98] font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-[#6153E0]/70 text-sm">
            Failed to load order details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFFBF4] to-[#F5F0FF] py-12 px-4 pt-30">
      <div
        className="max-w-5xl mx-auto animate-fade-in-down"
        style={{ animationDuration: "0.8s", animationDelay: "0.1s" }}
      >
        {/* Order Header with Status */}
        <div
          className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 animate-fade-in-down"
          style={{ animationDuration: "0.7s", animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                order.status === "paid" || order.status === "completed"
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : order.status === "pending"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                    : "bg-gradient-to-r from-gray-400 to-gray-600"
              }`}
            >
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Order #{order.id.substring(0, 8)}
              </h1>
              <p className="text-gray-500">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              order.status === "paid" || order.status === "completed"
                ? "bg-green-100 text-green-700"
                : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status.toUpperCase()}
          </div>
        </div>

        {/* Main Content Card */}
        <div
          className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100 animate-fade-in-down"
          style={{ animationDuration: "0.8s", animationDelay: "0.5s" }}
        >
          <div className="space-y-10">
            {/* Order Summary and Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6153E0]" />
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order ID:</span>
                    <code className="font-mono text-xs bg-gray-100 p-1 rounded text-gray-800">
                      {order.id}
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Items:</span>
                    <span className="text-gray-900">
                      {order.items?.reduce(
                        (sum: number, item: OrderItem) => sum + item.quantity,
                        0
                      ) || 0}
                    </span>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-2xl text-[#6153E0]">
                      ${Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#6153E0]" />
                  Customer Information
                </h2>
                <div className="space-y-3">
                  {order.guest_name && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Name</span>
                      <span className="font-medium text-gray-900">
                        {order.guest_name}
                      </span>
                    </div>
                  )}
                  {order.guest_email && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Email</span>
                      <span className="font-medium text-gray-900 break-all">
                        {order.guest_email}
                      </span>
                    </div>
                  )}
                  {order.guest_name && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                      💡 This order was placed as a guest
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              {order.guest_address && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#6153E0]" />
                    Shipping Address
                  </h2>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    {renderAddress(order.guest_address)}
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Tracking Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-fade-in-down"
                 style={{ animationDuration: "0.8s", animationDelay: "0.6s" }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#6153E0]" />
                Shipping Status
              </h2>

              {skydropxLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-gray-200 border-t-[#6153E0] rounded-full animate-spin mr-3" />
                  <p className="text-gray-600">
                    Loading shipping information...
                  </p>
                </div>
              )}

              {!skydropxLoading && skydropxOrder && (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div
                    className={`p-4 rounded-lg animate-fade-in-right ${
                      skydropxOrder.status === "delivered"
                        ? "bg-green-50 border border-green-200"
                        : skydropxOrder.status === "in_transit"
                          ? "bg-blue-50 border border-blue-200"
                          : skydropxOrder.status === "ready_to_ship"
                            ? "bg-yellow-50 border border-yellow-200"
                            : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          skydropxOrder.status === "delivered"
                            ? "bg-green-100"
                            : skydropxOrder.status === "in_transit"
                              ? "bg-blue-100"
                              : skydropxOrder.status === "ready_to_ship"
                                ? "bg-yellow-100"
                                : "bg-gray-100"
                        }`}
                      >
                        <Truck
                          className={`w-5 h-5 ${
                            skydropxOrder.status === "delivered"
                              ? "text-green-600"
                              : skydropxOrder.status === "in_transit"
                                ? "text-blue-600"
                                : skydropxOrder.status === "ready_to_ship"
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div
                          className={`font-semibold ${
                            skydropxOrder.status === "delivered"
                              ? "text-green-700"
                              : skydropxOrder.status === "in_transit"
                                ? "text-blue-700"
                                : skydropxOrder.status === "ready_to_ship"
                                  ? "text-yellow-700"
                                  : "text-gray-700"
                          }`}
                        >
                          {skydropxOrder.status === "delivered"
                            ? "Package Delivered"
                            : skydropxOrder.status === "in_transit"
                              ? "Package In Transit"
                              : skydropxOrder.status === "ready_to_ship"
                                ? "Ready to Ship"
                                : skydropxOrder.status
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-600">
                          {skydropxOrder.carrier} -{" "}
                          {skydropxOrder.service_level_name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        TRACKING NUMBER
                      </h3>
                      <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                        <code className="font-mono text-gray-900 font-semibold flex-grow">
                          {skydropxOrder.tracking_number !== "N/A"
                            ? skydropxOrder.tracking_number
                            : "Not available yet"}
                        </code>
                        {skydropxOrder.tracking_number !== "N/A" && (
                          <button
                            className="text-[#6153E0] hover:text-[#4933D0] text-xs font-medium"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                skydropxOrder.tracking_number
                              );
                              alert("Tracking number copied!");
                            }}
                          >
                            COPY
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        SHIPPING LABEL
                      </h3>
                      {skydropxOrder.label_url ? (
                        <a
                          href={skydropxOrder.label_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#6153E0] text-white p-3 rounded-lg hover:bg-[#5143C7] transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          <span className="font-medium">Download Label</span>
                        </a>
                      ) : (
                        <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                          Label not available yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!skydropxLoading && skydropxError && (
                <div className="text-center py-8 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 mb-2">
                    No shipping information available yet.
                  </p>
                  <p className="text-sm text-gray-500">
                    Shipping details will appear here once your order is
                    processed.
                  </p>
                </div>
              )}
            </div>

            {/* Order Items Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-fade-in-down"
                 style={{ animationDuration: "0.8s", animationDelay: "0.7s" }}>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#6153E0]" />
                Order Items
              </h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index: number) => (
                        <tr key={index} className="hover:bg-gray-50 animate-fade-in-right" 
                           style={{ animationDuration: "0.5s", animationDelay: `${0.8 + (index * 0.1)}s` }}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden mr-4">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    <Package className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-sm text-gray-600">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="text-sm font-medium text-gray-900">
                              $
                              {(
                                Number(item.price) * Number(item.quantity)
                              ).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              (${Number(item.price).toFixed(2)} each)
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-6 text-center text-gray-500"
                        >
                          No items found in this order
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan={2}
                        className="py-3 px-4 text-right text-sm font-medium text-gray-500"
                      >
                        Subtotal:
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        $
                        {(
                          Number(order.total) -
                          Number(order.shipping_price || 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        className="py-3 px-4 text-right text-sm font-medium text-gray-500"
                      >
                        Shipping:
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        ${Number(order.shipping_price || 0).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td
                        colSpan={2}
                        className="py-3 px-4 text-right text-base font-bold text-gray-900"
                      >
                        Total:
                      </td>
                      <td className="py-3 px-4 text-right text-base font-bold text-[#6153E0]">
                        ${Number(order.total).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-down" 
                 style={{ animationDuration: "0.8s", animationDelay: "1s" }}>
              <Link
                href="/products"
                className="flex-1 bg-[#6153E0] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#5143C7] transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/"
                className="flex-1 bg-white text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
