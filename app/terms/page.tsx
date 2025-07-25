'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0e9dda]">Termini di Utilizzo</h1>

        <p className="mb-4">
          I presenti Termini di Utilizzo regolano l'accesso e l'utilizzo del sito web <strong>ONDRIVE</strong> e dei suoi contenuti.
          Accedendo o utilizzando questo sito, l'utente accetta di rispettare tali termini.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Finalità del sito</h2>
        <p className="mb-4">
          Il sito ha lo scopo di informare gli utenti sul network ONDRIVE, permettere la ricerca delle officine affiliate e facilitare il contatto con i professionisti del settore.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Proprietà intellettuale</h2>
        <p className="mb-4">
          Tutti i contenuti presenti sul sito, inclusi testi, immagini, loghi e marchi, sono di proprietà di ONDRIVE o dei rispettivi titolari. È vietata la riproduzione, distribuzione o modifica non autorizzata.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Utilizzo corretto</h2>
        <p className="mb-4">
          L'utente si impegna a utilizzare il sito in modo lecito e rispettoso, senza arrecare danni al sito o agli altri utenti. È vietato inserire dati falsi, utilizzare script automatici o compromettere la sicurezza della piattaforma.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Limitazione di responsabilità</h2>
        <p className="mb-4">
          ONDRIVE non è responsabile per eventuali danni diretti o indiretti derivanti dall'uso del sito, inclusi eventuali errori o omissioni nei contenuti pubblicati.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Modifiche ai termini</h2>
        <p className="mb-4">
          ONDRIVE si riserva il diritto di modificare i presenti termini in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina e avranno effetto immediato.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Contatti</h2>
        <p className="mb-4">
          Per qualsiasi informazione o richiesta relativa ai Termini di Utilizzo, è possibile scrivere a: <a href="mailto:info@ondrive.it" className="text-[#00B0F0] hover:underline">info@ondrive.it</a>
        </p>

        <Link href="/" className="text-[#00B0F0] font-medium hover:underline mt-10 inline-block">
          ← Torna alla homepage
        </Link>
      </div>
    </div>
  );
}
