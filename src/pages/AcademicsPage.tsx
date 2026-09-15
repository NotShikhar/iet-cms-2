import { ArrowUpRight, CalendarDays, FileText, ListChecks, Table2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCms } from '../cms/store'
import { programs } from '../data/departments'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'

const resources = [
  { t: 'Academic Calendar', d: 'Institute calendar 2026-27, revised 2025-26 calendar and the AICTE academic calendar.', to: '/page/academic-calendar', I: CalendarDays },
  { t: 'Class Time Table', d: 'Section-wise B.E./B.Tech time tables for all branches; live time tables at timetable.ietdavv.edu.in.', to: '/page/class-time-table', I: Table2 },
  { t: 'Schemes & Syllabus (CBCS)', d: 'B.Tech I Year scheme 2025, B.Design, CSBS and semester-wise schemes for all branches.', to: '/page/syllabus', I: FileText },
  { t: 'Results', d: 'Examination results May–June 2026 for all years, EX and M.Tech dissertation results.', to: '/page/results', I: ListChecks },
  { t: 'Roll Lists', d: 'B.Tech I Year and Lateral Entry roll lists 2026-27; section lists 2025-26.', to: '/page/roll-list', I: ListChecks },
  { t: 'Project Documents', d: 'Internship and project report formats, SRS/SDS templates, dos & don’ts for B.E. IV year.', to: '/page/project-documents', I: FileText },
  { t: 'Program Outcomes', d: 'Graduate attributes and programme outcomes of the institute.', to: '/page/program-outcomes', I: ListChecks },
  { t: 'Student Feedback', d: 'Department-wise feedback reports and action-taken reports (Feb–May 2024).', to: '/page/student-feedback', I: FileText },
  { t: 'E-Books & Spoken Tutorial', d: 'McGraw Hill and Wiley e-book libraries; IIT Bombay spoken tutorial training.', to: '/page/e-books', I: FileText },
]

export default function AcademicsPage() {
  const { content } = useCms()
  const examNotices = content.notices.filter((n) => n.published && n.category === 'Examination').slice(0, 6)
  return (
    <>
      <PageHero eyebrow="Academics" title="Programmes, calendar and curriculum." description="Academically autonomous programmes under the Faculty of Engineering of DAVV with a flexible Choice Based Credit System." crumbs={[{ label: 'Academics' }]} image="/media/ietnew/PV03_S_31_2-scaled.jpg" />

      <section className="py-16">
        <div className="container-x">
          <SectionHeader eyebrow="Programmes Offered" title="Choose your path." description="As published under Academics → Programs on the institute website." />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <StaggerItem key={p.title}>
                <div className="card card-hover flex h-full flex-col p-6">
                  <span className="chip w-fit">{p.level}</span>
                  <h3 className="font-display mt-4 text-2xl font-bold text-ink">{p.title}</h3>
                  <p className="text-sm text-slate-500">{p.duration} · {p.count}</p>
                  <ul className="mt-4 space-y-1 text-sm text-slate-700">{p.items.map((i) => <li key={i}>• {i}</li>)}</ul>
                  <p className="mt-auto pt-4 text-sm text-slate-500">{p.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="resources" className="bg-mist py-16 scroll-mt-28">
        <div className="container-x">
          <SectionHeader eyebrow="Academic Resources" title="Everything students need, in one place." />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <StaggerItem key={r.t}>
                <Link to={r.to} className="card card-hover block h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-600"><r.I className="h-5 w-5" /></span>
                  <h3 className="font-display mt-4 flex items-center justify-between text-lg font-bold text-ink">{r.t}<ArrowUpRight className="h-4 w-4 text-slate-400" /></h3>
                  <p className="mt-2 text-sm text-slate-600">{r.d}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Examination" title="Latest examination notices" />
            <Reveal className="card mt-8 divide-y divide-line">
              {examNotices.map((n) => (
                <a key={n.id} href={n.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-4 hover:bg-mist">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span className="text-sm font-medium text-ink">{n.title}</span>
                  <span className="ml-auto shrink-0 text-xs text-slate-500">{n.date}</span>
                </a>
              ))}
            </Reveal>
            <Link to="/notices" className="btn btn-secondary mt-4">All notices</Link>
          </div>
          <div>
            <SectionHeader eyebrow="Academic Calendar 2026-27" title="Session at a glance" />
            <Reveal className="mt-8">
              <Link to="/page/academic-calendar" className="card block overflow-hidden">
                <img src="/media/main/Academic_Calendar_2026-27.jpg" alt="Academic Calendar 2026-27" className="w-full" loading="lazy" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
