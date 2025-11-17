import { useState } from 'react'

function FAQ() {
  const faqs = [
    {
      q: 'Hva er effektiv rente?',
      a: 'Effektiv rente inkluderer alle kostnader: nominell rente, etableringsgebyr og termingebyr. Den lar deg sammenligne banker på rettferdig grunnlag.'
    },
    {
      q: 'Påvirker sammenligning kredittscoren min?',
      a: 'Nei. I kalkulatoren tester du kun scenarier. Ingen kredittsjekk eller innsending av personopplysninger.'
    },
    {
      q: 'Er dette finansielle råd?',
      a: 'Nei. Beregningene er veiledende. Snakk med banken din før du tar økonomiske beslutninger.'
    },
  ]

  const [open, setOpen] = useState(null)

  return (
    <section aria-labelledby="faq-heading" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-slate-900">Ofte stilte spørsmål</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map((item, i) => (
            <div key={i}>
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-slate-900">{item.q}</span>
                <span className="text-slate-500">{open === i ? '-' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-slate-600 text-sm">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
