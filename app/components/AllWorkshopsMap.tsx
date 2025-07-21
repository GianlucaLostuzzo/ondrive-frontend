'use client';

import { useEffect, useState } from 'react';
import { useGoogleMapsLoader } from '@/lib/useGoogleMapsLoader'; // ✅ importa il loader centralizzato
import WorkshopMap from './Map';

type Workshop = {
  id: number;
  slug: string;
  company_data?: { name?: string };
  address?: {
    lat?: string;
    lon?: string;
    citta?: string;
    via?: string;
    numero?: string;
    cap?: string;
    provincia?: string;
  };
};

export default function AllWorkshopsMap() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded, loadError } = useGoogleMapsLoader(); // ✅ usa hook centralizzato

  const fetchWorkshops = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/workshops?populate[company_data]=true&populate[address]=true`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Errore API:', res.status, errorText);
        throw new Error(`Errore API ${res.status}`);
      }

      const data = await res.json();

      return (data.data || []).map((w: any) => ({
        id: w.id,
        slug: w.slug || '',
        company_data: w.company_data || { name: 'Officina senza nome' },
        address: w.address || undefined,
      })) as Workshop[];
    } catch (err) {
      console.error('Errore fetchWorkshops:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchWorkshops()
      .then(setWorkshops)
      .catch(() => {
        setError('Errore nel recupero dati dalle API');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Trova un'officina ON<span style={{ color: '#0e9dda' }}>DRIVE</span>
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loadError && <p className="text-red-600 mb-4">Errore nel caricamento di Google Maps</p>}

        {loading || !isLoaded ? (
          <p className="text-gray-600">Caricamento mappa...</p>
        ) : (
          <WorkshopMap workshops={workshops} />
        )}
      </div>
    </section>
  );
}
