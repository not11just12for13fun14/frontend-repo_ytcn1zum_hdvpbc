import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200/60">
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="text-lg font-bold tracking-tight">Finno Compare</a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#calculator" className="text-slate-700 hover:text-slate-900">Kalkulator</a>
          <a href="#how" className="text-slate-700 hover:text-slate-900">Slik fungerer det</a>
          <a href="/test" className="text-slate-700 hover:text-slate-900">Systemstatus</a>
          <a href="#" className="rounded-xl bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700">Kom i gang</a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <a onClick={() => setOpen(false)} href="#calculator" className="block">Kalkulator</a>
          <a onClick={() => setOpen(false)} href="#how" className="block">Slik fungerer det</a>
          <a onClick={() => setOpen(false)} href="/test" className="block">Systemstatus</a>
        </div>
      )}
    </header>
  )
}

export default Navbar
