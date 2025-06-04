'use client';

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

export default function AdminPage() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    countInStock: '',
  });
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    countInStock: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      const token = userInfo.token;

      const usersRes = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const productsRes = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(await usersRes.json());
      setProducts(await productsRes.json());
    };

    fetchData();
  }, [userInfo]);

  // Edit handlers
  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setEditForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      image: product.image || '',
      countInStock: product.countInStock.toString(),
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    if (!editingProductId) return;

    const token = userInfo.token;
    const res = await fetch(`/api/products/${editingProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
      setProducts(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
      );
      setEditingProductId(null);
    } else {
      console.error('Failed to update product');
    }
  };

  // Create handlers
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async () => {
    const token = userInfo.token;
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        setProducts(prev => [...prev, newProduct]);
        setCreateForm({ name: '', description: '', price: '', image: '', countInStock: '' });
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Delete handler
  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = userInfo.token;
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else {
      console.error('Failed to delete product');
    }
  };

  return (
    <main className="pt-24 px-4 pb-16 min-h-screen bg-yellow-50 text-yellow-900">
      <div className="max-w-5xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center text-yellow-900">Admin Dashboard</h1>

        {/* Users Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Users</h2>
          <ul className="bg-white rounded-xl shadow p-6 divide-y divide-yellow-100">
            {users.map(user => (
              <li key={user.id} className="py-2 flex justify-between">
                <span>
                  <span className="font-medium">{user.name}</span> ({user.email})
                </span>
                <span className="text-sm font-semibold uppercase text-yellow-700">{user.role}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Create Product Section */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Create Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={createForm.name}
              onChange={handleCreateChange}
              placeholder="Name"
              className="border border-yellow-300 px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="description"
              value={createForm.description}
              onChange={handleCreateChange}
              placeholder="Description"
              className="border border-yellow-300 px-3 py-2 rounded-md"
            />
            <input
              type="number"
              name="price"
              value={createForm.price}
              onChange={handleCreateChange}
              placeholder="Price"
              className="border border-yellow-300 px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="image"
              value={createForm.image}
              onChange={handleCreateChange}
              placeholder="Image URL"
              className="border border-yellow-300 px-3 py-2 rounded-md"
            />
            <input
              type="number"
              name="countInStock"
              value={createForm.countInStock}
              onChange={handleCreateChange}
              placeholder="Stock"
              className="border border-yellow-300 px-3 py-2 rounded-md"
            />
            <div className="col-span-full flex justify-end">
              <button
                onClick={handleCreateProduct}
                className="bg-yellow-800 text-white px-6 py-2 rounded hover:bg-yellow-900"
              >
                Create Product
              </button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Products</h2>
          <ul className="space-y-6">
            {products.map(product => (
              <li
                key={product.id}
                className="bg-white rounded-xl shadow p-4 space-y-2 border border-yellow-100"
              >
                {editingProductId === product.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Name"
                      className="border border-yellow-300 px-3 py-2 rounded-md"
                    />
                    <input
                      type="text"
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      className="border border-yellow-300 px-3 py-2 rounded-md"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Price"
                      className="border border-yellow-300 px-3 py-2 rounded-md"
                    />
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                      className="border border-yellow-300 px-3 py-2 rounded-md"
                    />
                    <input
                      type="number"
                      name="countInStock"
                      value={editForm.countInStock}
                      onChange={handleEditChange}
                      placeholder="Stock"
                      className="border border-yellow-300 px-3 py-2 rounded-md"
                    />
                    <div className="col-span-full flex gap-3 mt-2">
                      <button
                        onClick={handleUpdateProduct}
                        className="bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProductId(null)}
                        className="bg-gray-200 text-yellow-800 px-4 py-2 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-sm text-yellow-700">${product.price}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-yellow-700 underline hover:text-yellow-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 underline hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
