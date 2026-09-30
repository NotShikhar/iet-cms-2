import { CalendarClock, Download, FileText, Search } from 'lucide-react'
import { useState } from 'react'
import { fmtDate, tenderStatus, useCms } from '../cms/store'
import type { Tender } from '../cms/types'
import { PageHero } from '../components/ui/PageHero'

const FILTERS = ['All', 'Open', 'Closed'] as const

export default function TendersPage() {
  const { content } = useCms()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [q, setQ] = useState('')
  const all = content.tenders.filter((t) => t.published).sort((a, b) => b.date.localeCompare(a.date))
  const openCount = all.filter((t) => tenderStatus(t) === 'Open').length
  const list = all.filter(
    (t) => (filter === 'All' || tenderStatus(t) === filter) && `${t.title} ${t.refNo ?? ''} ${t.description ?? ''}`.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <>
      <PageHero
        eyebrow="Administration"
        title="Tender notifications."
        description="Tenders and close tender enquiries published by the Institute of Engineering & Technology, DAVV. Download the tender document for terms, specifications and submission details."
        crumbs={[{ label: 'Tenders' }]}
      />
      <section className="py-12">
        <div className="container-x max-w-5xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${filter === f ? 'bg-navy-600 text-white shadow-soft' : 'border border-line bg-white text-slate-600 hover:border-navy-200'}`}>
                  {f}
                  {f === 'Open' && openCount > 0 && <span className="ml-1.5 rounded-full bg-emerald-500 px-1.5 text-[10px] text-white">{openCount}</span>}
                </button>
              ))}
            </div>
            <label className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tenders" className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 sm:w-64" />
            </label>
          </div>

          {list.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center text-sm text-slate-500">
              {filter === 'Open' ? 'There are no open tenders at the moment.' : 'No tenders found.'}
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {list.map((t) => <TenderRow key={t.id} t={t} />)}
            </ul>
          )}
          <p className="mt-8 text-xs text-slate-500">For queries about a tender, contact the Office of the Director, IET-DAVV, Khandwa Road, Indore.</p>
        </div>
      </section>
    </>
  )
}

function TenderRow({ t }: { t: Tender }) {
  const status = tenderStatus(t)
  return (
    <li className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-600"><FileText className="h-5 w-5" /></span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {status && <span className={`rounded-md px-2 py-0.5 font-semibold ${status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{status}</span>}
          <span className="text-slate-500">Published {fmtDate(t.date)}</span>
          {t.refNo && <span className="text-slate-500">· Ref. {t.refNo}</span>}
        </div>
        <p className="mt-1.5 font-semibold text-ink">{t.title}</p>
        {t.description && <p className="mt-1 text-sm text-slate-600">{t.description}</p>}
        {t.lastDate && (
          <p className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${status === 'Open' ? 'text-saffron-600' : 'text-slate-500'}`}>
            <CalendarClock className="h-3.5 w-3.5" /> Last date for submission: {fmtDate(t.lastDate)}
          </p>
        )}
      </div>
      {t.url && (
        <a href={t.url} target="_blank" rel="noreferrer" className="btn btn-secondary shrink-0 !py-2 text-xs">
          <Download className="h-4 w-4" /> Tender document
        </a>
      )}
    </li>
  )
}
