import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LoanCalculator from './components/LoanCalculator'
import HowItWorks from './components/HowItWorks'
import Trust from './components/Trust'
import FAQ from './components/FAQ'
import SEO from './components/SEO'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEO />
      <Navbar />
      <main className="pt-14">
        <Hero />
        <LoanCalculator />
        <HowItWorks />
        <Trust />
        <FAQ />
        <section aria-label="CTA" className="py-16">
          <div className="container mx-auto px-6">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-[1px]">
              <div className="rounded-2xl bg-white p-8 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold">Klar for å sammenligne lån?</h3>
                  <p className="mt-2 text-slate-600">Start med et eksempel – du kan alltid justere beløp og banker senere.</p>
                </div>
                <div className="flex md:justify-end">
                  <a href="#calculator" className="inline-flex items-center rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold shadow hover:bg-blue-700">
                    Start nå
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="py-10 text-center text-sm text-slate-600">© {new Date().getFullYear()} Finno Compare – Ikke finansielle råd.</footer>
      </main>
    </div>
  )
}

export default App
