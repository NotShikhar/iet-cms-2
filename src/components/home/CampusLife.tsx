import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { campusGallery, clubs, facilities } from '../../data/content'
import { Icon } from '../ui/Icon'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function CampusLife() {
  return (
    <section className="bg-mist py-14 sm:py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader align="center" eyebrow="Campus Life" title="Facilities for learning, living and building." description="Hostels for 700 students, department laboratories, the ACIIE incubation centre, sports facilities and access to the DAVV central library and auditorium." />

        <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {facilities.map((f) => (
            <StaggerItem key={f.title}>
              <Link to={f.to} className="card card-hover group block overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  <span className="glass absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl text-navy-700"><Icon name={f.icon} className="h-5 w-5" /></span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-navy-600" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.text}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 sm:mt-14">
          <div className="card p-5 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">Student Bodies</span>
                <h3 className="font-display mt-2 text-xl font-bold text-ink sm:text-2xl">Clubs, cells and communities</h3>
              </div>
              <Link to="/campus-life" className="btn btn-secondary w-full sm:w-auto">Explore student life <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
              {clubs.map((c) => (
                <Link key={c.name} to={c.to} className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-navy-200 hover:bg-mist">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg text-xs font-bold ${c.color}`}>{c.name.slice(0, 2).toUpperCase()}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{c.name}</p>
                    <p className="truncate text-xs text-slate-500">{c.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 sm:mt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Campus in pictures</span>
              <h3 className="font-display mt-2 text-xl font-bold text-ink sm:text-2xl">Photographs from the institute</h3>
            </div>
            <Link to="/campus-life" className="btn btn-secondary w-full sm:w-auto">Full gallery <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {campusGallery.map((g, i) => (
              <figure key={g.image} className={`overflow-hidden rounded-2xl border border-line bg-white ${i === 0 || i === 5 ? 'col-span-2' : ''}`}>
                <img src={g.image} alt={g.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
