import { useEffect, useMemo, useState } from 'react'

const NOK = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 })

function LoanCalculator() {
  const [amount, setAmount] = useState(250000)
  const [months, setMonths] = useState(60)
  const [offers, setOffers] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // load defaults
    fetch(`${backend}/api/default-offers`).then(r => r.json()).then(setOffers).catch(() => setOffers([]))
  }, [backend])

  const updateOffer = (idx, key, value) => {
    const next = offers.map((o, i) => i === idx ? { ...o, [key]: value } : o)
    setOffers(next)
  }

  const addOffer = () => {
    setOffers([...offers, { lender: `Ny bank ${offers.length + 1}`, apr_nominal: 9.5, establishment_fee: 950, term_fee: 45 }])
  }

  const removeOffer = (idx) => {
    setOffers(offers.filter((_, i) => i !== idx))
  }

  const canCompare = useMemo(() => amount > 0 && months > 0 && offers.length > 0, [amount, months, offers])

  const compare = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${backend}/api/compare-loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_amount: Number(amount), term_months: Number(months), offers })
      })
      if (!res.ok) throw new Error('Kunne ikke beregne – prøv igjen')
      const data = await res.json()
      setResults(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="calculator" className="relative py-16">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Din låneprofil</h2>
          <p className="text-slate-600 mt-1">Juster beløp og løpetid. Legg til eller rediger banker.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white/70 backdrop-blur rounded-2xl p-6 shadow">
            <label className="block text-sm font-medium text-slate-700">Lånebeløp</label>
            <input type="range" min={50000} max={1000000} step={5000} value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full" />
            <div className="mt-2 text-lg font-semibold">{NOK.format(amount)}</div>

            <label className="block mt-6 text-sm font-medium text-slate-700">Løpetid (måneder)</label>
            <input type="range" min={12} max={180} step={6} value={months} onChange={e => setMonths(Number(e.target.value))} className="w-full" />
            <div className="mt-2 text-lg font-semibold">{months} mnd</div>

            <button onClick={compare} disabled={!canCompare || loading} className="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold shadow hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Beregner…' : 'Sammenlign tilbud'}
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="lg:col-span-2 space-y-4">
            {offers.map((o, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow">
                <div className="grid md:grid-cols-5 gap-3 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-600">Bank</label>
                    <input value={o.lender} onChange={e => updateOffer(idx, 'lender', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600">Nominell rente %</label>
                    <input type="number" step="0.01" value={o.apr_nominal} onChange={e => updateOffer(idx, 'apr_nominal', Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600">Etableringsgebyr</label>
                    <input type="number" value={o.establishment_fee} onChange={e => updateOffer(idx, 'establishment_fee', Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600">Termingebyr/mnd</label>
                    <input type="number" value={o.term_fee} onChange={e => updateOffer(idx, 'term_fee', Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                </div>
                <div className="mt-3 flex justify-between">
                  <button onClick={() => removeOffer(idx)} className="text-sm text-red-600 hover:underline">Fjern</button>
                </div>
              </div>
            ))}

            <button onClick={addOffer} className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">
              + Legg til bank
            </button>

            {results.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Resultater</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.map((r, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">{r.lender}</h4>
                        <span className="text-xs rounded-full bg-blue-50 px-2 py-1 text-blue-700">Eff. {r.effective_rate_annual}%</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-slate-500">Mnd. betaling</div>
                          <div className="font-semibold">{NOK.format(r.monthly_payment)}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Mnd. med gebyr</div>
                          <div className="font-semibold">{NOK.format(r.monthly_cost_with_fees)}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Renter totalt</div>
                          <div className="font-semibold">{NOK.format(r.total_interest)}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Gebyr totalt</div>
                          <div className="font-semibold">{NOK.format(r.total_fees)}</div>
                        </div>
                      </div>
                      <div className="mt-3 border-t pt-3 flex items-center justify-between">
                        <div className="text-slate-700">Totalkostnad</div>
                        <div className="text-lg font-bold">{NOK.format(r.total_cost)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">Sortert etter lavest totalkostnad. Beregninger er veiledende.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoanCalculator
