import { ArrowUpRight, GraduationCap, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { departments } from '../data/departments'
import { PageHero } from '../components/ui/PageHero'
import { Stagger, StaggerItem } from '../components/ui/Reveal'

export default function DepartmentsPage() {
  return (
    <>
      <PageHero eyebrow="Departments" title="Eight engineering & science departments." description="IET-DAVV has eight departments with different engineering & science streams and more than 71 faculty members including regular, visiting and ad-hoc faculty." crumbs={[{ label: 'Departments' }]} image="/media/ietnew/PV02_S_8-1-scaled.jpg" />
      <section className="py-16">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.slug}>
                <Link to={`/departments/${d.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-70 mix-blend-multiply`} />
                    <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-navy-700">{d.code}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-ink group-hover:text-navy-700">{d.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{d.tagline}</p>
                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                      {d.hod && <p className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5" /> {d.hod}, {d.hodDesignation}</p>}
                      <p className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> {d.programs.length} programme{d.programs.length > 1 ? 's' : ''}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-navy-600">
                      Explore <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
