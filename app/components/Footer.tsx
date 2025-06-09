'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-6 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} C.D.R. S.r.l. – Tutti i diritti riservati
      </p>
      <div className="mt-2 space-x-4 text-sm">
        <Link href="/privacy" className="hover:underline">Privacy</Link>
        <Link href="/terms" className="hover:underline">Termini</Link>
      </div>
    </footer>
  );
}
// This Footer component is a simple footer for a website, styled with Tailwind CSS.
// It includes the current year and links to privacy and terms pages.