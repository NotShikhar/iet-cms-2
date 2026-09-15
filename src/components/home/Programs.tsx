import { ArrowUpRight, Clock, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { programs } from '../../data/departments'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Reveal'

export function Programs() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Programmes Offered" title="From first-year fundamentals to doctoral research." description="Nine full-time B.Tech programmes, a part-time B.Tech, seven M.Tech programmes, M.Sc. Applied Mathematics and Ph.D. in eight areas." />
          <Link to="/academics" className="btn btn-secondary shrink-0">Academics <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <StaggerItem key={p.title} className={i === 0 ? 'lg:row-span-2' : ''}>
              <Link to="/academics" className={`card card-hover group flex h-full flex-col p-6 ${i === 0 ? 'bg-gradient-to-br from-navy-600 to-navy-800 !border-navy-700 text-white' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className={`chip ${i === 0 ? '!border-white/20 !bg-white/10 !text-white' : ''}`}>{p.level}</span>
                  <ArrowUpRight className={`h-5 w-5 ${i === 0 ? 'text-saffron-300' : 'text-slate-400 group-hover:text-navy-600'}`} />
                </div>
                <h3 className={`font-display mt-5 text-2xl font-bold ${i === 0 ? 'text-white' : 'text-ink'}`}>{p.title}</h3>
                <div className={`mt-2 flex flex-wrap gap-4 text-xs font-medium ${i === 0 ? 'text-navy-100' : 'text-slate-500'}`}>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.duration}</span>
                  <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" />{p.count}</span>
                </div>
                <ul className={`mt-5 flex flex-wrap gap-2 ${i === 0 ? 'mt-8' : ''}`}>
                  {p.items.map((it) => (
                    <li key={it} className={`rounded-lg px-2.5 py-1 text-xs font-medium ${i === 0 ? 'bg-white/10 text-white' : 'bg-mist text-slate-700'}`}>{it}</li>
                  ))}
                </ul>
                <p className={`mt-auto pt-5 text-sm leading-relaxed ${i === 0 ? 'text-navy-100/90' : 'text-slate-500'}`}>{p.note}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
