import Link from 'next/link';

export default function Footer() {
  return (
    <footer id='footer' className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Logo or Brand Name */}
          <div className="text-xl font-semibold">
            <Link href="/" className="text-yellow-500 hover:text-yellow-400">
              Ginger Beer
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <Link href="https://facebook.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="https://twitter.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="https://instagram.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping Info</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <ul>
              <li><Link href="https://facebook.com" className="text-gray-400 hover:text-white">Facebook</Link></li>
              <li><Link href="https://twitter.com" className="text-gray-400 hover:text-white">Twitter</Link></li>
              <li><Link href="https://instagram.com" className="text-gray-400 hover:text-white">Instagram</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for the latest updates</p>
            <form>
              <input
                type="email"
                className="p-2 bg-gray-700 text-white rounded-md w-full mb-2"
                placeholder="Your email"
              />
              <button type="submit" className="w-full bg-yellow-500 text-gray-800 p-2 rounded-md hover:bg-yellow-400 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Ginger Beer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
