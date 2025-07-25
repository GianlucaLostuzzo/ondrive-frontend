import { Suspense } from 'react';
import ClientPage from './ClientPage';

export default function WorkshopsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Caricamento in corso...</div>}>
      <ClientPage />
    </Suspense>
  );
}
