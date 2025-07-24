'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Carica il componente del form di ricerca (dinamico per evitare errori SSR)
const SearchWorkshopForm = dynamic(() => import('@/app/components/WorkshopSearchFormWrapper'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <main className="flex-grow">
        {/* Hero con immagine full-width */}
        <section
          className="relative px-6 py-10 text-white w-full overflow-hidden"
          style={{
            backgroundImage: 'url(/bg/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center min-h-[700px]">
            {/* Colonna sinistra */}
            <div className="relative z-10 flex-1 text-center md:text-left flex flex-col justify-center bg-blue-900/80 text-white rounded-xl p-6 shadow-lg border border-blue-700">
              <h1 className="text-2xl font-extrabold mb-4">
                La tua auto nelle mani giuste. Sempre.
              </h1>
              <p className="text-lg mb-2">
                <strong>ONDRIVE</strong> è il primo network tecnico che riunisce le migliori officine indipendenti d'Italia.
                Selezioniamo solo professionisti affidabili e li supportiamo ogni giorno con formazione, strumenti moderni e tecnologie avanguardia.
              </p>
              <p className="text-lg mb-2">
                Che si tratti di un semplice tagliando, di una riparazione o di una diagnosi complessa, nelle officine ONDRIVE trovi competenza,
                chiarezza e attenzione.
              </p>
              <Link
                href="/workshops"
                className="bg-[#00B0F0] text-white px-6 py-3 rounded-md hover:bg-[#00A0E0] transition self-center md:self-start"
              >
                Trova un'officina
              </Link>
            </div>

            {/* Colonna destra - Form di ricerca */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="w-full max-w-lg bg-blue-900/80 text-white rounded-xl p-6 shadow-lg border border-blue-700">
                <SearchWorkshopForm />
              </div>
            </div>
          </div>
        </section>

        {/* Sezione motivi per scegliere ONDRIVE */}
        <section className="relative px-6 py-20 text-white w-full"
          style={{
            backgroundImage: 'url(/bg/home.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-12">
              Perché scegliere un'officina del network ON<span className="text-[#00B0F0] ">DRIVE</span>?
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="bg-[#00A0E0] p-6 rounded-xl shadow hover:shadow-lg transition">
                <img src="/icons/mechanic.png" alt="Icona competenza" className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Servizio di alta qualità su cui fare affidamento</h3>
                <p>Assistenza professionale e attenzione a ogni dettaglio.</p>
                <p>Ogni intervento viene eseguito con cura: diagnosi precise, tempi rapidi e un servizio pensato per la tua tranquillità.</p>
              </div>

              <div className="bg-[#00A0E0] p-6 rounded-xl shadow hover:shadow-lg transition">
                <img src="/icons/guard.png" alt="Icona competenza" className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ricambi originali ed equivalenti</h3>
                <p>Hai la certezza di ricambi sicuri e conformi agli standard OE.</p>
                <p>Vengono utilizzati solo componenti di qualità equivalente agli originali, per offrirti sicurezza, affidabilità e lunga durata.</p>
              </div>

              <div className="bg-[#00A0E0] p-6 rounded-xl shadow hover:shadow-lg transition">
                <img src="/icons/team.png" alt="Icona competenza" className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Formazione e tecnologia sempre al passo</h3>
                <p>Officine sempre aggiornate e attrezzature di ultima generazione.</p>
                <p>
                  In collaborazione con i nostri tecnici, ogni officina è sempre pronta a intervenire anche sui modelli più recenti, 
                  con strumenti moderni e tecnologie aggiornate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione video e promo ONDRIVE */}
        <section className="bg-[#E9F7FC] px-6 py-20 text-gray-800 w-full">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-12">
              Novità e promozioni del network ON<span className="text-[#00B0F0]">DRIVE</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="p-6 rounded-xl">
                <img src="/banner/ondrive1.gif" alt="Video ONDRIVE" className="w-full h-full object-cover rounded mb-4" />
              </div>

              <div className="p-6 rounded-xl">
                <img
                  src="/banner/ondrive.png"
                  alt="Promozione ONDRIVE"
                  className="w-full h-full object-cover rounded mb-4"
                />
              </div>

              <div className="p-6 rounded-xl">
                <img
                  src="/banner/ondrive2.png"
                  alt="Promozione ONDRIVE"
                  className="w-full h-full object-cover rounded mb-4"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
