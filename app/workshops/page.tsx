'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ServiceFilter from '@/app/components/ServiceFilter';

const AllWorkshopsMap = dynamic(() => import('@/app/components/AllWorkshopsMap'), {
  ssr: false,
});

type Workshop = {
  id: number;
  slug: string;
  company_data?: { name?: string; vatnumber?: string };
  address?: {
    via?: string;
    numero?: string;
    citta?: string;
    provincia?: string;
    cap?: string;
    nazione?: string;
  };
  opening_days?: { days: string; opening_hour: string; closing_hour: string }[];
  type?: { category: string }[];
};

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filtered, setFiltered] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    if (!base || !token) {
      console.error('❌ URL o TOKEN mancanti!');
      return;
    }

    const url = `${base}/api/workshops?populate[company_data]=true&populate[address]=true&populate[type]=true&populate[opening_days]=true`;

    const run = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Errore API ${res.status}: ${text}`);
        }

        const data = await res.json();

        const parsed = (data.data || []).map((w: any) => {
          const workshop = {
            id: w.id,
            slug: w.slug,
            company_data: w.company_data,
            address: w.address,
            opening_days: w.opening_days,
            type: w.type,
            bio: w.bio || '', // Aggiunta del campo bio
          };
 
          return workshop;
        }) as Workshop[];

        setWorkshops(parsed);
        setFiltered(parsed);

        const uniq = Array.from(
          new Set(parsed.flatMap((w) => w.type?.map((t) => t.category) || []))
        );
        setAllTypes(uniq);

      } catch (err) {
        console.error('❌ ERRORE FETCH:', err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();

    const result = workshops.filter((w) => {
      const matchQuery =
        !q || w.address?.citta?.toLowerCase().includes(q) ||
        w.address?.cap?.toLowerCase().includes(q);

      const matchType =
        selectedTypes.length === 0 ||
        w.type?.some((t) => selectedTypes.includes(t.category));

      return matchQuery && matchType;
    });

    setFiltered(result);
  }, [searchQuery, selectedTypes, workshops]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <AllWorkshopsMap workshops={workshops} />
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* FILTRI */}
          <aside className="md:w-1/3 w-full space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Filtra per città o CAP
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Es. Torino o 10133"
                className="w-full border text-gray-500 px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-semibold mb-2">Filtra per categoria</h2>
              <ServiceFilter
                services={allTypes}
                selected={selectedTypes}
                onChange={setSelectedTypes}
              />
            </div>
          </aside>

          {/* RISULTATI */}
          <section className="md:w-2/3 w-full">
            {loading ? (
              <p className="text-gray-600">Caricamento in corso...</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-500">Nessuna officina trovata.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((w) => (
                  <Link
                    href={`/workshops/${w.slug}`}
                    key={w.id}
                    className="block bg-white p-4 rounded-lg shadow border hover:shadow-md transition"
                  >
                    <h3 className="font-bold text-lg text-blue-800 mb-1 hover:underline">
                      {w.company_data?.name || 'Officina senza nome'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {w.address?.via} {w.address?.numero}, {w.address?.citta} ({w.address?.cap})
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {w.address?.provincia}, {w.address?.nazione}
                    </p>
                    <div className="mt-2">
                      {w.type?.map((t, i) => (
                        <span
                          key={i}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {t.category}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mb-6">
        Visualizzate: {filtered.length} su {workshops.length} officine
      </p>
    </div>
  );
}
