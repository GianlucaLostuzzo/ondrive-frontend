'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function WorkshopDetailPage() {
  const { slug } = useParams();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

        if (!baseUrl || !token) {
          throw new Error('❌ Variabili d’ambiente mancanti!');
        }

        const queryParams = new URLSearchParams();
        queryParams.append('filters[slug][$eq]', slug as string);
        ['company_data', 'address', 'services', 'opening_days', 'images'].forEach((p) =>
          queryParams.append(`populate[${p}]`, 'true')
        );

        const url = `${baseUrl}/api/workshops?${queryParams.toString()}`;
        console.log('🌐 URL finale:', decodeURIComponent(url));

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log('📦 Risposta completa da Strapi:', data);

        if (!res.ok || !data.data?.length) {
          console.error('❌ API response error:', data);
          throw new Error(`Workshop non trovato`);
        }

        setWorkshop({ id: data.data[0].id, ...data.data[0] });
      } catch (err: any) {
        console.error('❌ Errore fetch:', err);
        setError('Officina non trovata o errore di rete.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [slug]);

  if (loading) return <p className="p-4">Caricamento in corso...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const company = workshop.company_data || {};
  const address = workshop.address || {};
  const services = workshop.services || [];
  const orari = workshop.opening_days || [];
  const images = workshop.images || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* SINISTRA: info officina */}
        <aside className="md:w-1/2 w-full">
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              {company.name || 'Officina senza nome'}
            </h1>

            <p className="text-gray-600 mb-1">
              {address.via} {address.numero}, {address.cap} {address.citta} ({address.provincia}),{' '}
              {address.nazione}
            </p>

            <div className="mt-4">
              <h2 className="font-semibold text-gray-800 mb-2">Orari di apertura</h2>
              {orari.length > 0 ? (
                <ul className="text-sm text-gray-600">
                  {orari.map((o: any, i: number) => (
                    <li key={i}>
                      {o.days}: {o.opening_hour} - {o.closing_hour}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Orari non disponibili</p>
              )}
            </div>

            <div className="mt-4">
              <h2 className="font-semibold text-gray-800 mb-2">Servizi offerti</h2>
              {services.length > 0 ? (
                <ul className="text-sm text-gray-700">
                  {services.map((s: any, i: number) => (
                    <li key={i} className="mb-1">
                      <strong>{s.name}</strong>: {s.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Nessun servizio ancora registrato</p>
              )}
            </div>
          </div>
        </aside>

        {/* DESTRA: immagini */}
        <aside className="md:w-1/2 w-full">
          <div className="bg-white p-6 rounded shadow h-full">
            <h2 className="font-semibold text-gray-800 mb-4">Scopri l'officina!</h2>
            <div className="grid grid-cols-2 gap-4">
              {(() => {
                console.log('🧪 Controllo immagini:', images);

                if (images.length > 0) {
                  return images.map((img: any) => {
                    const fullUrl = img.url.startsWith('http')
                      ? img.url
                      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;

                    console.log('🖼️ URL immagine:', fullUrl);

                    return (
                      <img
                        key={img.id}
                        src={fullUrl}
                        alt={img.alternativeText || 'Immagine officina'}
                        className="rounded object-cover h-40 w-full"
                      />
                    );
                  });
                } else {
                  return <p className="text-sm text-gray-500">Nessuna immagine disponibile</p>;
                }
              })()}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
