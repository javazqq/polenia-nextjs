"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; // Adjust path if needed
import { useLogoutMutation } from "@/slices/usersApiSlice"; // Add logout mutation
import { logout } from "@/slices/authSlice"; // Add logout action
import { AnimatedMenuIcon } from "./AnimatedMenuIcon";
import {
  Info,
  Mail,
  MessageCircleQuestion,
  ShoppingCart,
  User,
  LogOut,
  Package,
} from "lucide-react";
import CartDrawer from "./CartDrawer";
import poleniaLogo from "/public/images/polenia-logo.png";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();

  useEffect(() => {
    setIsClient(true);
    // Trigger slide-down animation after mount
    const timer = setTimeout(() => setHasLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect and auto-hide (passive + rAF throttled)
  useEffect(() => {
    const onScroll: EventListener = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const nearBottom = scrollY + windowHeight >= docHeight - 100;

        // Always stay visible on small screens
        if (window.innerWidth < 768) {
          setVisible(true);
          lastScrollY.current = scrollY;
          ticking.current = false;
          return;
        }

        if (scrollY < 10) {
          setVisible(true);
          lastScrollY.current = scrollY;
          ticking.current = false;
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
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    if (!isClient) return;
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname, isClient]);

  // Close on Escape and click outside dropdown
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
        setDropdownOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!dropdownOpen) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, [dropdownOpen]);

  // Body scroll lock when overlays are open
  useEffect(() => {
    if (!isClient) return;
    const shouldLock = menuOpen || cartOpen;
    const prev = document.body.style.overflow;
    document.body.style.overflow = shouldLock ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [menuOpen, cartOpen, isClient]);

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
    // { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "#footer", label: "Contact", icon: Mail, scroll: true },
    { href: "/faq", label: "FAQ", icon: MessageCircleQuestion },
    { href: "/products", label: "Shop", icon: Package },
    {
      href: "/cart",
      label: "Cart",
      icon: ShoppingCart,
      scroll: false,
      showCount: true,
    },
  ];

  const prevTotalItems = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotalItems.current && !visible) {
      setVisible(true);
    }
    prevTotalItems.current = totalItems;
  }, [totalItems, visible]);

  return (
    <>
      {/* Screen reader live region for cart updates */}
      <span className="sr-only" aria-live="polite">
        Cart items: {totalItems}
      </span>
      {/* This div provides spacing at the top since our navbar is now floating */}
      {/* <div className="h-20"></div> */}

      <nav
        className={`fixed left-1/2 transform -translate-x-1/2 top-4 md:top-8 w-[94vw] md:w-[90vw] max-w-full md:max-w-3xl z-50 rounded-xl md:rounded-2xl shadow-xl bg-white/40 md:bg-white/30 backdrop-blur-2xl border border-[#DDC7FF]/30 transition-all duration-500 ${
          scrolled ? "scale-100 opacity-100" : "scale-95 opacity-95"
        } ${visible && hasLoaded ? "translate-y-0 opacity-100" : "-translate-y-[200%] opacity-0 pointer-events-none"}`}
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(97, 83, 224, 0.10), 0 2px 24px 0 rgba(31,38,135,0.07)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
        }}
      >
        <div className="px-2 py-2 md:px-4 flex items-center justify-between">
          {/* Mobile menu button (moved to the left) */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            className="md:hidden p-2 rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-90"
          >
            <AnimatedMenuIcon isOpen={menuOpen} />
          </button>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Image
              src={poleniaLogo}
              alt="Polenia Logo"
              width={120}
              height={30}
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label, scroll, showCount }) => (
              <div key={label} className="relative">
                {label === "Cart" ? (
                  <button
                    onClick={() => setCartOpen(true)}
                    className={`p-3 rounded-xl font-medium transition-all duration-200 flex items-center relative hover:scale-105 active:scale-95 ${
                      scrolled
                        ? "text-[#6153E0] hover:bg-[#DDC7FF]/30 hover:text-[#6153E0]"
                        : "text-[#6153E0] hover:bg-[#FFFBF4] hover:text-[#6153E0]"
                    }`}
                  >
                    <ShoppingCart size={20} />
                    {isClient && showCount && totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FF6E98] to-[#FF991F] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                        {totalItems}
                      </span>
                    )}
                  </button>
                ) : (
                  <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
                    {label === "Contact" ? (
                      <Link
                        href="#footer"
                        scroll={false}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById("footer");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          scrolled
                            ? "text-[#6153E0] hover:bg-[#DDC7FF]/30 hover:text-[#6153E0]"
                            : "text-[#6153E0] hover:bg-[#FFFBF4] hover:text-[#6153E0]"
                        }`}
                      >
                        {label}
                      </Link>
                    ) : (
                      <Link
                        href={href}
                        prefetch
                        scroll={scroll ?? true}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          scrolled
                            ? "text-[#6153E0] hover:bg-[#DDC7FF]/30 hover:text-[#6153E0]"
                            : "text-[#6153E0] hover:bg-[#FFFBF4] hover:text-[#6153E0]"
                        } ${
                          (pathname === "/about" && href === "/about") ||
                          (pathname?.startsWith("/products") &&
                            href === "/products") ||
                          (pathname === "/faq" && href === "/faq")
                            ? "underline underline-offset-8 decoration-2 decoration-[#FF6E98]/70"
                            : ""
                        }`}
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Auth Section */}
            {isClient && (
              <div className="relative ml-4" ref={dropdownRef}>
                {userInfo ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-haspopup="menu"
                      aria-expanded={dropdownOpen}
                      aria-controls="user-menu"
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95 ${
                        scrolled
                          ? "text-[#6153E0] hover:bg-[#DDC7FF]/30"
                          : "text-[#6153E0] hover:bg-[#FFFBF4]"
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#6153E0] to-[#FF6E98] rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <span>{userInfo.name}</span>
                    </button>
                    {dropdownOpen && (
                      <div
                        id="user-menu"
                        role="menu"
                        className="absolute right-0 mt-2 w-48 bg-white/85 backdrop-blur-sm text-[#6153E0] rounded-2xl shadow-xl border border-[#DDC7FF]/50 overflow-hidden animate-fade-in-down"
                      >
                        <button
                          onClick={handleLogout}
                          disabled={isLogoutLoading}
                          role="menuitem"
                          className="w-full text-left px-4 py-3 hover:bg-[#DDC7FF]/30 flex items-center space-x-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <LogOut size={16} />
                          <span>
                            {isLogoutLoading ? "Logging out..." : "Logout"}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
                    <Link
                      href="/login"
                      className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 bg-gradient-to-r from-[#6153E0] to-[#FF6E98] text-white hover:from-[#FF6E98] hover:to-[#FF991F] shadow-lg hover:shadow-xl`}
                    >
                      <User size={16} />
                      <span>Login</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>{" "}
          {/* Cart button for mobile (shown on right side) */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="md:hidden p-2 rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-90 relative"
          >
            <ShoppingCart size={20} className="text-[#6153E0]" />
            {isClient && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FF6E98] to-[#FF991F] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Panel */}
        <aside
          id="mobile-menu-panel"
          className={`absolute left-0 top-20 w-80 h-[calc(100vh-5rem)] bg-[#FFFBF4]/85 backdrop-blur-sm shadow-2xl rounded-r-3xl border-r border-[#DDC7FF] overflow-y-auto transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="space-y-2">
              {navLinks.map(
                ({ href, label, icon: Icon, scroll, showCount }, index) => (
                  <div
                    key={label}
                    className={`w-full transition-all duration-200 ${
                      menuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-5"
                    }`}
                    style={{
                      transitionDelay: menuOpen
                        ? `${(index + 1) * 50}ms`
                        : "0ms",
                    }}
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
                        href={label === "Contact" ? "#footer" : href}
                        scroll={label === "Contact" ? false : (scroll ?? true)}
                        onClick={(e) => {
                          if (label === "Contact") {
                            e.preventDefault();
                            const el = document.getElementById("footer");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-4 p-4 rounded-2xl text-[#6153E0] hover:bg-[#DDC7FF]/30 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#DDC7FF] to-[#FF6E98]/30 rounded-xl flex items-center justify-center group-hover:from-[#DDC7FF] group-hover:to-[#FF6E98]/50 transition-all">
                          <Icon size={20} className="text-[#6153E0]" />
                        </div>
                        <span className="font-medium">{label}</span>
                      </Link>
                    )}
                  </div>
                )
              )}

              {/* Mobile Auth */}
              {isClient && (
                <div
                  className={`pt-4 border-t border-[#DDC7FF] transition-all duration-200 ${
                    menuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-5"
                  }`}
                  style={{
                    transitionDelay: menuOpen
                      ? `${(navLinks.length + 1) * 50}ms`
                      : "0ms",
                  }}
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
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
