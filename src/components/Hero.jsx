import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 grid lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 md:p-8 shadow-xl max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Sammenlign lån i Norge på minutter
          </h1>
          <p className="mt-4 text-slate-700">
            Få et klart bilde av månedskostnad, effektiv rente og totalkostnad. Moderne, transparent og gratis.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#calculator" className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold shadow hover:bg-blue-700 transition-colors">
              Start sammenligning
            </a>
            <a href="#how" className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-5 py-3 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition-colors">
              Slik fungerer det
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500">Ikke finansielle råd. Eksempler er veiledende.</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-50/90 to-transparent" />
    </section>
  )
}

export default Hero
