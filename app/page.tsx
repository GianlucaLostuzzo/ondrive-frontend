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
          className="
            relative px-4 sm:px-6 py-10 text-white w-full overflow-hidden bg-no-repeat bg-center bg-cover
            bg-[url('/bg/hero_small.jpg')] sm:bg-[url('/bg/hero.jpg')] md:bg-cover lg:bg-[length:150%]"
        >
          {/* Overlay scuro */}

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-center
                          min-h-[560px] md:min-h-[680px]">
            {/* Colonna sinistra */}
            <div className="flex-1 text-center md:text-left flex flex-col justify-center
                            bg-[#0c264b]/80 text-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-800">
              <h1 className="text-xl sm:text-2xl font-extrabold mb-3 sm:mb-4">
                La tua auto nelle mani giuste. Sempre.
              </h1>
              <p className="text-base sm:text-lg mb-2">
                <strong>ONDRIVE</strong> è il primo network tecnico che riunisce le migliori officine indipendenti d'Italia.
                Selezioniamo solo professionisti affidabili e li supportiamo ogni giorno con formazione, strumenti moderni e tecnologie avanguardia.
              </p>
              <p className="text-base sm:text-lg mb-4">
                Che si tratti di un semplice tagliando, di una riparazione o di una diagnosi complessa, nelle officine ONDRIVE trovi
                competenza, chiarezza e attenzione.
              </p>
              <Link
                href="/workshops"
                className="bg-[#00B0F0] text-white px-5 py-3 rounded-md hover:bg-[#00A0E0] transition self-center md:self-start"
              >
                Trova un'officina
              </Link>
            </div>

            {/* Colonna destra - Form di ricerca */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="w-full max-w-md sm:max-w-lg bg-[#0c264b]/80 text-white rounded-xl p-4 sm:p-6 shadow-lg border border-blue-800">
                <SearchWorkshopForm />
              </div>
            </div>
          </div>
        </section>

        {/* Sezione motivi per scegliere ONDRIVE */}
        <section className="relative px-6 py-20 text-white w-full flex items-center justify-center"
          style={{
            backgroundColor: '#0c264b',
            backgroundImage: 'url(/bg/home_blue.svg)',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-12">
              Perché scegliere un'officina del network ONDRIVE?
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className='bg-[#00A0E0] text-white p-6 rounded-xl shadow hover:shadow-lg transition'>
                <div className="flex items-center gap-3 mb-2">
                  <img src="/icons/mechanic.png" alt="Icona meccanico" className="w-16 h-16 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Servizio di alta qualità su cui fare affidamento</h3>
                </div>
                <p>Assistenza professionale e attenzione a ogni dettaglio.</p><br></br>
                <p>Ogni intervento viene eseguito con cura: diagnosi precise, tempi rapidi e un servizio pensato per la tua tranquillità.</p>
              </div>
          
              <div className="bg-[#00A0E0] text-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/icons/guard.png" alt="Icona competenza" className="w-16 h-16 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ricambi originali ed equivalenti</h3>
                </div>
                <p>Hai la certezza di ricambi sicuri e conformi agli standard OE.</p>
                <p>Vengono utilizzati solo componenti di qualità equivalente agli originali, per offrirti sicurezza, affidabilità e lunga durata.</p>
              </div>

              <div className="bg-[#00A0E0] text-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/icons/team.png" alt="Icona competenza" className="w-16 h-16 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Formazione e tecnologia sempre al passo</h3>
                </div>
                <p>Officine sempre aggiornate e attrezzature di ultima generazione.</p>
                <p>In collaborazione con i nostri tecnici, ogni officina è sempre pronta a intervenire anche sui modelli più recenti, 
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
              Novità e promozioni del network ONDRIVE
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="p-6 rounded-xl">
                <Link href="/workshops">
                  <img src="/banner/ondrive1.gif" alt="Video ONDRIVE" className="w-full h-full object-cover rounded mb-4" />
                </Link>
              </div>

              <div className="p-6 rounded-xl">
                <Link href="/workshops">
                  <img
                    src="/banner/ondrive.png"
                    alt="Promozione ONDRIVE"
                    className="w-full h-full object-cover rounded mb-4"
                  />
                </Link> 
              </div>

              <div className="p-6 rounded-xl">
                <Link href="/workshops">
                  <img
                  src="/banner/ondrive2.png"
                  alt="Promozione ONDRIVE"
                  className="w-full h-full object-cover rounded mb-4"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
