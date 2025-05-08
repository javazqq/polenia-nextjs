import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-yellow-800 text-white p-4 fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Brand name */}
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer hover:text-yellow-400 transition">Polenia</span>
        </Link>

        {/* Navigation links */}
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="#footer" scroll={true}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
