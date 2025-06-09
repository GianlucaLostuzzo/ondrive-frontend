'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <img
            src="/negative_logo.svg"
            alt="OnDrive Logo"
            className="h-15 cursor-pointer"
          />
        </Link>

        <nav className="space-x-6 text-white-700 font-medium text-base">
          <Link href="/">Home</Link>
          <Link href="/workshops">Officine</Link>
          <Link href="/about">Chi siamo</Link>
          <Link href="/contact">Contatti</Link>
        </nav>
      </div>
    </header>
  );
}
// This Header component is a simple navigation bar for a website, styled with Tailwind CSS.
// It includes a logo that links to the home page and navigation links to various sections of the site.