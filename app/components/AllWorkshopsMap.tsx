'use client';

import { useGoogleMapsLoader } from '@/lib/useGoogleMapsLoader';
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

type Props = {
  workshops: Workshop[];
};

export default function AllWorkshopsMap({ workshops }: Props) {
  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) {
    return <p className="text-red-600">Errore caricamento Google Maps</p>;
  }

  if (!isLoaded) {
    return <p className="text-gray-600">Caricamento mappa...</p>;
  }

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Trova un'officina ON<span style={{ color: '#0e9dda' }}>DRIVE</span>
        </h2>
        <WorkshopMap workshops={workshops} />
      </div>
    </section>
  );
}
