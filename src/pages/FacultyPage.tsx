import { ArrowUpRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FACULTY_PORTAL, facultyFor } from '../cms/faculty'
import { useCms } from '../cms/store'
import { departments } from '../data/departments'
import { FacultyCard } from '../components/ui/FacultyCard'
import { FacultyProfileModal, useOpenFacultyProfile } from '../components/ui/FacultyProfileModal'
import { PageHero } from '../components/ui/PageHero'

const HEADS = 'heads'

export default function FacultyPage() {
  const { content } = useCms()
  const openProfile = useOpenFacultyProfile()
  const all = content.faculty
  const [params, setParams] = useSearchParams()
  const tab = params.get('dept') ?? HEADS
  const [q, setQ] = useState('')

  const tabs = useMemo(
    () => [
      { key: HEADS, label: 'Director & Heads', count: all.filter((m) => m.responsibility).length },
      ...departments.map((d) => ({ key: d.slug, label: d.name, count: all.filter((m) => m.departments.includes(d.slug)).length })),
    ],
    [all],
  )

  const query = q.trim().toLowerCase()
  // Searching looks across the whole directory, not just the open tab
  const list = query
    ? all.filter((m) => `${m.name} ${m.designation} ${m.responsibility ?? ''}`.toLowerCase().includes(query))
    : tab === HEADS
      ? all.filter((m) => m.responsibility)
      : facultyFor(all, tab)
  const dept = departments.find((d) => d.slug === tab)

  return (
    <>
      <FacultyProfileModal />
      <PageHero
        eyebrow="Academics"
        title="Faculty directory"
        description={`${all.length} faculty members across ${departments.length} departments — teaching, research and institute leadership.`}
        crumbs={[{ label: 'Academics', href: '/academics' }, { label: 'Faculty' }]}
        image="/media/ietnew/PV03_S_31_2-scaled.jpg"
      />

      <section className="py-12 sm:py-16">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search faculty by name" className="h-11 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100" />
            </label>
            <a href={FACULTY_PORTAL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:underline">
              Detailed profiles on One IET <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {!query && (
            <div className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-2 pb-1 sm:flex-wrap">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setParams(t.key === HEADS ? {} : { dept: t.key }, { replace: true })}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${tab === t.key ? 'border-navy-600 bg-navy-600 text-white' : 'border-line bg-white text-slate-700 hover:border-navy-300'}`}
                  >
                    {t.label}
                    <span className={`rounded-full px-1.5 text-[14px] ${tab === t.key ? 'bg-white/20' : 'bg-mist text-slate-500'}`}>{t.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-end justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-ink">
              {query ? `Results for “${q.trim()}”` : dept ? dept.name : 'Director & Heads'}
              <span className="ml-2 text-base font-medium text-slate-400">{list.length}</span>
            </h2>
            {dept && <Link to={`/departments/${dept.slug}`} className="text-sm font-semibold text-navy-600 hover:underline">About the department</Link>}
          </div>

          {list.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center text-sm text-slate-500">No faculty members found.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {list.map((m) => (
                <FacultyCard key={m.id} m={m} onOpen={openProfile} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
