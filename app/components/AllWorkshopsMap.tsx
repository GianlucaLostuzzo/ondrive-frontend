'use client';

import { useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import WorkshopMap from './Map';

type Workshop = {
  id: number;
  company_data?: { name?: string };
  address?: {
    via?: string;
    numero?: string;
    citta?: string;
    cap?: string;
    lat?: string;
    lon?: string;
  };
};

export default function AllWorkshopsMap() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    language: 'it',
    region: 'IT',
  });

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
          Le Officine del network ON<span style={{ color: '#009cda' }}>DRIVE</span>
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading || !isLoaded ? (
          <p className="text-gray-600">Caricamento mappa...</p>
        ) : (
          <WorkshopMap workshops={workshops} />
        )}
      </div>
    </section>
  );
}
