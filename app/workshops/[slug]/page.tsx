'use client';

import React, { useEffect, useState, useRef } from 'react';
import type { JSX } from 'react';
import { useParams } from 'next/navigation';
import { BiSolidCarMechanic, BiSolidCarBattery, BiSolidSprayCan } from 'react-icons/bi';
import { GiCarWheel, GiTowTruck } from 'react-icons/gi';
import { FaMotorcycle, FaWhatsapp, FaPhoneAlt, FaFacebook, FaInstagram } from 'react-icons/fa';
import { GrMapLocation } from 'react-icons/gr';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdAir, MdCarCrash } from "react-icons/md";
import { TbAutomaticGearboxFilled,TbChecklist,TbClipboardList,TbWorld } from "react-icons/tb";

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
  // const services = workshop.services || []; not used anymore
  const orari = workshop.opening_days || [];
  const images = workshop.images || [];
  const bio = workshop.bio || '';
  const logo = workshop.logo || '';
  const style = { color: 'oklch(37.9% .146 265.522)', fontSize: '50px' };

  const iconByServiceName: Record<string, JSX.Element> = {
    "Cambio automatico": <TbAutomaticGearboxFilled style={style} />,
    "Carrozzeria": <BiSolidSprayCan style={style} />,
    "Clima": <MdAir style={style} />,
    "Diagnosi": <MdCarCrash style={style} />,
    "Elettrauto": <BiSolidCarBattery style={style} />,
    "Gommista": <GiCarWheel style={style} />,
    "Meccanico": <BiSolidCarMechanic style={style} />,
    "Moto": <FaMotorcycle style={style} />,
    "Revisione": <TbChecklist style={style} />,
    "Soccorso stradale": <GiTowTruck style={style} />,
    "Tagliando": <TbClipboardList style={style} />
  };

  const descriptionByCategory: Record<string, string> = {
    "Cambio automatico": "Mantieni il tuo cambio fluido e affidabile: un’accurata manutenzione, sostituendo olio e filtro, previene guasti costosi e assicura cambi di marcia fluidi e una lunga durata al tuo veicolo.",
    "Carrozzeria": "Hai subito danni da grandine o da incidente? La nostra carrozzeria utilizzando attrezzature all’avanguardia riporterà la tua auto al suo aspetto originale.",
    "Clima": "Hai bisogno di ricaricare l’aria condizionata o di far controllare il climatizzatore? La nostra officina esegue un’attenta ricerca guasti, ricarica gas o una semplice manutenzione e pulizia del sistema per garantire aria fresca in estate e vetri liberi da condensa in inverno.",
    "Diagnosi": "Se la tua auto ha problemi, si accendono spie o appaiono messaggi strani nel cruscotto, puoi rivolgerti alla nostra officina specializzata nella diagnosi dei sistemi elettronici di bordo. Con controlli rapidi e mirati, il guasto viene individuato e risolto prima che diventi un problema più serio.",
    "Elettrauto": "Problemi elettrici all’auto? Un elettrauto è pronto a intervenire su batteria, fari, cablaggi e sistemi elettrici di bordo, riportando tutto al corretto funzionamento.",
    "Gommista": "Devi cambiare le gomme estive o invernali? I nostri tecnici gommisti si occuperanno della sostituzione pneumatici, eventuali riparazioni, equilibratura, convergenza e controllo pressione per garantirti sempre sicurezza e aderenza ottimali.",
    "Meccanico": "Interventi di manutenzione e riparazione meccanica su qualsiasi tipo di veicolo.",    
    "Moto": "Vorrei fare un “tagliando auto vicino a me”. La nostra officina effettua il tagliando completo al tuo veicolo secondo le indicazioni della casa costruttrice, mantenendo valida la garanzia e aumentando la sicurezza su strada.",
    "Revisione": "Servizio di revisione periodica obbligatoria del veicolo.",
    "Soccorso stradale": "Cerchi un carroattrezzi vicino a te? In caso di guasto o incidente, la nostra officina offre un servizio di soccorso stradale veloce ed efficace per riportarti subito in movimento.",
    "Tagliando": "Vorrei fare un “tagliando auto vicino a me”. La nostra officina effettua il tagliando completo al tuo veicolo secondo le indicazioni della casa costruttrice, mantenendo valida la garanzia e aumentando la sicurezza su strada."
  };

  const titleByCategory: Record<string, string> = {
    "Cambio automatico": "Assistenza cambi automatici",
    "Carrozzeria": "Carrozzeria",
    "Clima": "Assistenza climatizzazione e aria condizionata",
    "Diagnosi": "Diagnosi dei sistemi elettronici",
    "Elettrauto": "Elettrauto",
    "Gommista": "Gommista",
    "Meccanico": "Meccanico",
    "Moto": "Tagliando moto",
    "Revisione": "Servizio revisione",
    "Soccorso stradale": "Soccorso stradale",
    "Tagliando":"Tagliando auto"
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-600">
                <FaPhoneAlt className="text-green-500" size={20} />
                <a href={`tel:${company.phone}`} className="hover:underline">
                  {company.phone}
                </a>
              </div>

              {company.whatsapp && (
                <div className="flex items-center gap-2 text-green-600">
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaWhatsapp className="text-green-500" size={22} />
                  </a>
                </div>
              )}

              {company.fb && (
                <div className="flex items-center gap-2 text-blue-600">
                  <a
                    href={`https://www.facebook.com/${company.fb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaFacebook className="text-blue-600" size={22} />
                  </a>
                </div>
              )}

              {company.ig && (
                <div className="flex items-center gap-2">
                  <a
                    href={`https://instagram.com/${company.ig}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaInstagram style={{ color: '#ff006e' }} size={22} />
                  </a>
                </div>
              )}

              {company.website && (
                <div className="flex items-center gap-2">
                  <a
                    href={`${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <TbWorld style={{ color: '#00B0F0' }} size={22} />
                  </a>
                </div>
              )}
            </div>

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
                  <button key={i} className="flex flex-col items-center text-center w-20 hover:scale-105 hover:cursor-pointer transition-transform" onClick={scrollToServices}>
                    {iconByServiceName[t.category]}
                    <p className="text-sm mt-1 text-gray-600">{t.category}</p>
                  </button>
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
      <div id="services" className="max-w-7xl mx-auto mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Come puoi essere assistito</h2>
        {workshop.type?.length > 0 ? (
          <ul className="text-lg text-gray-700">
            {workshop.type.map((t: any, i: number) => {
                const title = titleByCategory[t.category] || t.category;
                const desc = descriptionByCategory[t.category] || 'Descrizione non disponibile.';
                return (
                  <li key={i} className="mb-1">
                    <strong>{title}:</strong> {desc}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Nessun servizio disponibile</p>
        )}
      </div>
    </div>
  );
}
