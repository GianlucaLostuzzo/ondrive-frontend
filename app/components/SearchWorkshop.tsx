'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function SearchWorkshop() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [closestWorkshop, setClosestWorkshop] = useState<Workshop | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalizzazione non supportata');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        setUserLocation({ lat: userLat, lon: userLon });

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/workshops?populate=*`, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          });

          if (!res.ok) throw new Error(`Errore API ${res.status}`);

          const data = await res.json();
          const ws: Workshop[] = data.data || [];
          setWorkshops(ws);

          const validWorkshops = ws.filter(w => w.address?.lat && w.address?.lon);
          const nearest = validWorkshops.reduce((closest, current) => {
            const distCurrent = haversineDistance(
              userLat,
              userLon,
              parseFloat(current.address!.lat!),
              parseFloat(current.address!.lon!)
            );
            const distClosest = closest
              ? haversineDistance(
                  userLat,
                  userLon,
                  parseFloat(closest.address!.lat!),
                  parseFloat(closest.address!.lon!)
                )
              : Infinity;

            return distCurrent < distClosest ? current : closest;
          }, null as Workshop | null);

          setClosestWorkshop(nearest);
        } catch (err) {
          console.error(err);
          setError('Errore nel recupero dati dalle API');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError('Geolocalizzazione negata o fallita');
        setLoading(false);
      }
    );
  }, []);

  const lat = closestWorkshop?.address?.lat ? parseFloat(closestWorkshop.address.lat) : null;
  const lng = closestWorkshop?.address?.lon ? parseFloat(closestWorkshop.address.lon) : null;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          L'Officina ON<span style={{ color: '#009cda' }}>DRIVE</span> più vicina a te:
        </h2>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-600">Caricamento posizione e officine…</p>
        ) : lat && lng ? (
          <>
            <p className="text-center font-semibold mb-2">
              {closestWorkshop?.company_data?.name}
            </p>
            <p className="text-center text-gray-600 mb-4">
              {closestWorkshop?.address?.via}, {closestWorkshop?.address?.numero} – {closestWorkshop?.address?.citta} ({closestWorkshop?.address?.cap})
            </p>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat, lng }}
                zoom={15}
              >
                <Marker position={{ lat, lng }} />
              </GoogleMap>
            </LoadScript>
          </>
        ) : (
          <p className="text-center text-gray-600">Nessuna officina trovata</p>
        )}
      </div>
    </section>
  );
}
