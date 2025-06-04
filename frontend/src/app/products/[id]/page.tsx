"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart, openCartDrawer, closeCartDrawer } from "@/slices/cartSlice";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import CartDrawer from "@/components/CartDrawer";

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
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-yellow-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center text-red-600 font-bold py-20">
        Failed to load product details.
      </div>
    );
  }

  return (
    <>
      <section className="w-full px-6 md:px-16 py-24 min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image */}
          <motion.div
            className="relative h-[30rem] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-yellow-900/10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-900 tracking-tight drop-shadow">
              {product.name}
            </h1>

            <p className="text-lg text-yellow-900/90 leading-relaxed">
              {product.description}
            </p>

            <hr className="border-yellow-700" />

            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-3xl font-bold text-yellow-800">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  product.countInStock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.countInStock > 0
                  ? `In Stock: ${product.countInStock}`
                  : "Out of Stock"}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-6">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-yellow-900"
                  >
                    Qty:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md px-3 py-2 text-yellow-900 border border-yellow-700 bg-white shadow"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className="px-6 py-3 bg-yellow-800 hover:bg-yellow-700 text-white rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Add ${product.name} to cart`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Global cart drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => dispatch(closeCartDrawer())}
      />
    </>
  );
}
