'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <img src="/negative_logo.svg" alt="OnDrive Logo" className="h-15" />
        <nav className="space-x-6 text-white-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/workshops">Officine</Link>
          <Link href="/about">Chi siamo</Link>
          <Link href="/contact">Contatti</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-grow px-6 py-16 bg-gray-50 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Il network tecnico per la mobilità del futuro
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          <span style={{ color: '#FB342D' }}>On</span>Drive connette officine indipendenti in tutta Italia offrendo soluzioni moderne, formazione continua e supporto digitale per affrontare le sfide dell'automotive di oggi e di domani.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link
            href="/workshops"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Trova un'officina
          </Link>
          <Link
            href="/join"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-100 transition"
          >
            Unisciti al network
          </Link>
        </div>
      </section>

      {/* Sezione Ricerca */}
      <section className="bg-white py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cerca la tua officina di fiducia</h2>
        <p className="text-gray-600 mb-6">
          Inserisci la tua città o il CAP per trovare l’officina più vicina a te
        </p>
        <div className="flex justify-center max-w-md mx-auto">
          <input
            type="text"
            placeholder="Es. Milano o 20100"
            className="w-full border px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Cerca
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} C.D.R. S.r.l. - Tutti i diritti riservati</p>
        <div className="mt-2 space-x-4 text-sm">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Termini</Link>
        </div>
      </footer>
    </div>
  );
}
