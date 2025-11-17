function HowItWorks() {
  const steps = [
    {
      title: 'Fortell oss om lånet',
      desc: 'Velg beløp og løpetid som passer deg. Du kan når som helst justere.',
    },
    {
      title: 'Sammenlign banker',
      desc: 'Vi viser nominell rente, gebyrer, effektiv rente og totalkostnad.',
    },
    {
      title: 'Velg det beste',
      desc: 'Sorter og finn det som gir lavest kostnad over tid – helt transparent.',
    },
  ]

  return (
    <section id="how" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Slik fungerer det</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{i+1}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
