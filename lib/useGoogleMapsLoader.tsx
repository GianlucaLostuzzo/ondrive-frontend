// lib/useGoogleMapsLoader.tsx
'use client';

import { useJsApiLoader } from '@react-google-maps/api';

// ✅ Definizione esterna per evitare il warning
const libraries: ('places' | 'maps' | 'marker')[] = ['places', 'maps', 'marker'];

export function useGoogleMapsLoader() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'script-loader',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries, // ✅ usa la costante qui
    language: 'it',
    region: 'IT',
  });

  return { isLoaded, loadError };
}
