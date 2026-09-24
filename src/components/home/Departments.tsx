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
    <section className="relative overflow-hidden bg-navy-950 py-14 text-white sm:py-20 lg:py-28">
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-navy-600/40 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow !text-saffron-300">Departments</span>
          <h2 className="font-display mt-3 text-[1.7rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">Eight departments. More than 71 faculty members.</h2>
          <p className="mt-3 text-[15px] text-navy-100/80 sm:mt-4 sm:text-lg">Engineering and science departments running B.Tech, M.Tech, M.Sc. and Ph.D. programmes.</p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* On phones the list is a horizontal strip so the detail card below stays in view when you tap */}
          <div className="lg:col-span-5">
            <ul className="scrollbar-none -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:block lg:space-y-1 lg:overflow-x-visible lg:pb-0">
              {departments.map((dep, i) => (
                <li key={dep.slug} className="shrink-0 snap-start lg:shrink lg:snap-align-none">
                  <button onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition lg:px-4 lg:py-3 ${active === i ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    <span className="flex items-center gap-2 lg:gap-3">
                      <span className={`grid h-8 w-11 shrink-0 place-items-center rounded-lg text-[11px] font-bold lg:h-9 lg:w-12 ${active === i ? 'bg-saffron-400 text-ink' : 'bg-white/10 text-navy-100'}`}>{dep.code}</span>
                      <span className="hidden lg:block">
                        <span className="block text-[15px] font-semibold">{dep.name}</span>
                        <span className="block text-xs text-navy-200/70">{dep.tagline}</span>
                      </span>
                    </span>
                    <ArrowRight className={`hidden h-4 w-4 shrink-0 transition lg:block ${active === i ? 'translate-x-0 text-saffron-300' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div key={d.slug} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur sm:rounded-3xl">
              <div className="relative h-44 sm:h-64">
                <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-60 mix-blend-multiply`} />
                <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5">
                  <p className="text-[11px] uppercase tracking-widest text-white/80 sm:text-xs">{d.hod ? `${d.hod} · ${d.hodDesignation}` : 'Department'}</p>
                  <h3 className="font-display text-lg font-bold leading-snug sm:text-2xl">{d.name}</h3>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[15px] text-navy-100/85 sm:text-base">{d.description}</p>
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
                <Link to={`/departments/${d.slug}`} className="btn btn-accent mt-6 w-full sm:w-auto">Explore department <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
