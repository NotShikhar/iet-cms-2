import { ArrowRight, Bell, CalendarDays, Clock, FileText, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fmtDate, useCms } from '../../cms/store'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export const catColor: Record<string, string> = {
  Academic: 'bg-navy-50 text-navy-700',
  Examination: 'bg-rose-50 text-rose-700',
  Admission: 'bg-emerald-50 text-emerald-700',
  Tender: 'bg-slate-100 text-slate-700',
  Placement: 'bg-violet-50 text-violet-700',
  Event: 'bg-saffron-50 text-saffron-600',
  General: 'bg-sky-50 text-sky-700',
}

export function NoticesEvents() {
  const { content } = useCms()
  const notices = content.notices.filter((n) => n.published).slice(0, 10)
  const events = content.events.filter((e) => e.published).slice(0, 5)

  return (
    <section className="bg-mist py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Notice Board" title="Notices, circulars and upcoming events." description="Official communication from the institute: examination schedules, admission circulars, Ph.D. notices, tenders and events." />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card h-full overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h3 className="font-display flex items-center gap-2 text-lg font-bold text-ink"><Bell className="h-5 w-5 text-saffron-500" /> Latest Notices</h3>
                <Link to="/notices" className="text-sm font-semibold text-navy-600 hover:underline">View all</Link>
              </div>
              <ul className="max-h-[520px] divide-y divide-line overflow-y-auto">
                {notices.map((n) => (
                  <li key={n.id}>
                    <a href={n.url || '#'} target={n.url ? '_blank' : undefined} rel="noreferrer" className="group flex items-start gap-4 px-6 py-4 transition hover:bg-mist">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-600"><FileText className="h-4 w-4" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${catColor[n.category] ?? catColor.General}`}>{n.category}</span>
                          {n.isNew && <span className="rounded-md bg-saffron-400 px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">New</span>}
                          <span className="text-xs text-slate-500">{fmtDate(n.date)}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-800 group-hover:text-navy-700">{n.title}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="card h-full overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h3 className="font-display flex items-center gap-2 text-lg font-bold text-ink"><CalendarDays className="h-5 w-5 text-teal-500" /> Events</h3>
                <Link to="/page/academic-calendar" className="text-sm font-semibold text-navy-600 hover:underline">Calendar</Link>
              </div>
              <ul className="divide-y divide-line">
                {events.map((e) => {
                  const d = new Date(e.date)
                  return (
                    <li key={e.id} className="group flex gap-4 px-6 py-4 transition hover:bg-mist">
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-600 text-white">
                        <span className="font-display text-xl font-bold leading-none">{d.getDate()}</span>
                        <span className="text-[11px] font-medium uppercase">{d.toLocaleString('en', { month: 'short' })}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600">{e.type}</span>
                        <p className="text-sm font-semibold text-ink">{e.url ? <a href={e.url} target="_blank" rel="noreferrer" className="hover:text-navy-700">{e.title}</a> : e.title}</p>
                        <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-500">
                          {e.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>}
                          {e.venue && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="px-6 py-4">
                <Link to="/campus-life" className="btn btn-secondary w-full">Campus life <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
