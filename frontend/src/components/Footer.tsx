import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </footer>
  );
}
