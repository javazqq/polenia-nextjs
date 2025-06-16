"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  countInStock: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Order {
  id: string;
  total: number;
  created_at: string;
  user_id?: number;
  guest_name?: string;
  guest_email?: string;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  user_name?: string;
  user_email?: string;
}

export default function Dashboard() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    countInStock: "",
  });
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    countInStock: "",
  });

  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "users" | "products" | "create" | "orders"
  >("dashboard");

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      const token = userInfo.token;

      const usersRes = await fetch("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const productsRes = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ordersRes = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(await usersRes.json());
      setProducts(await productsRes.json());
      setOrders(await ordersRes.json());
    };

    fetchData();
  }, [userInfo]);

  // Edit handlers
  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setEditForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image: product.image || "",
      countInStock: product.countInStock.toString(),
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    if (!editingProductId) return;

    const token = userInfo.token;
    const res = await fetch(`/api/products/${editingProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...editForm,
        price: parseFloat(editForm.price),
        countInStock: parseInt(editForm.countInStock),
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingProductId(null);
    } else {
      console.error("Failed to update product");
    }
  };

  // Create handlers
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async () => {
    const token = userInfo.token;
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...createForm,
          price: parseFloat(createForm.price),
          countInStock: parseInt(createForm.countInStock),
        }),
      });

      if (res.ok) {
        const newProduct = await res.json();
        setProducts((prev) => [...prev, newProduct]);
        setCreateForm({
          name: "",
          description: "",
          price: "",
          image: "",
          countInStock: "",
        });
      } else {
        console.error("Failed to create product");
        console.log(await res.text());
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Delete handler
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const token = userInfo.token;
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      console.error("Failed to delete product");
    }
  };

  return (
    <div className="p-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all duration-500 opacity-100 translate-y-0">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Complete management system for users, products, and orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: "dashboard", label: "📊 Overview", icon: "📊" },
              { id: "users", label: "👥 Users", icon: "👥" },
              { id: "create", label: "➕ Create Product", icon: "➕" },
              { id: "products", label: "📦 Products", icon: "📦" },
              { id: "orders", label: "🛒 Orders", icon: "🛒" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label.split(" ").slice(1).join(" ")}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 transition-all duration-500 opacity-100 translate-y-0">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold">{users.length}</p>
                  </div>
                  <div className="text-4xl opacity-80">👥</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>
                  <div className="text-4xl opacity-80">📦</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold">{orders.length}</p>
                  </div>
                  <div className="text-4xl opacity-80">🛒</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🚀 Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab("users")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-3xl mb-2">👥</div>
                  <div className="font-semibold">Manage Users</div>
                  <div className="text-sm opacity-90">
                    View and manage user accounts
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-3xl mb-2">➕</div>
                  <div className="font-semibold">Add Product</div>
                  <div className="text-sm opacity-90">Create new products</div>
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <div className="font-semibold">View Inventory</div>
                  <div className="text-sm opacity-90">
                    Manage product catalog
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-3xl mb-2">🛒</div>
                  <div className="font-semibold">View Orders</div>
                  <div className="text-sm opacity-90">
                    Track customer orders
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📈 Recent Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Active Users</span>
                    <span className="font-bold text-blue-600">
                      {users.filter((u) => u.role !== "guest").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Products in Stock</span>
                    <span className="font-bold text-green-600">
                      {products.filter((p) => p.countInStock > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Pending Orders</span>
                    <span className="font-bold text-purple-600">
                      {orders.filter((o) => o.status === "pending").length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  💰 Revenue Summary
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="text-sm text-green-700">Total Revenue</div>
                    <div className="text-2xl font-bold text-green-800">
                      $
                      {orders
                        .reduce((sum, order) => sum + Number(order.total), 0)
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on {orders.length} total orders
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Management Section */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 opacity-100 translate-y-0">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                👥 User Management
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Manage all registered users and their roles
              </p>
            </div>
            <div className="p-6">
              {users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">👤</div>
                  <p>No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                              #{user.id}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {user.role !== "guest" ? (
                              <span className="font-medium text-gray-900">
                                {user.name}
                              </span>
                            ) : (
                              <span className="text-gray-500 italic">
                                Guest User
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {user.role !== "guest" ? (
                              <span className="text-gray-600">
                                {user.email}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                user.role === "admin"
                                  ? "bg-red-100 text-red-800"
                                  : user.role === "user"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Creation Section */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 opacity-100 translate-y-0">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                ➕ Create New Product
              </h2>
              <p className="text-green-100 text-sm mt-1">
                Add a new product to your inventory
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    field: "name",
                    label: "Product Name",
                    type: "text",
                    icon: "🏷️",
                  },
                  {
                    field: "price",
                    label: "Price ($)",
                    type: "number",
                    icon: "💰",
                  },
                  {
                    field: "countInStock",
                    label: "Stock Count",
                    type: "number",
                    icon: "📊",
                  },
                  {
                    field: "image",
                    label: "Image URL",
                    type: "text",
                    icon: "🖼️",
                  },
                ].map(({ field, label, type, icon }) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <span className="mr-2">{icon}</span>
                      {label}
                    </label>
                    <input
                      type={type}
                      name={field}
                      value={createForm[field as keyof typeof createForm]}
                      onChange={handleCreateChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">📝</span>
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={createForm.description}
                    onChange={handleCreateChange}
                    placeholder="Enter product description"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCreateProduct}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ✨ Create Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Management Section */}
        {activeTab === "products" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 opacity-100 translate-y-0">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                📦 Product Inventory
              </h2>
              <p className="text-indigo-100 text-sm mt-1">
                Manage your product catalog and inventory
              </p>
            </div>
            <div className="p-6">
              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold mb-2">
                    No Products Yet
                  </h3>
                  <p className="mb-4">Start by creating your first product</p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
                  >
                    ➕ Create Your First Product
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      {editingProductId === product.id ? (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            ✏️ Editing Product
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { field: "name", label: "Name", type: "text" },
                              {
                                field: "price",
                                label: "Price",
                                type: "number",
                              },
                              {
                                field: "countInStock",
                                label: "Stock",
                                type: "number",
                              },
                              {
                                field: "image",
                                label: "Image URL",
                                type: "text",
                              },
                            ].map(({ field, label, type }) => (
                              <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {label}
                                </label>
                                <input
                                  type={type}
                                  name={field}
                                  value={
                                    editForm[field as keyof typeof editForm]
                                  }
                                  onChange={handleEditChange}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                              </div>
                            ))}
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <input
                                type="text"
                                name="description"
                                value={editForm.description}
                                onChange={handleEditChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleUpdateProduct}
                              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                            >
                              ✅ Save Changes
                            </button>
                            <button
                              onClick={() => setEditingProductId(null)}
                              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                              ❌ Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {product.name}
                              </h3>
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                                ID: {product.id}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center text-green-600 font-semibold">
                                💰 ${product.price.toFixed(2)}
                              </span>
                              <span className="flex items-center text-blue-600">
                                📊 Stock: {product.countInStock}
                              </span>
                              {product.image && (
                                <span className="flex items-center text-purple-600">
                                  🖼️ Has Image
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Management Section */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 opacity-100 translate-y-0">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                🛒 Order Management
              </h2>
              <p className="text-orange-100 text-sm mt-1">
                Track and manage all customer orders
              </p>
            </div>
            <div className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                  <p>Orders will appear here once customers start purchasing</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-bold text-gray-900">
                              🧾 Order #{order.id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center text-gray-600">
                              👤{" "}
                              {order.user_id
                                ? (() => {
                                    const user = users.find(
                                      (u) => u.id === order.user_id
                                    );
                                    return user
                                      ? `${user.name} (${user.email})`
                                      : `User ID: ${order.user_id}`;
                                  })()
                                : order.guest_name && order.guest_email
                                ? `Guest: ${order.guest_name} (${order.guest_email})`
                                : "Unknown User"}
                            </p>
                            <p className="flex items-center text-gray-600">
                              📅 {new Date(order.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              📋 Order Items:
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-3">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-1"
                                >
                                  <span className="text-gray-700">
                                    {item.quantity}× {item.name}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg">
                            <p className="text-sm font-medium">Total Amount</p>
                            <p className="text-2xl font-bold">
                              ${Number(order.total).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
