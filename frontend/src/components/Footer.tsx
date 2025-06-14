import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-[#6153E0] via-[#6153E0] to-[#FF6E98] text-white py-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#DDC7FF]/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FF991F]/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        {/* Footer Top Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold">
            <Link
              href="/"
              className="text-[#FFFBF4] hover:text-[#DDC7FF] transition-colors"
            >
              Polenia
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-[#FFFBF4] hover:bg-white/20 hover:text-white transition-all"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="https://twitter.com"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-[#FFFBF4] hover:bg-white/20 hover:text-white transition-all"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="https://instagram.com"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-[#FFFBF4] hover:bg-white/20 hover:text-white transition-all"
            >
              <Instagram size={18} />
            </Link>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFFBF4]">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFFBF4]">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFFBF4]">
              Follow Us
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://facebook.com"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="text-[#DDC7FF] hover:text-[#FFFBF4] transition-colors"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFFBF4]">
              Newsletter
            </h4>
            <p className="text-[#DDC7FF] mb-4">
              Subscribe for the latest updates
            </p>
            <form className="space-y-3">
              <input
                type="email"
                className="p-3 bg-white/10 backdrop-blur-sm text-[#FFFBF4] placeholder-[#DDC7FF] rounded-xl w-full border border-white/20 focus:border-[#DDC7FF] focus:outline-none transition-colors"
                placeholder="Your email"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D6E012] to-[#FF991F] text-[#6153E0] font-semibold py-3 rounded-xl hover:from-[#FF991F] hover:to-[#FF6E98] transition-all duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-[#DDC7FF] text-sm">
            &copy; {new Date().getFullYear()} Polenia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
