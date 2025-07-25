'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState, useRef } from 'react';
import type { JSX } from 'react';
import { useParams } from 'next/navigation';
import {
  BiSolidCarMechanic,
  BiSolidCarBattery,
  BiSolidSprayCan,
} from 'react-icons/bi';
import { GiCarWheel, GiTowTruck } from 'react-icons/gi';
import { FaMotorcycle, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { GrMapLocation } from 'react-icons/gr';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function WorkshopDetailPage() {
  const { slug } = useParams();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!slug) return; // evita fetch se slug non disponibile

    const fetchWorkshop = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

        if (!baseUrl || !token) {
          setError('❌ Variabili d’ambiente mancanti!');
          return;
        }

        const queryParams = new URLSearchParams();
        queryParams.append('filters[slug][$eq]', slug as string);
        ['company_data', 'address', 'opening_days', 'type', 'services', 'images', 'logo'].forEach((p) =>
          queryParams.append(`populate[${p}]`, 'true')
        );

        const url = `${baseUrl}/api/workshops?${queryParams.toString()}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store', // disattiva cache di Next.js
        });

        const data = await res.json();
        if (!res.ok || !data.data?.length) throw new Error('Workshop non trovato');

        setWorkshop({ id: data.data[0].id, ...data.data[0] });
      } catch (err: any) {
        setError('Officina non trovata o errore di rete.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [slug]);

  useEffect(() => {
    if (!workshop?.images?.length) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % workshop.images.length);
    }, 5000);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [workshop]);

  const handlePrev = () => {
    if (workshop?.images?.length) {
      setCurrentSlide((prev) =>
        (prev - 1 + workshop.images.length) % workshop.images.length
      );
    }
  };

  const handleNext = () => {
    if (workshop?.images?.length) {
      setCurrentSlide((prev) =>
        (prev + 1) % workshop.images.length
      );
    }
  };

  if (loading) return <p className="p-4">Caricamento in corso...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const company = workshop.company_data || {};
  const address = workshop.address || {};
  const services = workshop.services || [];
  const orari = workshop.opening_days || [];
  const images = workshop.images || [];
  const bio = workshop.bio || '';
  const logo = workshop.logo || '';
  const style = { color: 'oklch(37.9% .146 265.522)', fontSize: '50px' };

  const iconByServiceName: Record<string, JSX.Element> = {
    "Meccanico": <BiSolidCarMechanic style={style} />,
    "Elettrauto": <BiSolidCarBattery style={style} />,
    "Carrozzeria": <BiSolidSprayCan style={style} />,
    "Gommista": <GiCarWheel style={style} />,
    "Soccorso stradale": <GiTowTruck style={style} />,
    "Moto": <FaMotorcycle style={style} />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* SINISTRA */}
        <aside className="md:w-1/2 w-full">
          <div className="bg-white p-6 rounded shadow h-full">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              {company.name || 'Officina senza nome'}
            </h1>
            {address.via && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${address.via} ${address.numero}, ${address.cap} ${address.citta}, ${address.nazione}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold text-blue-500 hover:underline mb-4"
              >
                <GrMapLocation />
                <span>
                  {address.via} {address.numero}, {address.cap} {address.citta} ({address.provincia}), {address.nazione}
                </span>
              </a>
            )}

            {company.phone && (
              <p className="text-blue-600 mb-1 flex items-center gap-2">
                <FaPhoneAlt className="text-blue-500" size={20} />
                <a href={`tel:${company.phone}`} className="hover:underline">{company.phone}</a>
              </p>
            )}

            {company.whatsapp && (
              <p className="text-green-600 mb-1 flex items-center gap-2">
                <FaWhatsapp className="text-green-500" size={20} />
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {company.whatsapp}
                </a>
              </p>
            )}

            <div className="mt-6">
              <h2 className="font-semibold text-lg text-gray-800 mb-2">Orari di apertura</h2>
              {orari.length > 0 ? (
                <ul className="text-md text-gray-600">
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

            <div className="flex flex-wrap gap-4 items-center mt-6">
              {workshop.type?.map((t: any, i: number) =>
                iconByServiceName[t.category] ? (
                  <div key={i} className="flex flex-col items-center text-center w-20">
                    {iconByServiceName[t.category]}
                    <p className="text-sm mt-1 text-gray-600">{t.category}</p>
                  </div>
                ) : null
              )}
            </div>

            <div className="mt-6">
              <h2 className="font-semibold text-lg text-gray-800 mb-2">La storia</h2>
              <p className="text-md text-gray-600">{bio || 'Nessuna descrizione disponibile.'}</p>
            </div>
          </div>
        </aside>

        {/* DESTRA */}
        <aside className="md:w-1/2 w-full relative">
          <div className="bg-white p-6 rounded shadow h-full relative">
            {logo?.url ? (
              <img
                src={logo.url.startsWith('http') ? logo.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.url}`}
                alt={logo.alternativeText || 'Logo officina'}
                className="h-18 mb-4 object-contain mx-auto"
              />
            ) : (
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Scopri l'officina</h2>
            )}

            <div className="relative w-full h-80 overflow-hidden rounded">
              {images.map((img: any, i: number) => {
                const fullUrl = img.url.startsWith('http')
                  ? img.url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;
                return (
                  <img
                    key={img.id}
                    src={fullUrl}
                    alt={img.alternativeText || 'Immagine officina'}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  />
                );
              })}

              {/* CONTROLLI */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
                <button onClick={handlePrev} className="bg-white/80 hover:bg-white p-2 rounded-full shadow">
                  <FiChevronLeft size={24} style={{ color: 'rgb(59,130,246)' }} />
                </button>
                <button onClick={handleNext} className="bg-white/80 hover:bg-white p-2 rounded-full shadow">
                  <FiChevronRight size={24} style={{ color: 'rgb(59,130,246)' }} />
                </button>
              </div>

              {/* PALLINI */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {images.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full ${
                      i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* SERVIZI OFFERTI */}
      <div className="max-w-7xl mx-auto mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Come puoi essere assistito</h2>
        {services.length > 0 ? (
          <ul className="text-lg text-gray-700">
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
  );
}
