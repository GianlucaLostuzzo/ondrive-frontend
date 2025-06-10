'use client';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Contenuto */}
      <main className="flex-grow px-6 py-16 bg-gray-50 text-gray-800 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6"><span style={{ color: '#009cda' }}>Chi siamo</span></h1>

        <section className="mb-10">
          <p className="text-lg mb-4">
            <strong><span style={{ color: '#009cda' }}>ON</span>DRIVE</strong> è un network tecnico che connette officine indipendenti in tutta Italia con l’obiettivo di garantire qualità, supporto e crescita nel settore della riparazione automotive.
          </p>

          <p className="text-lg mb-4">
            Al cuore del nostro modello c’è una figura chiave: <strong>il tecnico di fiducia</strong> associato a ogni officina. Questa figura non solo fornisce supporto operativo quotidiano, ma affianca l’officina nell’adozione di nuovi strumenti, nell’interpretazione dei dati tecnici e nell’esplorazione di opportunità di business.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2">L'app ONDRIVE</h2>
          <p className="text-lg mb-2">
            Ogni officina del network ha accesso all’<strong>app OnDrive</strong>, una piattaforma progettata per ottimizzare i flussi di lavoro e aumentare la competitività:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li><strong>Preventivazione smart</strong> per creare stime rapide, coerenti e aggiornate.</li>
            <li><strong>Consultazione di manuali tecnici</strong> ufficiali e costantemente aggiornati.</li>
            <li><strong>Accesso diretto al supporto tecnico OnDrive</strong> per affrontare anche le riparazioni più complesse.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Il nostro obiettivo</h2>
          <p className="text-lg">
            Siamo convinti che l’indipendenza delle officine sia un valore da tutelare. Per questo lavoriamo ogni giorno per offrire strumenti digitali, formazione continua e un ecosistema tecnico-commerciale che metta ogni officina nella condizione di lavorare meglio, con più efficienza e più opportunità.
          </p>
        </section>
      </main>
    </div>
  );
}
