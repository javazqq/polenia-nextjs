"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  Package,
} from "lucide-react";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll effect and auto-hide
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const nearBottom = scrollY + windowHeight >= docHeight - 100;
      if (scrollY < 10) {
        setVisible(true);
        lastScrollY.current = scrollY;
        return;
      }
      if (!nearBottom && scrollY > lastScrollY.current && scrollY > 60) {
        setVisible(false); // scrolling down
      } else if (scrollY < lastScrollY.current) {
        setVisible(true); // scrolling up
      } else if (nearBottom) {
        setVisible(true); // always show near bottom
      }
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total quantity in cart
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "#footer", label: "Contact", icon: Mail, scroll: true },
    { href: "/faq", label: "FAQ", icon: MessageCircleQuestion },
    { href: "/products", label: "Products", icon: Package },
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-navbar ${
          scrolled
            ? "bg-white/40 backdrop-blur-2xl shadow-lg border-b border-[#DDC7FF]"
            : "bg-white/20 backdrop-blur-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu placeholder */}
            <div className="w-8 md:hidden" />

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span
                  className={`text-xl font-bold transition-colors ${
                    scrolled ? "text-[#6153E0]" : "text-[#6153E0]"
                  }`}
                >
                  Polenia
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ href, label, scroll, showCount }) => (
                <div key={label} className="relative">
                  {label === "Cart" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCartOpen(true)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 relative ${
                        scrolled
                          ? "text-[#6153E0] hover:bg-[#DDC7FF]/30 hover:text-[#6153E0]"
                          : "text-[#6153E0] hover:bg-[#FFFBF4] hover:text-[#6153E0]"
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>{label}</span>
                      {isClient && showCount && totalItems > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-[#FF6E98] to-[#FF991F] text-white text-xs font-bold rounded-full flex items-center justify-center"
                        >
                          {totalItems}
                        </motion.span>
                      )}
                    </motion.button>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={href}
                        scroll={scroll ?? true}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          scrolled
                            ? "text-[#6153E0] hover:bg-[#DDC7FF]/30 hover:text-[#6153E0]"
                            : "text-[#6153E0] hover:bg-[#FFFBF4] hover:text-[#6153E0]"
                        }`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Auth Section */}
              {isClient && (
                <div className="relative ml-4">
                  {userInfo ? (
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                          scrolled
                            ? "text-[#6153E0] hover:bg-[#DDC7FF]/30"
                            : "text-[#6153E0] hover:bg-[#FFFBF4]"
                        }`}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <span>{userInfo.name}</span>
                      </motion.button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 bg-[#FFFBF4]/95 backdrop-blur-lg text-[#6153E0] rounded-2xl shadow-xl border border-[#DDC7FF] overflow-hidden"
                          >
                            <button
                              onClick={handleLogout}
                              disabled={isLogoutLoading}
                              className="w-full text-left px-4 py-3 hover:bg-[#DDC7FF]/30 flex items-center space-x-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <LogOut size={16} />
                              <span>
                                {isLogoutLoading ? "Logging out..." : "Logout"}
                              </span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/login"
                        className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white hover:from-[#FF6E98] hover:to-[#FF991F] shadow-lg hover:shadow-xl`}
                      >
                        <User size={16} />
                        <span>Login</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden z-50 p-2 rounded-xl bg-[#FFFBF4]/20 backdrop-blur-sm"
            >
              <AnimatedMenuIcon isOpen={menuOpen} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 top-16 w-80 h-[calc(100vh-4rem)] bg-[#FFFBF4]/95 backdrop-blur-lg shadow-2xl rounded-r-3xl border-r border-[#DDC7FF] overflow-y-auto"
            >
              <div className="p-6">
                <div className="space-y-2">
                  {navLinks.map(
                    ({ href, label, icon: Icon, scroll, showCount }) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-full"
                      >
                        {label === "Cart" ? (
                          <button
                            onClick={() => {
                              setMenuOpen(false);
                              setCartOpen(true);
                            }}
                            className="w-full flex items-center space-x-4 p-4 rounded-2xl text-[#6153E0] hover:bg-[#DDC7FF]/30 transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#DDC7FF] to-[#FF6E98]/30 rounded-xl flex items-center justify-center group-hover:from-[#DDC7FF] group-hover:to-[#FF6E98]/50 transition-all">
                              <Icon size={20} className="text-[#6153E0]" />
                            </div>
                            <span className="font-medium flex-1 text-left">
                              {label}
                            </span>
                            {showCount && isClient && totalItems > 0 && (
                              <span className="w-6 h-6 bg-gradient-to-r from-[#FF6E98] to-[#FF991F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {totalItems}
                              </span>
                            )}
                          </button>
                        ) : (
                          <Link
                            href={href}
                            scroll={scroll ?? true}
                            onClick={() => setMenuOpen(false)}
                            className="w-full flex items-center space-x-4 p-4 rounded-2xl text-[#6153E0] hover:bg-[#DDC7FF]/30 transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#DDC7FF] to-[#FF6E98]/30 rounded-xl flex items-center justify-center group-hover:from-[#DDC7FF] group-hover:to-[#FF6E98]/50 transition-all">
                              <Icon size={20} className="text-[#6153E0]" />
                            </div>
                            <span className="font-medium">{label}</span>
                          </Link>
                        )}
                      </motion.div>
                    )
                  )}

                  {/* Mobile Auth */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4 border-t border-[#DDC7FF]"
                  >
                    {userInfo ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        disabled={isLogoutLoading}
                        className="w-full flex items-center space-x-4 p-4 rounded-2xl text-[#6153E0] hover:bg-[#DDC7FF]/30 transition-all duration-200 group disabled:opacity-50"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FF6E98] to-[#FF991F] rounded-xl flex items-center justify-center">
                          <LogOut size={20} className="text-white" />
                        </div>
                        <span className="font-medium">
                          {isLogoutLoading ? "Logging out..." : "Logout"}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white hover:from-[#FF6E98] hover:to-[#FF991F] transition-all duration-200 shadow-lg"
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <span className="font-medium">Login</span>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Add this to the bottom of the file for custom glass effect if not already in global CSS */}
      <style jsx global>{`
        .glass-navbar {
          background: rgba(255, 255, 255, 0.18) !important;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border-bottom: 1px solid rgba(221, 199, 255, 0.25);
        }
      `}</style>
    </>
  );
}
