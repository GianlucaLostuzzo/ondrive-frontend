'use client';

import Link from 'next/link';
import SearchWorkshop from '@/app/components/SearchWorkshop';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero + Research section */}
        <section className="flex flex-col md:flex-row bg-gray-50 px-6 py-16 text-gray-800 gap-8 max-w-7xl mx-auto w-full">
        {/* Colonna sinistra */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
              <span style={{ color: '#009cda' }}>Il primo network tecnico per officine</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-xl mb-6">
              <strong><span style={{ color: '#009cda' }}>ON</span>DRIVE</strong> connette officine indipendenti in tutta Italia offrendo soluzioni moderne, 
              formazione continua e supporto digitale per affrontare le sfide dell'automotive di oggi e di domani.
            </p>
            <Link
              href="/workshops"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition self-center md:self-start"
            >
              Trova un'officina
            </Link>
          </div>

          {/* Colonna destra */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
              <SearchWorkshop />
          </div>
        </section>
      </main>
    </div>
  );
}
