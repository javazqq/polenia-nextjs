"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; // Adjust path if needed
import { useLogoutMutation } from "@/slices/usersApiSlice"; // Add logout mutation
import { logout } from "@/slices/authSlice"; // Add logout action
import { AnimatedMenuIcon } from "./AnimatedMenuIcon";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  MessageCircleQuestion,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown menu

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth); // Get user info
  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
  console.log('Navbar width:', document.querySelector('nav')?.offsetWidth);
}, []);

  // Calculate total quantity in cart
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      setDropdownOpen(false); // Close dropdown
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
            {/* Auth Link */}
            {isClient && (
              <li className="relative">
                {userInfo ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="hover:text-yellow-300 flex items-center gap-2"
                    >
                      <User size={20} />
                      {userInfo.name}
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50"
                        >
                          <button
                            onClick={handleLogout}
                            disabled={isLogoutLoading}
                            className="w-full text-left px-4 py-2 hover:bg-yellow-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <LogOut size={16} />
                            {isLogoutLoading ? "Logging out..." : "Logout"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="hover:text-yellow-300 flex items-center gap-2"
                  >
                    <User size={20} />
                    Login
                  </Link>
                )}
              </li>
            )}
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
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed left-0 top-16 w-full h-[calc(100vh-4rem)] bg-white z-40 shadow-2xl rounded-r-2xl border-r-2 border-yellow-200 p-6 overflow-y-auto"
    >
      <div className="flex flex-col justify-center items-center space-y-6 text-yellow-900">
        {navLinks
        .map(({ href, label, icon: Icon, scroll, showCount }) => (
          <div key={label} className="w-full">
            <div className="flex justify-center items-center space-x-4 text-lg font-semibold py-1 hover:text-yellow-700 transition relative">
              <Icon size={24} />
              {label === 'Cart' ? (
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
              {showCount && isClient && totalItems > 0 && (
                <span className="absolute right-10 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-300 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
            <hr className="my-2 border-yellow-100" />
          </div>
        ))}

        {/* Auth Link for Mobile */}
        <div className="w-full">
          <div className="flex justify-center items-center space-x-4 text-lg font-semibold py-3 hover:text-yellow-700 transition">
            <User size={24} />
            {userInfo ? (
              <button onClick={handleLogout} disabled={isLogoutLoading}>
                {isLogoutLoading ? 'Logging out...' : 'Logout'}
              </button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  )}
</AnimatePresence>



      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}