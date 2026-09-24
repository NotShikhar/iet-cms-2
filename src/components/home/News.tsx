import { ArrowRight, ArrowUpRight, Cpu, Plane, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fmtDate, useCms } from '../../cms/store'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function News() {
  const { content } = useCms()
  const news = content.news.filter((n) => n.published)
  const [lead, ...rest] = news
  const videos = content.videos.slice(0, 3)
  if (!lead) return null
  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
          <SectionHeader eyebrow="IET Times" title="News from the campus." description="Stories published by IET Times, the institute's news portal." />
          <a href="https://times.ietdavv.edu.in/" target="_blank" rel="noreferrer" className="btn btn-secondary w-full shrink-0 sm:w-auto">Read IET Times <ArrowUpRight className="h-4 w-4" /></a>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2">
          <Reveal>
            <a href={lead.url} target="_blank" rel="noreferrer" className="group relative block h-full min-h-[340px] overflow-hidden rounded-2xl bg-navy-900 sm:min-h-[420px] sm:rounded-3xl">
              {lead.image && <img src={lead.image} alt={lead.title} className="absolute inset-0 h-full w-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white sm:p-7">
                <span className="rounded-md bg-saffron-400 px-2 py-0.5 text-[11px] font-bold uppercase text-ink">{lead.tag}</span>
                <h3 className="font-display mt-3 text-xl font-bold leading-snug sm:text-2xl">{lead.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-navy-100/80">{lead.excerpt}</p>
                <p className="mt-3 text-xs text-navy-200">{fmtDate(lead.date)}</p>
              </div>
            </a>
          </Reveal>
          <Stagger className="flex flex-col gap-3 sm:gap-4">
            {rest.slice(0, 4).map((n) => (
              <StaggerItem key={n.id}>
                <a href={n.url} target="_blank" rel="noreferrer" className="card card-hover group flex gap-3 p-3 sm:gap-4 sm:p-4">
                  {n.image ? <img src={n.image} alt="" loading="lazy" className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-28 sm:w-40" /> : <div className="h-20 w-20 shrink-0 rounded-xl bg-navy-50 sm:h-28 sm:w-40" />}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 text-xs">
                      <span className="font-semibold text-navy-600">{n.tag}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{fmtDate(n.date)}</span>
                    </div>
                    <h3 className="font-display mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-ink group-hover:text-navy-700 sm:mt-1.5 sm:text-base">{n.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[13px] text-slate-600 sm:mt-1.5 sm:text-sm">{n.excerpt}</p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
          {[
            { Icon: Cpu, t: 'Chips to Startup (MeitY)', d: '₹95 lakh programme. ICs fabricated on 130nm (Tiny Tapeout) and 180nm SCL technology; implantable pacemaker chip iPACE developed.', to: '/page/research-projects' },
            { Icon: Plane, t: 'Drone & aeromodelling', d: 'NIDAR’26: AIR 3 in Business Pitch and AIR 14 overall. Drone Development Challenge 2025: AIR 7 (Regular Plane) and AIR 14 (Micro Plane).', to: '/page/aciie' },
            { Icon: Trophy, t: 'SAE mBAJA 2025', d: 'Team IET-DAVV recognised with the “Pride of MP” award for engineering design and team performance.', to: '/page/aciie' },
          ].map(({ Icon, t, d, to }) => (
            <StaggerItem key={t}>
              <Link to={to} className="card card-hover block h-full p-5 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-600"><Icon className="h-5 w-5" /></span>
                <h3 className="font-display mt-4 text-base font-bold text-ink sm:text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 sm:mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-white to-navy-50 p-6 sm:rounded-3xl sm:p-10 lg:p-12">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <div className="relative grid items-center gap-7 lg:grid-cols-2 lg:gap-8">
              <div>
                <span className="eyebrow">ACIIE · Innovation & Incubation</span>
                <h3 className="font-display mt-3 text-[1.45rem] font-bold leading-tight text-ink sm:text-3xl">Atal Centre for Innovation, Incubation & Entrepreneurship</h3>
                <p className="mt-3 text-[15px] text-slate-600 sm:text-base">ACIIE hosts the Institute’s Innovation Council and the student-run E-Cell, and invites innovative project proposals from students for incubation support.</p>
                <Link to="/page/aciie" className="btn btn-primary mt-6 w-full sm:w-auto">About ACIIE <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {[['800+', 'Participants, Pre-DevFest 2025 (GDGoC)'], ['400+', 'Active GDSC members'], ['AIR 3', 'NIDAR’26 Business Pitch']].map(([v, l]) => (
                  <div key={l} className="glass flex items-center gap-3 rounded-2xl p-4 sm:flex-col sm:gap-0 sm:text-center">
                    <p className="font-display shrink-0 text-2xl font-extrabold text-navy-700">{v}</p>
                    <p className="text-xs leading-snug text-slate-500 sm:mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {videos.length > 0 && (
          <Reveal className="mt-10 sm:mt-16">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">Live@IET</span>
                <h3 className="font-display mt-2 text-xl font-bold text-ink sm:text-2xl">From the institute's YouTube channel</h3>
              </div>
              <a href={content.settings.social.youtube} target="_blank" rel="noreferrer" className="-m-2 shrink-0 p-2 text-sm font-semibold text-navy-600 hover:underline">All videos</a>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <div key={v.id} className="card overflow-hidden">
                  <div className="aspect-video">
                    <iframe title={v.title} src={`https://www.youtube-nocookie.com/embed/${v.id}`} className="h-full w-full" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
                  </div>
                  <p className="p-4 text-sm font-semibold text-ink">{v.title}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
