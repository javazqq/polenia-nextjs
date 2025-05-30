"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust path if needed
import { AnimatedMenuIcon } from "./AnimatedMenuIcon";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  MessageCircleQuestion,
  ShoppingCart,
} from "lucide-react";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Select cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Calculate total quantity in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "#footer", label: "Contact", icon: Mail, scroll: true },
    { href: "/faq", label: "FAQ", icon: MessageCircleQuestion },
    { href: "/products", label: "Products", icon: X },
    {
      href: "/cart",
      label: "Cart",
      icon: ShoppingCart,
      scroll: false,
      showCount: true,
    },
  ];

  return (
    <>
      <nav className="bg-yellow-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex items-center justify-between relative">
          <div className="w-8 md:hidden" />

          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0"
          >
            <span className="text-xl font-bold hover:text-yellow-400 transition cursor-pointer">
              Polenia
            </span>
          </Link>

          <ul className="hidden md:flex space-x-6 items-center">
            {navLinks.map(({ href, label, scroll, showCount }) => (
              <li key={label} className="relative">
                {label === "Cart" ? (
                  <button
                    onClick={() => setCartOpen(true)}
                    className="hover:text-yellow-300 flex items-center"
                  >
                    {label}
                    {isClient && showCount && totalItems > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-yellow-800 bg-yellow-300 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={href}
                    scroll={scroll ?? true}
                    className="hover:text-yellow-300 flex items-center"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden z-50"
          >
            <AnimatedMenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="mobile-drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-yellow-700 z-40 flex flex-col justify-center items-center space-y-12 text-white"
          >
            {navLinks.map(({ href, label, icon: Icon, scroll, showCount }) => (
              <motion.div
                key={label}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl font-bold flex items-center gap-4 cursor-pointer hover:text-yellow-300 transition relative"
              >
                <Icon size={36} />
                {label === "Cart" ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setCartOpen(true);
                    }}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={href}
                    scroll={scroll ?? true}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )}

                {/* Badge in mobile menu */}
                {showCount && isClient && totalItems > 0 && (
                  <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-yellow-800 bg-yellow-300 rounded-full">
                    {totalItems}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
