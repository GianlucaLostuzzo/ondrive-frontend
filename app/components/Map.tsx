'use client';

import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGoogleMapsLoader } from '@/lib/useGoogleMapsLoader';

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
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useGoogleMapsLoader();

  // Filtra solo le officine con coordinate valide
  const valid = useMemo(
    () =>
      workshops.filter((w) => {
        const validLat = !isNaN(parseFloat(w.address?.lat || ''));
        const validLon = !isNaN(parseFloat(w.address?.lon || ''));
        return validLat && validLon;
      }),
    [workshops]
  );

  // Quando la mappa è pronta e ci sono marker validi, fai il fit automatico
  useEffect(() => {
    if (mapRef.current && valid.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      valid.forEach((w) => {
        const lat = parseFloat(w.address!.lat!);
        const lng = parseFloat(w.address!.lon!);
        bounds.extend({ lat, lng });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [valid]);

  if (loadError) return <p className="text-red-600">Errore caricamento Google Maps</p>;
  if (!isLoaded) return <p className="text-gray-600">Caricamento mappa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '300px',
        borderRadius: '0.5rem',
        borderColor: '#0c264b',
        borderWidth: '1px',
      }}
      zoom={5}
      center={{ lat: 44.4948, lng: 11.3426 }} // default fallback (Bologna)
      onClick={() => setActiveId(null)}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {valid.map((w) => {
        const lat = parseFloat(w.address!.lat!);
        const lon = parseFloat(w.address!.lon!);

        return (
          <Marker
            key={w.id}
            position={{ lat, lng: lon }}
            onClick={() => setActiveId(w.id)}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
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
            <div className="text-sm max-w-xs rounded-lg shadow-lg p-4 bg-white">
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
