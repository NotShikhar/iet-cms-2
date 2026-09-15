import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, FileText, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { fmtDate, useCms } from '../cms/store'
import { catColor } from '../components/home/NoticesEvents'
import { PageHero } from '../components/ui/PageHero'

const cats = ['All', 'Examination', 'Admission', 'Academic', 'Placement', 'Tender', 'Event', 'General'] as const

export default function NoticesPage() {
  const { content } = useCms()
  const [cat, setCat] = useState<(typeof cats)[number]>('All')
  const [q, setQ] = useState('')
  const list = useMemo(() => content.notices.filter((n) => n.published && (cat === 'All' || n.category === cat) && n.title.toLowerCase().includes(q.toLowerCase())), [content.notices, cat, q])
  const news = content.news.filter((n) => n.published).slice(0, 6)

  return (
    <>
      <PageHero eyebrow="Notice Board" title="Notices, circulars & tenders." description="Official notices of IET-DAVV, including the institute notice board (notices.ietdavv.edu.in), admission circulars, examination notices and tenders." crumbs={[{ label: 'Notices' }]} />
      <section className="py-12">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {cats.map((c) => (
                  <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${cat === c ? 'bg-navy-600 text-white shadow-soft' : 'border border-line bg-white text-slate-600 hover:border-navy-300'}`}>{c}</button>
                ))}
              </div>
              <label className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notices" className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 sm:w-64" />
              </label>
            </div>

            <ul className="mt-6 space-y-3">
              <AnimatePresence mode="popLayout">
                {list.map((n) => (
                  <motion.li key={n.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <a href={n.url || '#'} target={n.url ? '_blank' : undefined} rel="noreferrer" className="card card-hover flex items-start gap-4 p-4 sm:p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-600"><FileText className="h-5 w-5" /></span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className={`rounded-md px-2 py-0.5 font-semibold ${catColor[n.category] ?? catColor.General}`}>{n.category}</span>
                          {n.isNew && <span className="rounded-md bg-saffron-400 px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">New</span>}
                          <span className="text-slate-500">{fmtDate(n.date)}</span>
                        </div>
                        <p className="mt-1.5 font-semibold text-ink">{n.title}</p>
                      </div>
                      {n.url && <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />}
                    </a>
                  </motion.li>
                ))}
              </AnimatePresence>
              {list.length === 0 && <li className="card p-10 text-center text-slate-500">No notices match your search.</li>}
            </ul>
            <p className="mt-6 text-xs text-slate-500">Complete archive: <a href="https://notices.ietdavv.edu.in/" target="_blank" rel="noreferrer" className="underline">notices.ietdavv.edu.in</a> · Examination notices: <a href="https://ietdavv.edu.in/ietnew/exam-notices/" target="_blank" rel="noreferrer" className="underline">ietdavv.edu.in/ietnew/exam-notices</a></p>
          </div>

          <aside className="lg:col-span-4">
            <h3 className="font-display text-lg font-bold text-ink">IET Times</h3>
            <div className="mt-4 space-y-3">
              {news.map((n) => (
                <a key={n.id} href={n.url} target="_blank" rel="noreferrer" className="card card-hover flex gap-3 p-3">
                  {n.image ? <img src={n.image} alt="" loading="lazy" className="h-16 w-20 shrink-0 rounded-lg object-cover" /> : <div className="h-16 w-20 shrink-0 rounded-lg bg-navy-50" />}
                  <div className="min-w-0"><p className="text-[11px] font-semibold text-navy-600">{n.tag} · {fmtDate(n.date)}</p><p className="line-clamp-2 text-sm font-semibold text-ink">{n.title}</p></div>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
