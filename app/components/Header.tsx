'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/workshops', label: 'Officine' },
    { href: '/about', label: 'Chi siamo' },
    { href: '/contact', label: 'Contatti' },
  ];

  return (
    <header className="bg-blue-900 shadow z-50 relative">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <img
            src="/negative_logo.svg"
            alt="OnDrive Logo"
            className="h-15 cursor-pointer"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-white font-medium text-base">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-blue-400 transition">
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-2xl text-white hover:text-blue-400 transition"
          aria-label="Apri menù"
        >
          <FiMenu />
        </button>
      </div>

      {/* Overlay & Sidebar */}
      {/* Overlay: visibile solo quando il menu è aperto */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-blue-600 text-lg">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700"
            aria-label="Chiudi menù"
          >
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col px-4 py-6 gap-4 text-gray-700 font-medium text-base">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
