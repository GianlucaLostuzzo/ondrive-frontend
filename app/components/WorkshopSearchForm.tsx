'use client';

import { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useGoogleMapsLoader } from '@/lib/useGoogleMapsLoader';

const radiusOptions = [5, 10, 20, 50]; // in km

// 👇 Inserisci qui le tipologie come le hai su Strapi
const tipiOfficina = [
  'Meccanico',
  'Elettrauto',
  'Gommista',
  'Carrozzeria',
  'Moto',
  'Soccorso Stradale',
  'Revisioni',
];

export default function WorkshopSearchForm() {
  const [radius, setRadius] = useState(10);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded, loadError } = useGoogleMapsLoader();

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

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedPlace({ lat, lng });
    } catch (err) {
      console.error('Errore nel geocoding:', err);
      setSelectedPlace(null);
    }
  };

  const handleSearch = () => {
    if (!selectedPlace) {
      alert('Inserisci un indirizzo valido.');
      return;
    }

    const { lat, lng } = selectedPlace;
    const queryParams = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
    });

    if (selectedTipo) {
      queryParams.append('tipo', selectedTipo);
    }

    window.location.href = `/workshops?${queryParams.toString()}`;
  };

  if (loadError) return <p className="text-red-600">Errore caricamento Google Maps</p>;
  if (!isLoaded || !ready) return <p className="text-gray-600">Caricamento modulo ricerca...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cerca l'officina più vicina a te!</h2>      
      {/* Autocomplete input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Inserisci città o indirizzo..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
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

      {/* Raggio + Tipologia affiancati */}
      <div className="flex gap-4">
        {/* Raggio */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Raggio:</label>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="border px-3 py-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {radiusOptions.map((r) => (
              <option key={r} value={r}>
                {r} km
              </option>
            ))}
          </select>
        </div>

        {/* Tipologia */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipologia:</label>
          <select
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Tutte le tipologie</option>
            {tipiOfficina.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pulsante cerca */}
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Cerca
        </button>
      </div>
    </div>
  );
}
