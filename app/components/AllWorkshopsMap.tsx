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
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto text-center rounded-lg shadow-lg">
        <WorkshopMap workshops={workshops} />
      </div>
    </section>
  );
}
