'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/workshops/${id}?populate[company_data]=true&populate[address]=true&populate[services]=true&populate[opening_days]=true`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Errore ${res.status}`);
        }

        const data = await res.json();
        setWorkshop({ id: data.data.id, ...data.data });
      } catch (err: any) {
        console.error(err);
        setError('Errore nel caricamento dell officina.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id]);

  if (loading) return <p className="p-4">Caricamento in corso...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const info = workshop;
  const company = info.company_data || {};
  const address = info.address || {};
  const services = info.services || [];
  const orari = info.opening_days || [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-blue-900 mb-2">
        {company.name || 'Officina senza nome'}
      </h1>
      <p className="text-gray-600 mb-1">
        {address.via} {address.numero}, {address.cap} {address.citta} ({address.provincia}), {address.nazione}
      </p>

      <div className="mt-4">
        <h2 className="font-semibold text-gray-800 mb-2">Orari di apertura</h2>
        <ul className="text-sm text-gray-600">
          {orari.map((o: any, i: number) => (
            <li key={i}>
              {o.days}: {o.opening_hour} - {o.closing_hour}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-gray-800 mb-2">Servizi offerti</h2>
        <ul className="text-sm text-gray-700">
          {services.map((s: any, i: number) => (
            <li key={i} className="mb-1">
              <strong>{s.name}</strong>: {s.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
