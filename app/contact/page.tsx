'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Contact() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [inviato, setInviato] = useState(false);
  const [errore, setErrore] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore('');
    setInviato(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, messaggio }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || 'Errore durante l’invio');
      }

      setInviato(true);
      setNome('');
      setEmail('');
      setMessaggio('');
    } catch (err: any) {
      console.error('Errore invio:', err);
      setErrore(err.message || 'Errore imprevisto');
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow px-6 py-16 max-w-4xl mx-auto text-gray-800">
          <h1 className="text-3xl font-bold mb-6">
            <span style={{ color: '#009cda' }}>Contattaci</span>
          </h1>

          {/* Informazioni di contatto */}
          <section className="mb-10">
            <p className="mb-2">
              Puoi contattarci via email o telefono per qualsiasi richiesta relativa al network ONDRIVE, 
              alla tua officina o per diventare partner.
            </p>
            <ul className="text-md text-gray-700 space-y-1 mt-4">
              <li><strong>Email:</strong> <a href="mailto:info@ondrive.it" className="text-blue-600 hover:underline">info@ondrive.it</a></li>
              <li><strong>Telefono:</strong> <a href="tel:+3901118483300" className="text-blue-600 hover:underline">+39 011 184 833 00</a></li>
              <li><strong>Indirizzo:</strong> Via I Maggio, 29, 37012 Bussolengo (VR)</li>
            </ul>
          </section>

          {/* Form di contatto con invio */}
          <section className="bg-white rounded shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Invia un messaggio</h2>

            {inviato && <p className="mb-4 text-green-600 font-medium">Messaggio inviato con successo!</p>}
            {errore && <p className="mb-4 text-red-600 font-medium">{errore}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded-md"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Messaggio</label>
                <textarea
                  rows={4}
                  className="w-full border px-4 py-2 rounded-md"
                  value={messaggio}
                  onChange={(e) => setMessaggio(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Invia
              </button>
            </form>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
