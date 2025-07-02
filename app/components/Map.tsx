'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';

type Workshop = {
  id: number;
  company_data?: { name?: string };
  address?: {
    lat?: string;
    lon?: string;
    citta?: string;
  };
};

type MapProps = {
  workshops: Workshop[];
};

export default function WorkshopMap({ workshops }: MapProps) {
  const valid = workshops.filter(w => w.address?.lat && w.address?.lon);

  const center = valid.length > 0
    ? {
        lat: parseFloat(valid[0].address!.lat!),
        lng: parseFloat(valid[0].address!.lon!),
      }
    : {
        lat: 41.9028, // Default Roma
        lng: 12.4964,
      };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={center}
      zoom={6}
    >
      {valid.map((w) => (
        <Marker
          key={w.id}
          position={{
            lat: parseFloat(w.address!.lat!),
            lng: parseFloat(w.address!.lon!),
          }}
          title={w.company_data?.name || 'Officina'}
        />
      ))}
    </GoogleMap>
  );
}
