'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#00B0F0] text-white py-6 px-6 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} C.D.R. S.r.l. – Tutti i diritti riservati &nbsp;
        <Link href="/privacy" className="hover:underline">Privacy</Link>&nbsp;
        <Link href="/terms" className="hover:underline">Termini</Link>
      </p>
    </footer>
  );
}
// This Footer component is a simple footer for a website, styled with Tailwind CSS.
// It includes the current year and links to privacy and terms pages.