import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useCms } from '../cms/store'
import { placementRate, placementStats, placementYears, recruiterGroups } from '../data/content'
import { Counter } from '../components/ui/Counter'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'

export default function PlacementsPage() {
  const { content } = useCms()
  const posters = content.media.filter((m) => m.tags.includes('placements')).slice(0, 9)
  const news = content.news.filter((n) => /placement|barclays|job|package/i.test(n.title)).slice(0, 3)
  return (
    <>
      <PageHero eyebrow="Training & Placement" title="Careers that start on campus." description="The Centralized Placement Cell (Prof. In-charge: Dr. Govind Maheshwari) runs campus recruitment, pre-placement training and alumni mentoring. Placement season 2026-27 opened in July with around 90 offers by August, and packages of ₹27 lakh and ₹34 lakh." crumbs={[{ label: 'Placements' }]} image="/media/main/IIIC/P1.jpg" />

      <section className="py-16">
        <div className="container-x">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {placementStats.map((s) => (
              <StaggerItem key={s.label}><div className="card p-6 text-center"><p className="font-display text-4xl font-extrabold text-navy-700"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} /></p><p className="mt-1 text-sm text-slate-500">{s.label}</p></div></StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14 grid min-w-0 gap-6 lg:grid-cols-2">
            <Reveal className="min-w-0">
              <div className="card h-full min-w-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Institute Profile</p>
                <h3 className="font-display text-xl font-bold text-ink">Placement details</h3>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-navy-50 text-left text-xs font-semibold uppercase tracking-wider text-navy-800"><tr><th className="px-4 py-2.5">Session</th><th className="px-4 py-2.5">Companies</th><th className="px-4 py-2.5">Offers</th><th className="px-4 py-2.5">Highest CTC</th><th className="px-4 py-2.5">Average CTC</th></tr></thead>
                    <tbody className="divide-y divide-line">
                      {placementYears.map((y) => (
                        <tr key={y.year}><td className="px-4 py-3 font-semibold text-ink">{y.year}</td><td className="px-4 py-3">{y.companies}</td><td className="px-4 py-3">{y.offers}</td><td className="px-4 py-3">{y.highest} LPA</td><td className="px-4 py-3">{y.average} LPA</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-slate-500">Source: IET-DAVV Institute Profile. Reported 2026 season data (IET Times, Aug 2026): 498 offers from 62+ companies, B.Tech average ₹7.72 LPA, highest ₹22 LPA; earlier seasons reported a highest package of ₹57 LPA.</p>
                <a href="/media/main/downloads/Placement_IET.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary mt-4"><FileText className="h-4 w-4" /> Summary of Placement – Batch 2025-26 (PDF)</a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card h-full p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Placement percentage</p>
                <h3 className="font-display text-xl font-bold text-ink">85% → 90%, targeting 100%</h3>
                <div className="mt-8 flex h-48 items-end gap-6">
                  {placementRate.map((p, i) => (
                    <motion.div
                      key={p.session}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <span className="text-sm font-bold text-navy-700">{p.rate}%</span>
                      <div className="flex w-full flex-1 items-end">
                        <motion.div
                          variants={{ hidden: { height: '0%' }, show: { height: `${p.rate}%` } }}
                          transition={{ duration: 0.9, delay: i * 0.1 }}
                          className="w-full rounded-t-xl bg-gradient-to-t from-navy-600 to-navy-400"
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-500">{p.session}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-600">To reach 100% placement, the institute launched <strong>Career Disha</strong> (industry and alumni mentoring in around 10 specialised batches for ~1,800 students) and <strong>Career Siddhi</strong> (eight weekend sessions over one month covering technical skills, group discussion, HR interviews and résumé building).</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Major Recruiters" title="Companies that hire from IET." description="As listed in the IET-DAVV Institute Profile." />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
            {recruiterGroups.map((g) => (
              <StaggerItem key={g.title}>
                <div className="card h-full p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">{g.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{g.items.map((r) => <span key={r} className="rounded-lg border border-line bg-mist px-3 py-1.5 text-sm font-semibold text-slate-700">{r}</span>)}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {posters.length > 0 && (
        <section className="py-16">
          <div className="container-x">
            <SectionHeader eyebrow="Centralized Placement Cell" title="Congratulating our selects." description="Placement highlights published by the Centralized Placement Cell on the institute website." />
            <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {posters.map((m) => (
                <StaggerItem key={m.path}>
                  <a href={m.path} target="_blank" rel="noreferrer" className="card block overflow-hidden"><img src={m.path} alt={m.alt} loading="lazy" className="aspect-[16/10] w-full object-cover" /></a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="bg-mist py-16">
          <div className="container-x">
            <SectionHeader eyebrow="IET Times" title="Placement news" />
            <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
              {news.map((n) => (
                <StaggerItem key={n.id}>
                  <a href={n.url} target="_blank" rel="noreferrer" className="card card-hover block h-full overflow-hidden">
                    {n.image && <img src={n.image} alt="" loading="lazy" className="h-40 w-full object-cover" />}
                    <div className="p-5"><p className="text-xs font-semibold text-navy-600">{n.date}</p><h3 className="font-display mt-1 font-bold text-ink">{n.title}</h3><p className="mt-2 line-clamp-3 text-sm text-slate-600">{n.excerpt}</p></div>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          {[
            ['Training', 'Pre-placement training, aptitude and soft-skill preparation through Career Disha and Career Siddhi with industry professionals, experts and IET alumni.'],
            ['Internships & PPOs', 'Eight students received confirmed Pre-Placement Offers from Barclays in August 2026 after their internship and recruitment journey.'],
            ['For Recruiters', 'Write to the Director’s office at director@ietdavv.edu.in or call 0731-2361116 / 2361117 to schedule a campus drive. Recruitment continues through February–March.'],
          ].map(([t, d]) => (
            <Reveal key={t}><div className="card h-full p-6"><h3 className="font-display text-lg font-bold text-ink">{t}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p></div></Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
