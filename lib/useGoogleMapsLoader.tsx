// lib/useGoogleMapsLoader.tsx
'use client';

import { useJsApiLoader } from '@react-google-maps/api';

export function useGoogleMapsLoader() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'script-loader',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places', 'maps'], // carica entrambe le librerie
    language: 'it',
    region: 'IT',
  });

  return { isLoaded, loadError };
}
