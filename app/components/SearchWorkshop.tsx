'use client';

import { useState } from 'react';

export default function SearchWorkshop() {
  const [query, setQuery] = useState('');

  type Workshop = {
    id: number;
    company_data?: {
      name?: string;
    };
    address?: {
      via?: string;
      numero?: string;
      citta?: string;
      cap?: string;
    };
  };

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/workshops?populate=*&filters[$or][0][address][citta][$containsi]=${encodeURIComponent(cleanQuery)}&filters[$or][1][address][cap][$containsi]=${encodeURIComponent(cleanQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Errore API ${res.status}`);
      }

      const data = await res.json();
      console.log('DATA:', data.data);
      setWorkshops(data.data || []);
    } catch (err: any) {
      console.error('Errore nella ricerca officine:', err);
      setError('Errore nella ricerca. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Cerca la tua officina di fiducia
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Inserisci la tua città o il CAP per trovare l’officina più vicina
        </p>

        <div className="flex max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Es. Milano o 20100"
            className="w-full border px-4 py-2 rounded-l-md focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Cerca
          </button>
        </div>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-600">Caricamento...</p>
        ) : workshops.length > 0 ? (
          <ul className="space-y-4">
            {workshops.map((w) => {
              if (!w) return null;

              const { address, company_data } = w;

              return (
                <li key={w.id} className="border p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-lg">
                    {company_data?.name ?? 'Officina senza nome'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {address?.via ?? 'Via sconosciuta'}, {address?.numero ?? ''} – {address?.citta ?? ''} ({address?.cap ?? ''})
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          query && <p className="text-center text-gray-600">Nessuna officina trovata</p>
        )}
      </div>
    </section>
  );
}
