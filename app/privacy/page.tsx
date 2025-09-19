'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-[#0e9dda]">Privacy Policy</h1>

          <p className="mb-4">
            La presente informativa è resa ai sensi dell’art. 13 del Regolamento UE 2016/679 (GDPR) e descrive le modalità di trattamento dei dati personali raccolti attraverso il sito <strong>ONDRIVE</strong>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">1. Titolare del trattamento</h2>
          <p className="mb-4">
            Il titolare del trattamento è <strong>C.D.R. S.r.l.</strong>, con sede legale in:
          </p>
          <ul className='list-disc list-inside mb-4'>
            <li>Via Arrigo Olivetti 7, 10148 Torino (TO)</li>
          </ul>
          <ul className="list-disc list-inside mb-4">
            Contattabile via email all’indirizzo: 
            <li>
              <a href="mailto:info@ondrive.it" className="text-[#00B0F0] hover:underline">info@ondrive.it</a>.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">2. Tipologie di dati raccolti</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Dati di navigazione (es. indirizzo IP, tipo di browser, orario di accesso)</li>
            <li>Dati forniti volontariamente (es. nome, email, indirizzo) tramite form di contatto o ricerca officina</li>
            <li>Cookie tecnici e, se espressamente accettati, di terze parti (es. Google Maps, Analytics)</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">3. Finalità del trattamento</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Permettere l'utilizzo corretto del sito e dei servizi offerti</li>
            <li>Rispondere a richieste o messaggi inviati tramite il sito</li>
            <li>Adempiere ad obblighi di legge</li>
            <li>Effettuare analisi statistiche anonime per migliorare i servizi</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">4. Base giuridica del trattamento</h2>
          <p className="mb-4">
            Il trattamento si basa sul legittimo interesse del titolare, sull’esecuzione di un contratto o su obblighi legali, nonché sul consenso esplicito laddove richiesto.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">5. Conservazione dei dati</h2>
          <p className="mb-4">
            I dati personali sono conservati per il tempo necessario a perseguire le finalità sopra indicate, nel rispetto dei termini di legge.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">6. Diritti dell’interessato</h2>
          <p className="mb-4">
            L’utente può esercitare i diritti previsti dagli articoli 15 e seguenti del GDPR (accesso, rettifica, cancellazione, opposizione, limitazione del trattamento) scrivendo a <a href="mailto:info@ondrive.it" className="text-[#00B0F0] hover:underline">info@ondrive.it</a>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">7. Cookie</h2>
          <p className="mb-4">
            Questo sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie di terze parti per analisi e personalizzazione. Per maggiori dettagli consulta la nostra <Link href="/cookie-policy" className="text-[#00B0F0] hover:underline">Cookie Policy</Link>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">8. Modifiche alla presente policy</h2>
          <p className="mb-4">
            <strong>C.D.R. S.r.l.</strong> si riserva il diritto di modificare la presente informativa in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con data di aggiornamento.
          </p>

          <p className="text-sm italic mt-6 text-gray-500">
            Ultimo aggiornamento: Settembre 2025
          </p>

          <Link href="/" className="text-[#00B0F0] font-medium hover:underline mt-10 inline-block">
            Torna alla homepage
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
