export default function LandingPage() {
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-[#0c264b]">
      {/* LEFT: logo + testi */}
      <section className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center px-8 md:px-16 py-10 gap-6">
        <img
          src="/negative_logo.svg"
          alt="OnDrive Logo"
          className="h-20 md:h-22 lg:h-24"
        />

        <div className="text-white font-garet text-left md:text-left">
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

      {/* RIGHT: hero come blocco immagine */}
      <section
        className="w-full lg:py-50 md:w-1/2 flex-1 h-56 md:h-auto"
        aria-label="Hero"
      >
        <center><img
          src="/bg/hero_landing.jpg"
          alt="Mechanic working"
          className="md:ml-12 w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
         /></center>
      </section>
    </div>
  );
}
