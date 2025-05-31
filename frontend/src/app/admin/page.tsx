// /app/admin/page.tsx or /pages/admin.tsx

'use client';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="bg-white shadow-md rounded p-4 space-y-2">
          {users.map((user: any) => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.role}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <ul className="bg-white shadow-md rounded p-4 space-y-2">
          {products.map((product: any) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
