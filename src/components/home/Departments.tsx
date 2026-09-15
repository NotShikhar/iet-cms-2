import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { departments } from '../../data/departments'
import { Reveal } from '../ui/Reveal'

export function Departments() {
  const [active, setActive] = useState(0)
  const d = departments[active]
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-navy-600/40 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow !text-saffron-300">Departments</span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">Eight departments. More than 71 faculty members.</h2>
          <p className="mt-4 text-lg text-navy-100/80">Engineering and science departments running B.Tech, M.Tech, M.Sc. and Ph.D. programmes.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="space-y-1">
              {departments.map((dep, i) => (
                <li key={dep.slug}>
                  <button onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${active === i ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    <span className="flex items-center gap-3">
                      <span className={`grid h-9 w-12 shrink-0 place-items-center rounded-lg text-[11px] font-bold ${active === i ? 'bg-saffron-400 text-ink' : 'bg-white/10 text-navy-100'}`}>{dep.code}</span>
                      <span>
                        <span className="block text-[15px] font-semibold">{dep.name}</span>
                        <span className="block text-xs text-navy-200/70">{dep.tagline}</span>
                      </span>
                    </span>
                    <ArrowRight className={`h-4 w-4 shrink-0 transition ${active === i ? 'translate-x-0 text-saffron-300' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div key={d.slug} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="relative h-56 sm:h-64">
                <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-60 mix-blend-multiply`} />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-xs uppercase tracking-widest text-white/80">{d.hod ? `${d.hod} · ${d.hodDesignation}` : 'Department'}</p>
                  <h3 className="font-display text-2xl font-bold">{d.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-navy-100/85">{d.description}</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-saffron-300">Programmes</p>
                    <ul className="mt-2 space-y-1 text-sm text-navy-100">{d.programs.map((p) => <li key={p}>• {p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-saffron-300">Focus areas</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">{d.focus.map((f) => <span key={f} className="rounded-md bg-white/10 px-2 py-1 text-xs">{f}</span>)}</div>
                  </div>
                </div>
                <Link to={`/departments/${d.slug}`} className="btn btn-accent mt-6">Explore department <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
