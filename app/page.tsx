'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaWrench, FaRegClipboard, FaTools } from 'react-icons/fa';

// Carica il componente del form di ricerca (dinamico per evitare errori SSR)
const SearchWorkshopForm = dynamic(() => import('@/app/components/WorkshopSearchForm'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero + Ricerca officina */}
        <section className="flex flex-col md:flex-row bg-white px-6 py-10 text-gray-800 gap-8 max-w-7xl mx-auto w-full">
          {/* Colonna sinistra */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <h1 className="text-4xl font-extrabold text-gray-800">
                <strong>ON<span style={{ color: '#0e9dda' }}>DRIVE</span></strong> - Il primo network tecnico
              </h1>
            </div>
            <p className="text-lg text-gray-700 max-w-xl mb-4">
              <strong>ON<span style={{ color: '#0e9dda' }}>DRIVE</span></strong> è la rete che valorizza le migliori officine indipendenti d’Italia.
              Selezioniamo i partner più affidabili e li supportiamo con formazione, strumenti e innovazione continua.
            </p>
            <p className="text-lg text-gray-700 max-w-xl mb-4">
              Dalla manutenzione ordinaria alla diagnosi avanzata, ogni officina ONDRIVE è pronta a offrire professionalità e trasparenza.
            </p>
            <p className="text-lg font-bold text-gray-900 max-w-xl mb-6">
              Il valore di un network, la forza di un tecnico.
            </p>
            <Link
              href="/workshops"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition self-center md:self-start"
            >
              Trova un'officina
            </Link>
          </div>

          {/* Colonna destra - Form di ricerca */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden min-h-[300px] p-4">
              <SearchWorkshopForm />
            </div>
          </div>
        </section>

        {/* Sezione motivi per scegliere ONDRIVE */}
        <section className="bg-gray-100 px-6 py-20 text-gray-800 w-full">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-12">
              Perché scegliere un'officina del network <span className="text-[#0e9dda]">ONDRIVE</span>?
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <FaWrench className="text-[#0e9dda] text-4xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">Alta qualità del servizio</h3>
                <p>Le nostre officine garantiscono diagnosi accurate, interventi rapidi e attenzione costante al cliente.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <FaRegClipboard className="text-[#0e9dda] text-4xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ricambi come l’originale</h3>
                <p>Utilizziamo solo ricambi equivalenti all’OE, per garantire affidabilità e durata nel tempo.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <FaTools className="text-[#0e9dda] text-4xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">Formazione e tecnologia</h3>
                <p>I nostri tecnici sono aggiornati costantemente e dotati di strumenti digitali di ultima generazione.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
