'use client';

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState, useMemo } from 'react';
import Link from 'next/link';

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

type MapProps = {
  workshops: Workshop[];
};

export default function WorkshopMap({ workshops }: MapProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    language: 'it',
    region: 'IT',
  });

  const valid = useMemo(
    () => workshops.filter(w => w.address?.lat && w.address?.lon),
    [workshops]
  );

  const center = {
    lat: 44.4948, // Bologna
    lng: 11.3426, // Bologna
  }

  if (!isLoaded) return <p>Caricamento mappa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '300px' }}
      center={center}
      zoom={6.3} // Zoom adatto per l'Italia del Nord
      onClick={() => setActiveId(null)} // clic sulla mappa chiude l'infowindow
    >
      {valid.map((w) => {
        const lat = parseFloat(w.address!.lat!);
        const lon = parseFloat(w.address!.lon!);

        return (
          <Marker
            key={w.id}
            position={{ lat, lng: lon }}
            onClick={() => setActiveId(w.id)}
          />
        );
      })}

      {valid.map((w) => {
        const lat = parseFloat(w.address!.lat!);
        const lon = parseFloat(w.address!.lon!);
        if (activeId !== w.id) return null;

        return (
          <InfoWindow
            key={`infowindow-${w.id}`}
            position={{ lat, lng: lon }}
            onCloseClick={() => setActiveId(null)}
          >
            <div className="text-sm max-w-xs">
              <p className="font-bold mb-1">{w.company_data?.name || 'Officina'}</p>
              <p>{w.address?.via} {w.address?.numero}</p>
              <p>{w.address?.cap} {w.address?.citta} ({w.address?.provincia})</p>
              <Link
                href={`/workshops/${w.slug}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                Vedi dettagli →
              </Link>
            </div>
          </InfoWindow>
        );
      })}
    </GoogleMap>
  );
}
