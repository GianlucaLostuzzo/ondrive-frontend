'use client';

import { useGoogleMapsLoader } from '@/lib/useGoogleMapsLoader';
import WorkshopSearchForm from './WorkshopSearchForm';

export default function WorkshopSearchFormWrapper() {
  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) return <p className="text-red-600">Errore caricamento Google Maps</p>;
  if (!isLoaded) return <p className="text-gray-600">Caricamento modulo di ricerca...</p>;

  return <WorkshopSearchForm />;
}
