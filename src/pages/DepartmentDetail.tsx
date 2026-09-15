import { ArrowLeft, BookOpen, Mail, UserRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCms } from '../cms/store'
import { departments } from '../data/departments'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'

export default function DepartmentDetail() {
  const { slug } = useParams()
  const d = departments.find((x) => x.slug === slug)
  const { content } = useCms()
  if (!d) return <Navigate to="/departments" replace />
  const related = content.news.filter((n) => n.tag.toLowerCase().includes(d.short.split(' ')[0].toLowerCase()) || n.tag.toLowerCase().includes(d.name.split(' ')[0].toLowerCase())).slice(0, 3)

  return (
    <>
      <PageHero eyebrow={`Department · ${d.code}`} title={d.name} description={d.tagline} crumbs={[{ label: 'Departments', href: '/departments' }, { label: d.short }]} image={d.image} />

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <p className="text-lg leading-relaxed text-slate-700">{d.description}</p>
            </Reveal>

            <div className="mt-14">
              <SectionHeader eyebrow="Programmes" title="Programmes offered" />
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                {d.programs.map((p) => (
                  <StaggerItem key={p}>
                    <div className="card flex items-center gap-3 p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-600"><BookOpen className="h-4 w-4" /></span>
                      <span className="font-semibold text-ink">{p}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="mt-14">
              <SectionHeader eyebrow="Focus Areas" title="Teaching & research focus" />
              <div className="mt-6 flex flex-wrap gap-2">{d.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
            </div>

            {d.faculty && d.faculty.length > 0 && (
              <div className="mt-14">
                <SectionHeader eyebrow="Faculty" title="Faculty members" description="As listed in the IET-DAVV Institute Profile and official notices. The full faculty directory is maintained by the institute." />
                <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                  {d.faculty.map((n) => (
                    <StaggerItem key={n}>
                      <div className="card flex items-center gap-3 p-4">
                        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${d.color} text-white`}><UserRound className="h-5 w-5" /></div>
                        <p className="text-sm font-semibold text-ink">{n}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}

            {related.length > 0 && (
              <div className="mt-14">
                <SectionHeader eyebrow="IET Times" title="Department news" />
                <Stagger className="mt-6 grid gap-3">
                  {related.map((n) => (
                    <StaggerItem key={n.id}>
                      <a href={n.url} target="_blank" rel="noreferrer" className="card card-hover flex gap-4 p-4">
                        {n.image && <img src={n.image} alt="" loading="lazy" className="h-20 w-28 shrink-0 rounded-lg object-cover" />}
                        <div className="min-w-0"><p className="text-xs font-semibold text-navy-600">{n.tag} · {n.date}</p><p className="font-display font-bold text-ink">{n.title}</p><p className="mt-1 line-clamp-2 text-sm text-slate-600">{n.excerpt}</p></div>
                      </a>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:col-span-4">
            <Reveal>
              <div className={`rounded-3xl bg-gradient-to-br ${d.color} p-6 text-white shadow-lift`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Head of Department</p>
                <p className="font-display mt-1 text-xl font-bold">{d.hod ?? 'Office of the Head'}</p>
                {d.hodDesignation && <p className="text-sm text-white/90">{d.hodDesignation}</p>}
                <p className="mt-3 flex items-center gap-2 text-sm text-white/90"><Mail className="h-4 w-4" /> director@ietdavv.edu.in</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Useful links</p>
                <ul className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                  <li><Link to="/page/syllabus" className="hover:text-navy-600">Schemes & Syllabus (CBCS)</Link></li>
                  <li><Link to="/page/class-time-table" className="hover:text-navy-600">Class Time Table</Link></li>
                  <li><Link to="/page/results" className="hover:text-navy-600">Results</Link></li>
                  <li><Link to="/page/faculty-research" className="hover:text-navy-600">Faculty & Research</Link></li>
                  <li><Link to="/page/student-feedback" className="hover:text-navy-600">Student Feedback Reports</Link></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Other Departments</p>
                <ul className="mt-3 space-y-2">
                  {departments.filter((x) => x.slug !== d.slug).map((x) => (
                    <li key={x.slug}><Link to={`/departments/${x.slug}`} className="text-sm font-medium text-slate-700 hover:text-navy-600">{x.name}</Link></li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Link to="/departments" className="btn btn-secondary w-full"><ArrowLeft className="h-4 w-4" /> All departments</Link>
          </aside>
        </div>
      </section>
    </>
  )
}
