export default function LandingPage() {
  return (
    <div className="min-h-screen text-gray-800 px-6 py-16" style={{
            backgroundColor: '#0c264b',
            backgroundImage: 'url(/bg/home_blue.svg)',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
          }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0e9dda]">
          Vantaggi di ONDRIVE
        </h1>

        {/* Versione tabella - visibile da md in su */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-[#0e9dda] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Sei un ricambista?
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Sei un'officina?
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 text-sm text-white">
                  Comunicazione univoca con i tuoi clienti
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  Banca dati, preventivatore e assistenza alla riparazione in un'unica soluzione
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  Ricevi gli ordini direttamente tramite l'app con i codici OE verificati con il VIN
                </td>
                <td className="px-6 py-4 text-sm">
                  Assistenza alla riparazione e supporto tecnico dedicato con il tuo Tecnico di Fiducia
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-white">
                  Cogli opportunità di business nuove grazie al catalogo attrezzature Ondrive
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  Accedi a un pacchetto di formazioni qualificanti per cogliere nuove opportunità di business
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  Servizi affidabili e prezzi competitivi
                </td>
                <td className="px-6 py-4 text-sm">
                  Incremento della fiducia grazie al network certificato
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Versione lista - visibile solo su mobile */}
        <div className="md:hidden space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#0e9dda] mb-2">
              Per i ricambisti
            </h2>
            <ul className="list-disc list-inside text-sm text-white space-y-1">
              <li>Comunicazione univoca con i tuoi clienti</li>
              <li>Ricevi gli ordini direttamente tramite l'app con i codici OE verificati con il VIN</li>
              <li>Cogli opportunità di business nuove grazie al catalogo attrezzature Ondrive</li>
              <li>Servizi affidabili e prezzi competitivi</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0e9dda] mb-2">
              Per le officine
            </h2>
            <ul className="list-disc list-inside text-sm text-white space-y-1">
              <li>Banca dati, preventivatore e assistenza alla riparazione in un'unica soluzione</li>
              <li>Assistenza alla riparazione e supporto tecnico dedicato con il tuo Tecnico di Fiducia</li>
              <li>Accedi a un pacchetto di formazioni qualificanti per cogliere nuove opportunità di business</li>
              <li>Incremento della fiducia grazie al network certificato</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
