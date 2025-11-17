function Trust() {
  const items = [
    { title: "Bank-agnostisk", desc: "Vi er uavhengige – du ser fakta, ikke annonser." },
    { title: "Personvern først", desc: "Ingen innlogging nødvendig for å teste scenarier." },
    { title: "Transparente beregninger", desc: "Effektiv rente og totalkostnad vises tydelig." },
  ]
  return (
    <section aria-labelledby="trust-heading" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 id="trust-heading" className="text-2xl md:text-3xl font-bold text-slate-900">Derfor stoler brukere på oss</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{it.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trust
