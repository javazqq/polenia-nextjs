"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/api/products";
import { fetchOrders, fetchOrderById } from "@/lib/api/orders";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 6;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    countInStock: "",
    parcel: {
      length: "",
      width: "",
      height: "",
      weight: "",
      packageType: "",
      declaredValue: "",
      packageNumber: "",
      consignmentNote: "",
      packageProtected: false,
    },
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [expandedOrderDetails, setExpandedOrderDetails] = useState<any>(null);
  const [expandedOrderLoading, setExpandedOrderLoading] = useState(false);
  const [expandedOrderError, setExpandedOrderError] = useState<string | null>(
    null
  );
  const [editProduct, setEditProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [orderSearchTerm, setOrderSearchTerm] = useState<string>("");

  // Siempre ordenar antes de paginar para evitar bugs de mutación
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt || "1970-01-01").getTime();
    const dateB = new Date(b.createdAt || "1970-01-01").getTime();
    return dateB - dateA;
  });
  const totalPages = Math.ceil(sortedOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return (a.price || 0) - (b.price || 0);
        case "stock":
          return (a.countInStock || 0) - (b.countInStock || 0);
        default:
          return 0;
      }
    });

  // Filter orders
  const filteredOrders = sortedOrders.filter(
    (order) =>
      order.id
        .toString()
        .toLowerCase()
        .includes(orderSearchTerm.toLowerCase()) ||
      (order.guestName &&
        order.guestName
          .toLowerCase()
          .includes(orderSearchTerm.toLowerCase())) ||
      (order.guestEmail &&
        order.guestEmail
          .toLowerCase()
          .includes(orderSearchTerm.toLowerCase())) ||
      (order.status &&
        order.status.toLowerCase().includes(orderSearchTerm.toLowerCase()))
  );

  const totalFilteredPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedFilteredOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/dashboard");
    }
  }, [userInfo, router]);

  useEffect(() => {
    if (!userInfo) return;
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) return;
    setOrdersLoading(true);
    fetchOrders()
      .then((data) => {
        setOrders(data);
        setOrdersLoading(false);
      })
      .catch((err) => {
        setOrdersError("Failed to load orders");
        setOrdersLoading(false);
      });
  }, [userInfo]);

  useEffect(() => {
    setCurrentPage(1); // Siempre mostrar la página más reciente al cargar o cambiar órdenes
  }, [orders]);

  // Reset page when changing search terms
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, orderSearchTerm, activeTab]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (name.startsWith("parcel.")) {
      const parcelField = name.replace("parcel.", "");
      setForm((prev) => ({
        ...prev,
        parcel: {
          ...prev.parcel,
          [parcelField]:
            type === "checkbox" && e.target instanceof HTMLInputElement
              ? e.target.checked
              : value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleEdit(product: any) {
    console.log("Editing product:", product); // Debug log
    setShowForm(true);
    setEditProduct(product);

    // Parse parcel data if it's a JSON string
    let parcelData = {
      length: "",
      width: "",
      height: "",
      weight: "",
      packageType: "",
      declaredValue: "",
      packageNumber: "",
      consignmentNote: "",
      packageProtected: false,
    };

    if (product.parcel) {
      console.log(
        "Product parcel data:",
        product.parcel,
        "Type:",
        typeof product.parcel
      ); // Debug log
      if (typeof product.parcel === "string") {
        try {
          parcelData = JSON.parse(product.parcel);
          console.log("Parsed parcel data:", parcelData); // Debug log
        } catch (e) {
          console.error("Error parsing parcel data:", e);
        }
      } else if (typeof product.parcel === "object") {
        parcelData = product.parcel;
        console.log("Using object parcel data:", parcelData); // Debug log
      }
    }

    setForm({
      name: product.name || "",
      description: product.description || "",
      image: product.image || "",
      price: product.price || "",
      countInStock: product.countInStock || "",
      parcel: {
        length: parcelData.length || "",
        width: parcelData.width || "",
        height: parcelData.height || "",
        weight: parcelData.weight || "",
        packageType: parcelData.packageType || "",
        declaredValue: parcelData.declaredValue || "",
        packageNumber: parcelData.packageNumber || "",
        consignmentNote: parcelData.consignmentNote || "",
        packageProtected: parcelData.packageProtected || false,
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    try {
      if (editProduct) {
        await updateProduct(editProduct.id, {
          id: editProduct.id,
          name: form.name,
          description: form.description,
          image: form.image,
          price: Number(form.price),
          countInStock: Number(form.countInStock),
          parcel: {
            length: Number(form.parcel.length),
            width: Number(form.parcel.width),
            height: Number(form.parcel.height),
            weight: Number(form.parcel.weight),
            packageType: form.parcel.packageType,
            declaredValue: Number(form.parcel.declaredValue),
            packageNumber: Number(form.parcel.packageNumber),
            consignmentNote: form.parcel.consignmentNote,
            packageProtected: form.parcel.packageProtected,
          },
        });
      } else {
        await createProduct({
          name: form.name,
          description: form.description,
          image: form.image,
          price: Number(form.price),
          countInStock: Number(form.countInStock),
          parcel: {
            length: Number(form.parcel.length),
            width: Number(form.parcel.width),
            height: Number(form.parcel.height),
            weight: Number(form.parcel.weight),
            packageType: form.parcel.packageType,
            declaredValue: Number(form.parcel.declaredValue),
            packageNumber: Number(form.parcel.packageNumber),
            consignmentNote: form.parcel.consignmentNote,
            packageProtected: form.parcel.packageProtected,
          },
        });
      }
      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
        countInStock: "",
        parcel: {
          length: "",
          width: "",
          height: "",
          weight: "",
          packageType: "",
          declaredValue: "",
          packageNumber: "",
          consignmentNote: "",
          packageProtected: false,
        },
      });
      setShowForm(false);
      setEditProduct(null);
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (err: any) {
      setCreateError(err.message || "Failed to save product");
    } finally {
      setCreating(false);
    }
  }

  // Calculate statistics
  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + (order.totalPrice || order.total || order.amount || 0),
    0
  );

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const lowStockProducts = products.filter((p) => p.countInStock < 5).length;
  const outOfStockProducts = products.filter(
    (p) => p.countInStock === 0
  ).length;

  // Orders this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const ordersThisMonth = orders.filter((order) => {
    const orderDate = new Date(order.createdAt || order.created_at);
    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  }).length;

  // Revenue this month
  const revenueThisMonth = orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt || order.created_at);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, order) =>
        sum + (order.totalPrice || order.total || order.amount || 0),
      0
    );

  // Average order value
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Export functions
  function exportOrdersToCSV() {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Total",
      "Status",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...orders.map((order) =>
        [
          order.id,
          `"${order.guestName || order.guest_name || "N/A"}"`,
          `"${order.guestEmail || order.guest_email || "N/A"}"`,
          order.totalPrice || order.total || 0,
          order.status || "pending",
          new Date(order.createdAt || order.created_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function exportProductsToCSV() {
    const headers = ["ID", "Name", "Description", "Price", "Stock"];
    const csvContent = [
      headers.join(","),
      ...products.map((product) =>
        [
          product.id,
          `"${product.name}"`,
          `"${product.description || ""}"`,
          product.price,
          product.countInStock,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  if (!userInfo) {
    return null;
  }

  return (
    <main className="pt-30 min-h-screen flex flex-col items-center justify-start bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] p-4 pt-36 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-[#6153E0]/10 to-[#FF6E98]/10 rounded-full transform translate-x-1/2 -translate-y-1/4"></div>

        {/* Medium circle */}
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-bl from-[#FF991F]/10 to-[#D6E012]/10 rounded-full"></div>

        {/* Small floating elements */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-[#FF6E98]/10 rounded-full blur-sm"></div>
      </div>

      {/* Main container - horizontal layout */}
      <div className="w-full max-w-7xl md:grid md:grid-cols-4 md:gap-6 mb-8 z-10 relative">
        {/* Sidebar with stats (left column on desktop) */}
        <div className="md:col-span-1 mb-6 md:mb-0">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-white/40 overflow-hidden">
            {/* Header with gradient bar */}
            <div className="h-2 bg-gradient-to-r from-[#6153E0] via-[#FF6E98] to-[#FF991F]"></div>

            {/* Dashboard header */}
            <div className="p-4 text-center border-b border-[#DDC7FF]/30">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-[#6153E0]/70 text-sm font-medium">
                Welcome, {userInfo.name}!
              </p>
            </div>

            {/* Statistics in sidebar */}
            <div className="p-4">
              <div className="space-y-4">
                <div className="bg-[#F8F4FF]/50 rounded-xl p-3 border border-[#DDC7FF]/30">
                  <div className="font-semibold text-[#6153E0] text-sm mb-1">
                    Total Revenue
                  </div>
                  <div className="text-xl font-bold text-[#6153E0]">
                    ${totalRevenue.toFixed(2)}
                  </div>
                </div>

                <div className="bg-[#FFFBF4]/50 rounded-xl p-3 border border-[#FFD6E6]/30">
                  <div className="font-semibold text-[#FF6E98] text-sm mb-1">
                    Total Orders
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                    {totalOrders}
                  </div>
                </div>

                <div className="bg-[#F8F4FF]/50 rounded-xl p-3 border border-[#DDC7FF]/30">
                  <div className="font-semibold text-[#6153E0] text-sm mb-1">
                    Total Products
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent">
                    {totalProducts}
                  </div>
                </div>

                <div className="bg-[#FFFBF4]/50 rounded-xl p-3 border border-[#FFD6E6]/30">
                  <div className="font-semibold text-[#FF991F] text-sm mb-1">
                    Avg Order Value
                  </div>
                  <div className="text-xl font-bold text-[#FF991F]">
                    ${averageOrderValue.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly stats and alerts */}
            <div className="border-t border-[#DDC7FF]/30">
              <div className="p-4">
                <h3 className="font-semibold text-[#6153E0] text-sm mb-2">
                  This Month
                </h3>
                <div className="text-sm font-medium text-[#FF6E98] mb-1">
                  {ordersThisMonth} orders
                </div>
                <div className="text-sm font-medium text-[#6153E0]">
                  ${revenueThisMonth.toFixed(2)} revenue
                </div>
              </div>
            </div>

            <div className="border-t border-[#DDC7FF]/30">
              <div className="p-4">
                <h3 className="font-semibold text-[#6153E0] text-sm mb-2">
                  Inventory Alerts
                </h3>
                <div className="text-xs font-medium text-[#FF991F] mb-1">
                  {lowStockProducts} products low stock ({"<"}5)
                </div>
                <div className="text-xs font-medium text-[#FF6E98]">
                  {outOfStockProducts} products out of stock
                </div>
              </div>
            </div>

            <div className="p-3 text-center text-xs text-[#6153E0]/70 border-t border-[#DDC7FF]/30 bg-[#F8F4FF]/30">
              <div className="font-medium">{new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Main content (right column on desktop) */}
        <div className="md:col-span-3 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#DDC7FF]/30">
            <button
              className={`flex-1 py-3 font-semibold text-lg transition-all ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-[#F8F4FF] to-white text-[#6153E0] border-b-2 border-[#6153E0]"
                  : "text-[#6153E0]/70 hover:bg-[#F8F4FF]/50"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`flex-1 py-3 font-semibold text-lg transition-all ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-[#FFFBF4] to-white text-[#FF6E98] border-b-2 border-[#FF6E98]"
                  : "text-[#FF6E98]/70 hover:bg-[#FFFBF4]/50"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            {activeTab === "products" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#6153E0] to-[#FF6E98] bg-clip-text text-transparent">
                    Products
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="bg-gradient-to-r from-[#D6E012] to-[#FF991F] text-white px-4 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all text-sm"
                      onClick={exportProductsToCSV}
                    >
                      Export CSV
                    </button>
                    <button
                      className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-4 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all"
                      onClick={() => setShowForm((v) => !v)}
                    >
                      {showForm ? "Cancel" : "Add Product"}
                    </button>
                  </div>
                </div>
                {showForm && (
                  <form
                    onSubmit={handleSubmit}
                    className="mb-6 bg-[#F8F4FF]/70 backdrop-blur-md p-6 rounded-xl border border-[#DDC7FF] flex flex-col gap-3 shadow"
                  >
                    <input
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={form.description}
                      onChange={handleChange}
                      className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                    />
                    <input
                      name="image"
                      placeholder="Image URL"
                      value={form.image}
                      onChange={handleChange}
                      className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        name="price"
                        placeholder="Price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="countInStock"
                        placeholder="Stock"
                        type="number"
                        value={form.countInStock}
                        onChange={handleChange}
                        required
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                    </div>
                    <div className="font-semibold text-[#6153E0] mt-2 mb-1">
                      Parcel Details
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="parcel.length"
                        placeholder="Length"
                        type="number"
                        value={form.parcel.length}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.width"
                        placeholder="Width"
                        type="number"
                        value={form.parcel.width}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.height"
                        placeholder="Height"
                        type="number"
                        value={form.parcel.height}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.weight"
                        placeholder="Weight"
                        type="number"
                        value={form.parcel.weight}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.packageType"
                        placeholder="Package Type"
                        value={form.parcel.packageType}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.declaredValue"
                        placeholder="Declared Value"
                        type="number"
                        value={form.parcel.declaredValue}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.packageNumber"
                        placeholder="Package Number"
                        type="number"
                        value={form.parcel.packageNumber}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <input
                        name="parcel.consignmentNote"
                        placeholder="Consignment Note"
                        value={form.parcel.consignmentNote}
                        onChange={handleChange}
                        className="border border-[#DDC7FF] rounded-xl px-3 py-2 bg-white/50 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                      />
                      <label className="flex items-center col-span-2">
                        <input
                          name="parcel.packageProtected"
                          type="checkbox"
                          checked={form.parcel.packageProtected}
                          onChange={handleChange}
                          className="mr-2 h-5 w-5 accent-[#6153E0]"
                        />
                        <span className="text-[#6153E0]">
                          Package Protected
                        </span>
                      </label>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white px-4 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all flex-1 disabled:opacity-50"
                        disabled={creating}
                      >
                        {creating
                          ? editProduct
                            ? "Updating..."
                            : "Creating..."
                          : editProduct
                            ? "Update"
                            : "Create"}
                      </button>
                      <button
                        type="button"
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                        onClick={() => {
                          setShowForm(false);
                          setEditProduct(null);
                          setForm({
                            name: "",
                            description: "",
                            image: "",
                            price: "",
                            countInStock: "",
                            parcel: {
                              length: "",
                              width: "",
                              height: "",
                              weight: "",
                              packageType: "",
                              declaredValue: "",
                              packageNumber: "",
                              consignmentNote: "",
                              packageProtected: false,
                            },
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    {createError && (
                      <div className="text-[#FF6E98] text-sm mt-2">
                        {createError}
                      </div>
                    )}
                  </form>
                )}

                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-[#F8F4FF]/30 p-4 rounded-xl border border-[#DDC7FF]/30">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-[#DDC7FF] rounded-xl px-4 py-3 text-sm bg-white/80 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "name" | "price" | "stock")
                    }
                    className="border border-[#DDC7FF] rounded-xl px-4 py-3 text-sm bg-white/80 focus:ring-2 focus:ring-[#6153E0] focus:outline-none"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="stock">Sort by Stock</option>
                  </select>
                </div>

                {loading ? (
                  <div className="text-center py-8 text-[#6153E0]/50">
                    Loading products...
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-[#FF6E98]">{error}</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-[#6153E0]/50">
                    {searchTerm
                      ? `No products found for "${searchTerm}"`
                      : "No products found."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`border rounded-xl shadow-md transition-all hover:shadow-lg flex flex-col overflow-hidden ${
                          product.countInStock === 0
                            ? "bg-[#FF6E98]/10 border-[#FF6E98]/30"
                            : product.countInStock < 5
                              ? "bg-[#FF991F]/10 border-[#FF991F]/30"
                              : "bg-white/50 border-[#DDC7FF]"
                        }`}
                      >
                        {/* Image preview - edge-to-edge, top of card */}
                        <div className="w-full h-40 bg-[#F8F4FF] flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-[#DDC7FF] text-xs">
                              No Image
                            </span>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-2 p-5">
                          <div className="flex justify-between items-start">
                            <div className="font-bold text-[#6153E0]">
                              {product.name}
                            </div>
                            {product.countInStock === 0 && (
                              <span className="text-xs bg-[#FF6E98] text-white px-2 py-1 rounded-lg">
                                OUT OF STOCK
                              </span>
                            )}
                            {product.countInStock > 0 &&
                              product.countInStock < 5 && (
                                <span className="text-xs bg-[#FF991F] text-white px-2 py-1 rounded-lg">
                                  LOW STOCK
                                </span>
                              )}
                          </div>
                          <div className="text-sm text-[#6153E0]/70 line-clamp-2">
                            {product.description}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-semibold text-[#FF6E98]">
                              ${product.price}
                            </span>
                            <span className="text-xs text-[#6153E0]/70 bg-white/50 px-2 py-1 rounded-lg border border-[#DDC7FF]">
                              Stock: {product.countInStock}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Link
                              href={`/products/${product.id}`}
                              className="text-xs text-[#6153E0] hover:underline bg-white/50 px-2 py-1 rounded-lg border border-[#DDC7FF] flex-1 text-center"
                            >
                              View
                            </Link>
                            <button
                              className="text-xs text-[#FF6E98] hover:underline bg-white/50 px-2 py-1 rounded-lg border border-[#FFD6E6] flex-1 text-center"
                              onClick={async () => {
                                if (
                                  !confirm(
                                    "Are you sure you want to delete this product?"
                                  )
                                )
                                  return;
                                try {
                                  await deleteProduct(product.id);
                                  setProducts((prev) =>
                                    prev.filter((p) => p.id !== product.id)
                                  );
                                } catch (err) {
                                  alert("Failed to delete product");
                                }
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="text-xs text-[#6153E0] hover:underline bg-white/50 px-2 py-1 rounded-lg border border-[#DDC7FF] flex-1 text-center"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "orders" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#FF6E98] to-[#FF991F] bg-clip-text text-transparent">
                    Orders
                  </h2>
                  <button
                    className="bg-gradient-to-r from-[#D6E012] to-[#FF991F] text-white px-4 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all text-sm"
                    onClick={exportOrdersToCSV}
                  >
                    Export CSV
                  </button>
                </div>

                {/* Search Orders */}
                <div className="mb-6 bg-[#FFFBF4]/30 p-4 rounded-xl border border-[#FFD6E6]/30">
                  <input
                    type="text"
                    placeholder="Search orders by ID, customer name, email, or status..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                    className="w-full border border-[#FFD6E6] rounded-xl px-4 py-3 text-sm bg-white/80 focus:ring-2 focus:ring-[#FF6E98] focus:outline-none"
                  />
                </div>

                {ordersLoading ? (
                  <div className="text-center py-8 text-[#FF6E98]/50">
                    Loading orders...
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-8 text-[#FF6E98]">
                    {ordersError}
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-8 text-[#FF6E98]/50">
                    {orderSearchTerm
                      ? `No orders found for "${orderSearchTerm}"`
                      : "No orders found."}
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto rounded-xl border border-[#FFD6E6] shadow-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#FF6E98]/20 to-[#FF991F]/20 text-[#FF6E98] border-b border-[#FFD6E6]">
                            <th className="px-4 py-3 text-left">Order ID</th>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3 text-left">Total</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Details</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white/50">
                          {paginatedFilteredOrders.map((order) => (
                            <Fragment key={order.id}>
                              <tr className="border-b border-[#FFD6E6]/30 last:border-0 hover:bg-[#FFFBF4]/50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-[#FF6E98]">
                                  {order.id}
                                </td>
                                <td className="px-4 py-3">
                                  {order.guestName || "N/A"}
                                </td>
                                <td className="px-4 py-3">
                                  ${order.totalPrice || "0.00"}
                                </td>
                                <td className="px-4 py-3 capitalize">
                                  <span className="bg-[#FF6E98]/10 text-[#FF6E98] px-2 py-1 rounded-lg text-xs font-medium">
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <button
                                    className="text-xs bg-white/60 text-[#6153E0] px-3 py-1 rounded-lg border border-[#DDC7FF] hover:bg-[#F8F4FF] transition-colors"
                                    onClick={async () => {
                                      if (expandedOrderId === order.id) {
                                        setExpandedOrderId(null);
                                        setExpandedOrderDetails(null);
                                        setExpandedOrderError(null);
                                      } else {
                                        setExpandedOrderId(order.id);
                                        setExpandedOrderLoading(true);
                                        setExpandedOrderError(null);
                                        try {
                                          const details = await fetchOrderById(
                                            order.id,
                                            userInfo?.token
                                          );
                                          setExpandedOrderDetails(details);
                                        } catch (err: any) {
                                          setExpandedOrderDetails(null);
                                          setExpandedOrderError(
                                            "Failed to load order details"
                                          );
                                        } finally {
                                          setExpandedOrderLoading(false);
                                        }
                                      }
                                    }}
                                  >
                                    {expandedOrderId === order.id
                                      ? "Hide"
                                      : "Details"}
                                  </button>
                                </td>
                              </tr>
                              {expandedOrderId === order.id && (
                                <tr>
                                  <td
                                    colSpan={5}
                                    className="bg-[#F8F4FF] px-4 py-4 border-b border-[#FFD6E6]/30"
                                  >
                                    {expandedOrderLoading ? (
                                      <div className="text-center text-[#6153E0]/50">
                                        Loading details...
                                      </div>
                                    ) : expandedOrderError ? (
                                      <div className="text-center text-[#FF6E98]">
                                        {expandedOrderError}
                                      </div>
                                    ) : expandedOrderDetails ? (
                                      <div className="flex flex-col gap-2 text-sm text-[#6153E0]/80 bg-white/60 rounded-xl p-4 backdrop-blur-md border border-[#DDC7FF]/50">
                                        <div>
                                          <span className="font-semibold text-[#6153E0]">
                                            Date:
                                          </span>{" "}
                                          {expandedOrderDetails.created_at
                                            ? new Date(
                                                expandedOrderDetails.created_at
                                              ).toLocaleString()
                                            : "N/A"}
                                        </div>
                                        <div>
                                          <span className="font-semibold text-[#6153E0]">
                                            Address:
                                          </span>{" "}
                                          {expandedOrderDetails.guest_address
                                            ? `${expandedOrderDetails.guest_address.street1}, ${expandedOrderDetails.guest_address.city}, ${expandedOrderDetails.guest_address.state}, ${expandedOrderDetails.guest_address.country}, ${expandedOrderDetails.guest_address.zipCode}`
                                            : expandedOrderDetails.address
                                              ? `${expandedOrderDetails.address.street1}, ${expandedOrderDetails.address.city}, ${expandedOrderDetails.address.state}, ${expandedOrderDetails.address.country}, ${expandedOrderDetails.address.zipCode}`
                                              : "N/A"}
                                        </div>
                                        <div>
                                          <span className="font-semibold text-[#6153E0]">
                                            Email:
                                          </span>{" "}
                                          {expandedOrderDetails.guest_email ||
                                            expandedOrderDetails.email ||
                                            "N/A"}
                                        </div>
                                        <div>
                                          <span className="font-semibold text-[#6153E0]">
                                            Items:
                                          </span>{" "}
                                          {expandedOrderDetails.items
                                            ? expandedOrderDetails.items
                                                .map(
                                                  (item: any) =>
                                                    `${item.name || item.product_name} (x${item.quantity})`
                                                )
                                                .join(", ")
                                            : "N/A"}
                                        </div>
                                      </div>
                                    ) : null}
                                  </td>
                                </tr>
                              )}
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between mt-6 bg-[#FFFBF4]/30 p-4 rounded-xl border border-[#FFD6E6]/30">
                      <button
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#FF6E98] to-[#FF991F] text-white hover:shadow-lg"}`}
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span className="text-sm text-[#6153E0]/70">
                        Page {currentPage} of {totalFilteredPages} (
                        {filteredOrders.length} orders)
                      </span>
                      <button
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${currentPage === totalFilteredPages || totalFilteredPages === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#FF6E98] to-[#FF991F] text-white hover:shadow-lg"}`}
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(totalFilteredPages, p + 1)
                          )
                        }
                        disabled={
                          currentPage === totalFilteredPages ||
                          totalFilteredPages === 0
                        }
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
