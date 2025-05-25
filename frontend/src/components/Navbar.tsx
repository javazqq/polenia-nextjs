'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatedMenuIcon } from './AnimatedMenuIcon';
import { Menu, X, Home, Info, Mail, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '#footer', label: 'Contact', icon: Mail, scroll: true },
    { href: '/faq', label: 'FAQ', icon: MessageCircleQuestion },
    { href: '/products', label: 'Products', icon: X },
  ];

  return (
    <>
      <nav className="bg-yellow-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex items-center justify-between relative">
          <div className="w-8 md:hidden" />

          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
            <span className="text-xl font-bold hover:text-yellow-400 transition cursor-pointer">
              Polenia
            </span>
          </Link>

          <ul className="hidden md:flex space-x-6">
            {navLinks.map(({ href, label, scroll }) => (
              <li key={label}>
                <Link href={href} scroll={scroll ?? true} className="hover:text-yellow-300">{label}</Link>
              </li>
            ))}
          </ul>

          <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          className="md:hidden z-50"
        >
          <AnimatedMenuIcon isOpen={menuOpen} />
        </button>
        </div>
      </nav>

      {/* Full-screen mobile menu with big text and icons */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="mobile-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 bg-yellow-700 z-40 flex flex-col justify-center items-center space-y-12 text-white"
          >
            {navLinks.map(({ href, label, icon: Icon, scroll }) => (
              <motion.div
                key={label}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl font-bold flex items-center gap-4 cursor-pointer hover:text-yellow-300 transition"
              >
                <Icon size={36} />
                <Link
                  href={href}
                  scroll={scroll ?? true}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
