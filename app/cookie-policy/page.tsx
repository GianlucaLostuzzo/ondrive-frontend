'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0e9dda]">Cookie Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p>
            I cookie sono piccoli file di testo che i siti visitati inviano al terminale
            dell’utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi
            siti alla visita successiva. I cookie consentono di raccogliere informazioni
            sulla navigazione e di offrire funzionalità avanzate o personalizzate.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Tipologie di cookie utilizzati</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Cookie tecnici (necessari):</strong> indispensabili per il corretto
              funzionamento del sito, permettono la navigazione delle pagine e la gestione
              delle preferenze di consenso.
            </li>
            <li>
              <strong>Cookie di funzionalità:</strong> consentono di ricordare le scelte
              dell’utente (es. lingua, località) per offrire un’esperienza più personalizzata.
            </li>
            <li>
              <strong>Cookie analitici (statistici):</strong> raccolgono informazioni in
              forma aggregata sull’utilizzo del sito (es. pagine più visitate, tempo di
              permanenza). Se anonimizzati, sono equiparati ai cookie tecnici.
            </li>
            <li>
              <strong>Cookie di terze parti:</strong> provengono da servizi esterni come
              Google Maps, YouTube, social plugin (Facebook, Instagram, WhatsApp). Questi
              cookie sono gestiti dalle terze parti e non da ONDRIVE.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Gestione dei cookie</h2>
          <p>
            Al primo accesso, un banner informa l’utente dell’uso dei cookie e consente di
            accettarli o rifiutarli (eccetto i cookie tecnici). L’utente può sempre modificare
            le proprie preferenze tramite il banner o il link “Impostazioni cookie”.
          </p>
          <p>
            È inoltre possibile disabilitare o cancellare i cookie direttamente dalle impostazioni
            del browser:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <a href="https://support.google.com/chrome/answer/95647?hl=it" className="text-[#00B0F0] hover:underline">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" className="text-[#00B0F0] hover:underline">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" className="text-[#00B0F0] hover:underline">
                Apple Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/it-it/help/4027947" className="text-[#00B0F0] hover:underline">
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Conservazione dei dati</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Cookie tecnici e di funzionalità: per il tempo necessario al funzionamento.</li>
            <li>Cookie analitici: massimo 24 mesi.</li>
            <li>Cookie di terze parti: secondo le policy dei rispettivi provider.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Diritti dell’utente</h2>
          <p>
            In qualità di interessato, l’utente può esercitare i diritti previsti dal GDPR
            (accesso, rettifica, cancellazione, limitazione, opposizione) contattando il
            titolare del trattamento.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Titolare del trattamento</h2>
          <p>
            <strong>C.D.R. S.r.l.</strong> <br />
            Via Arrigo Olivetti 7, 10148 Torino (TO) <br />
            Email:{" "}
            <a href="mailto:info@ondrive.it" className="text-[#00B0F0] hover:underline">
              info@ondrive.it
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Aggiornamenti</h2>
          <p>
            La presente Cookie Policy potrà essere aggiornata nel tempo. Eventuali modifiche
            sostanziali verranno comunicate attraverso il sito e avranno efficacia dalla data
            di pubblicazione.
          </p>
        </div>

        <Link
          href="/"
          className="text-[#00B0F0] font-medium hover:underline mt-10 inline-block"
        >
          Torna alla homepage
        </Link>
      </div>
    </div>
  );
}
