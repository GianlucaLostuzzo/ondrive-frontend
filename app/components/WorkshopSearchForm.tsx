'use client';

import { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useGoogleMapsLoader } from '@/lib/useGoogleMapsLoader'; // ✅ usa loader centralizzato

const radiusOptions = [5, 10, 20, 50]; // in km

export default function WorkshopSearchForm() {
  const [radius, setRadius] = useState(10);

  const { isLoaded, loadError } = useGoogleMapsLoader(); // ✅ centralizzato

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);

    // Reindirizza alla pagina dei risultati
    window.location.href = `/workshops?lat=${lat}&lng=${lng}&radius=${radius}`;
  };

  if (loadError) {
    return <p className="text-red-600">Errore nel caricamento di Google Maps</p>;
  }

  if (!isLoaded) {
    return <p className="text-gray-600">Caricamento...</p>;
  }

  return (
    <div className="space-y-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Inserisci città o indirizzo..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      {status === 'OK' && (
        <ul className="border rounded-md shadow max-h-48 overflow-y-auto bg-white z-10">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {description}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-2">
        <label className="text-sm">Raggio:</label>
        <select
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="border px-2 py-1 rounded text-sm"
        >
          {radiusOptions.map((r) => (
            <option key={r} value={r}>
              {r} km
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
