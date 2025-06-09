'use client';

import Header from '@/app/components/Header';
import Link from 'next/link';
import Footer from '@/app/components/Footer';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow px-6 py-16 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold mb-6"><span style={{ color: '#009cda' }}>Contattaci</span></h1>

        {/* Informazioni di contatto */}
        <section className="mb-10">
          <p className="mb-2">
            Puoi contattarci via email o telefono per qualsiasi richiesta relativa al network OnDrive, 
            alla tua officina o per diventare partner.
          </p>
          <ul className="text-md text-gray-700 space-y-1 mt-4">
            <li><strong>Email:</strong> <a href="mailto:info@ondrive.it" className="text-blue-600 hover:underline">info@ondrive.it</a></li>
            <li><strong>Telefono:</strong> <a href="tel:+3901122334455" className="text-blue-600 hover:underline">+39 011 223 344 55</a></li>
            <li><strong>Indirizzo:</strong> Via I Maggio, 29, 37012 Bussolengo (VR)</li>
          </ul>
        </section>

        {/* Form di contatto statico */}
        <section className="bg-white rounded shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Invia un messaggio</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input type="text" className="w-full border px-4 py-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="w-full border px-4 py-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Messaggio</label>
              <textarea rows={4} className="w-full border px-4 py-2 rounded-md"></textarea>
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

      <Footer />
    </div>
  );
}
