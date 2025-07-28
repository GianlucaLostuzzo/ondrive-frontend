'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
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
    lat?: string;
    lon?: string;
  };
  opening_days?: { days: string; opening_hour: string; closing_hour: string }[];
  type?: { category: string }[];
};

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ClientPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [geoFiltered, setGeoFiltered] = useState<Workshop[]>([]);
  const [filtered, setFiltered] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    if (!base || !token) {
      console.error('URL o TOKEN mancanti!');
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

        const parsed = (data.data || []).map((w: any) => ({
          id: w.id,
          slug: w.slug,
          company_data: w.company_data,
          address: w.address,
          opening_days: w.opening_days,
          type: w.type,
          bio: w.bio || '',
        })) as Workshop[];

        setWorkshops(parsed);

        const uniq = Array.from(
          new Set(parsed.flatMap((w) => w.type?.map((t) => t.category) || []))
        );
        setAllTypes(uniq);

        const lat = parseFloat(searchParams.get('lat') || '');
        const lng = parseFloat(searchParams.get('lng') || '');
        const radius = parseInt(searchParams.get('radius') || '', 10);
        const tipo = searchParams.get('tipo') || '';

        if (!isNaN(lat) && !isNaN(lng) && !isNaN(radius)) {
          const filteredByGeo = parsed.filter((w) => {
            const wLat = parseFloat(w.address?.lat || '');
            const wLng = parseFloat(w.address?.lon || '');

            if (isNaN(wLat) || isNaN(wLng)) {
              console.warn(`Coordinate non valide per:`, w.slug);
              return false;
            }

            const dist = haversineDistance(lat, lng, wLat, wLng);
            return dist <= radius;
          });

          const finalFiltered = tipo
            ? filteredByGeo.filter((w) =>
                w.type?.some((t) => t.category.toLowerCase() === tipo.toLowerCase())
              )
            : filteredByGeo;

          setGeoFiltered(finalFiltered);
          setFiltered(finalFiltered);
        } else {
          setGeoFiltered(parsed);
          setFiltered(parsed);
        }
      } catch (err) {
        console.error('❌ ERRORE FETCH:', err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [searchParams]);

  useEffect(() => {
    const q = searchQuery.toLowerCase();

    const result = geoFiltered.filter((w) => {
      const matchQuery =
        !q ||
        w.address?.citta?.toLowerCase().includes(q) ||
        w.address?.cap?.toLowerCase().includes(q);

      const matchType =
        selectedTypes.length === 0 ||
        w.type?.some((t) => selectedTypes.includes(t.category));

      return matchQuery && matchType;
    });

    setFiltered(result);
  }, [searchQuery, selectedTypes, geoFiltered]);

  return (
    <div
      className="min-h-screen py-10 px-4 md:px-10"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)),url(/bg/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <AllWorkshopsMap workshops={filtered} />
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-1/3 w-full space-y-6 bg-[#0c264b]/80 p-6 rounded-lg shadow border border-blue-800">
            <div>
              <label className="block text-lg font-semibold text-white mb-1">
                Filtra per città o CAP
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Es. Torino o 10133"
                className="w-full border border-white text-white px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <h2 className="text-lg text-white font-semibold mb-2">Filtra per categoria</h2>
              <ServiceFilter
                services={allTypes}
                selected={selectedTypes}
                onChange={setSelectedTypes}
              />
            </div>
          </aside>

          <section className="md:w-2/3 w-full">
            {loading ? (
              <p className="text-white">Caricamento in corso...</p>
            ) : filtered.length === 0 ? (
              <p className="text-white">Nessuna officina trovata.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((w) => (
                  <Link
                    href={`/workshops/${w.slug}`}
                    key={w.id}
                    className="block bg-[#0c264b]/80 p-4 rounded-lg shadow border border-blue-800 hover:shadow-md transition"
                  >
                    <h3 className="font-bold text-lg text-white mb-1 hover:underline">
                      {w.company_data?.name || 'Officina senza nome'}
                    </h3>
                    <p className="text-sm text-white mb-1">
                      {w.address?.via} {w.address?.numero}, {w.address?.citta} ({w.address?.cap})
                    </p>
                    <p className="text-xs text-white mb-2">
                      {w.address?.provincia}, {w.address?.nazione}
                    </p>
                    <div className="mt-2">
                      {w.type?.map((t, i) => (
                        <span
                          key={i}
                          className="inline-block bg-[#00B0F0] text-gray-100 text-xs px-2 py-1 rounded-full mr-1 mb-1"
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
        Visualizzate: {filtered.length} su {geoFiltered.length} officine nel raggio selezionato
      </p>
    </div>
  );
}
