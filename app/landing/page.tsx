'use client';

import { FaCircleArrowDown  } from "react-icons/fa6";
import { PiArrowDown } from "react-icons/pi";

export default function LandingPage() {
  return (
    <>
      {/* first section */}
      <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-[linear-gradient(rgba(15,23,42,0.8),rgba(15,23,42,0.75)),url('/bg/home_blue.svg')]">
        {/* left */}
        <section className="flex-1 flex flex-col items-center md:items-start justify-center px-8 md:px-16 py-10 gap-6">
          <img
            src="/negative_logo.svg"
            alt="OnDrive Logo"
            className="h-22 md:h-24 lg:h-26"
          />

          <div className="text-white font-garet text-left">
            <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold">
              Benvenuto in ONDRIVE
            </h1>
            <p className="mt-8 text-xl md:text-2xl lg:text-3xl leading-snug">
              Il primo Network Tecnico <br />
              che fa crescere <br />
              officine e ricambisti
            </p>
          </div>
        </section>

        {/* right */}
        <section
          className="flex-1 flex items-center justify-center px-8 md:px-16 py-10"
          aria-label="Hero"
        >
          <img
            src="/bg/hero_landing.jpg"
            alt="Mechanic working"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
          />
        </section>

        {/* arrow */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <FaCircleArrowDown size={40} className="text-cyan-500 cursor-pointer"
            onClick={() => {
              document.getElementById('second-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>


      {/* second section with 3 columns: retailer benefits */}
      <section id="second-section" className="min-h-screen relative px-6 py-20 text-white w-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-garet mb-12">
              NON SOLO UN NETWORK: &Egrave; UN POTENZIATORE DEL TUO BUSINESS
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="relative border-3 border-cyan-500 p-6 rounded-xl transition">
                <h3 className="text-4xl font-oswald font-bold mb-2 break-words">
                  I BENEFICI PER IL RICAMBISTA
                </h3>

                {/* freccia */}
                <img
                  src="/icons/arrow.png"
                  alt="arrow down"
                  className="absolute hidden md:block top-50 right-10 w-60"
                />

                {/* versione mobile */}
                <img
                  src="/icons/arrow.png"
                  alt="arrow down"
                  className="absolute rotate-90 md:hidden top-25 left-11/13 w-15"
                />
              </div>
          
              <div className="space-y-6">
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Riduzione dei tempi di gestione grazie a un'App che centralizza le richieste
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Un tecnico ONDRIVE dedicato che lavora al fianco dell'officina, come un'estensione del tuo team
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Maggiore controllo sui processi e migliori risultati operativi
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Ricevi gli ordini direttamente tramite l'App con i codici OE verificati con il VIN
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Calendari formativi personalizzati, per offrire valore concreto ai tuoi clienti
                </div>
                <div className="bg-[#00A0E0] text-white font-inter font-bold p-6 rounded-xl shadow">
                  <span className="font-bold font-oswald text-3xl">IN PRATICA?</span>
                  <p className="mt-4 text-xl"> Pi&ugrave; efficienza, meno dispersioni e un rapporto più solido e strategico con le tue officine.
                  </ p>
                </div>
              </div>

            </div>
          </div>
          {/* arrow */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <FaCircleArrowDown size={40} className="text-cyan-500 cursor-pointer"
              onClick={() => {
                document.getElementById('third-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </section>

        {/* third section with 3 columns: workshop benefits */}
      <section id="third-section" className="min-h-screen relative px-6 py-20 text-white w-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-garet mb-12">
              FAI CRESCERE LA TUA OFFICINA CON CHI PARLA IL TUO LINGUAGGIO
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="relative border-3 border-cyan-500 p-6 rounded-xl transition">
                <h3 className="text-4xl font-oswald font-bold mb-2 break-words">
                  I VANTAGGI CONCRETI PER L'AUTORIPARATORE
                </h3>

                {/* freccia */}
                <img
                  src="/icons/arrow.png"
                  alt="arrow down"
                  className="absolute hidden md:block top-45 right-10 w-60"
                />

                {/* versione mobile */}
                <img
                  src="/icons/arrow.png"
                  alt="arrow down"
                  className="absolute rotate-90 md:hidden top-40 left-11/13 w-15"
                />
              </div>
          
              <div className="space-y-6">
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  App intelligente per preventivi precisi, banca dati in un'unica soluzione
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Supporto tecnico dedicato con il tuo Tecnico di Fiducia
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Maggiore autonomia tecnica su lavorazioni complesse
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Assistenza alla riparazione e supporto tecnico
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Formazioni qualificanti per cogliere nuove opportunità di business, anche 1-to-1 direttamente in officina
                </div>
                <div className="bg-white text-blue-900 font-inter font-bold p-6 rounded-xl shadow">
                  Collaborazione fluida con il proprio ricambista, per una gestione più efficiente dei ricambi
                </div>
              </div>
              <div></div>
              <div className="md:col-span-2 font-oswald font-bold bg-[#00A0E0] text-white text-3xl p-6 rounded-xl shadow">
                Risultato?
                <p className="font-inter text-xl mt-4">
                  Pi&ugrave; tempo, pi&ugrave; ordine, pi&ugrave; clienti.<br />
                  Un partner che ti affianca ogni giorno per affrontare il futuro con sicurezza.
                </p>
              </div>

            </div>
          </div>
          {/* arrow */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <FaCircleArrowDown size={40} className="text-cyan-500 cursor-pointer"
              onClick={() => {
                document.getElementById('final-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </section>

        <section id="final-section" className="min-h-screen relative text-white flex items-center bg-center bg-cover bg-no-repeat
          bg-[linear-gradient(rgba(15,23,42,0.7),rgba(15,23,42,0.7)),url('/bg/hero_small.jpg')]
          sm:bg-[linear-gradient(rgba(15,23,42,0.7),rgba(15,23,42,0.7)),url('/bg/hero.jpg')]
          lg:bg-[length:150%]">
        <div className="max-w-4xl mx-auto text-center p-10 rounded-lg">
          <h2 className="text-5xl font-garet font-bold mb-6">
            Entra nel network che valorizza il tuo mestiere!
          </h2>
          <p /><br />
          <p className="text-xl mb-8 font-bold font-inter">
            DIAGNOSI AVANZATE - ADAS - PROGRAMMAZIONI - CAMBIO AUTOMATICO - CLIMA - ORDINI RICAMBI FACILI - PREVENTIVI VELOCI - LIBRETTI ELETTRONICI - CHIAVI - DATI TECNICI
          </p>
        </div>
      </section>
    </>
  );
}
