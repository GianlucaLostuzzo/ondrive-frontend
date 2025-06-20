import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type MapProps = {
  lat: number;
  lng: number;
};

export default function WorkshopMap({ lat, lng }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat, lng }}
        zoom={15}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
  );
}
//Trova la tua officina