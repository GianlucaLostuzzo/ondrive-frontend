'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ServiceFilter from '@/app/components/ServiceFilter';

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
  services?: { name: string; description?: string }[];
};

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filtered, setFiltered] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allServices, setAllServices] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    if (!base || !token) {
      console.error('❌ URL o TOKEN mancanti!');
      return;
    }

    const url = `${base}/api/workshops?populate[company_data]=true&populate[address]=true&populate[services]=true&populate[opening_days]=true`;

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
        console.log('🌐 Risposta API:', data);

        const parsed = (data.data || []).map((w: any) => {
          const workshop = {
            id: w.id,
            slug: w.slug,
            company_data: w.company_data,
            address: w.address,
            opening_days: w.opening_days,
            services: w.services,
          };
          console.log('✅ Workshop parsed:', workshop);
          return workshop;
        }) as Workshop[];

        setWorkshops(parsed);
        setFiltered(parsed);

        const uniq = Array.from(
          new Set(parsed.flatMap((w) => w.services?.map((s) => s.name) || []))
        );
        setAllServices(uniq);

        console.log('✅ Servizi unici:', uniq);
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

      const matchServices =
        selectedServices.length === 0 ||
        w.services?.some((s) => selectedServices.includes(s.name));

      return matchQuery && matchServices;
    });

    console.log('🔍 Filtrati:', result.length, '/', workshops.length);
    setFiltered(result);
  }, [searchQuery, selectedServices, workshops]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Trova un'officina ON<span className="text-[#009cda]">DRIVE</span>
        </h1>

        {/* Debug visuale */}
        <p className="text-center text-sm text-gray-400 mb-6">
          Visualizzate: {filtered.length} su {workshops.length} officine
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Colonna sinistra: FILTRI */}
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
              <h2 className="text-lg text-gray-700 font-semibold mb-2">Filtra per servizio</h2>
              <ServiceFilter
                services={allServices}
                selected={selectedServices}
                onChange={setSelectedServices}
              />
            </div>
          </aside>

          {/* Colonna destra: RISULTATI */}
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
                      {w.services?.map((s, i) => (
                        <span
                          key={i}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {s.name}
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
    </div>
  );
}
