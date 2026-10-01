import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Contact, Download, Mail, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router-dom'
import { useCms } from '../../cms/store'
import type { FacultyMember } from '../../cms/types'
import { departments } from '../../data/departments'
import { FacultyPhoto } from './FacultyCard'

type Cell = { text: string; align?: 'center' | 'right' | 'justify' }
type Block = { type: 'paragraph'; text: string; align?: Cell['align'] } | { type: 'table'; rows: Cell[][] }
type Profile = { id: string; departments?: string; joined?: string; cv?: string; sections: { title: string; blocks: Block[] }[] }

const PARAM = 'profile'

/** Opens the profile popup for a member by adding ?profile=<id> to the current URL (so it can be shared). */
export function useOpenFacultyProfile() {
  const [, setParams] = useSearchParams()
  return (id: string) =>
    setParams((p) => {
      const next = new URLSearchParams(p)
      next.set(PARAM, id)
      return next
    })
}

/** Place once on a page; shows the member named in ?profile=. */
export function FacultyProfileModal() {
  const [params, setParams] = useSearchParams()
  const { content } = useCms()
  const id = params.get(PARAM)
  const member = id ? content.faculty.find((m) => m.id === id) : undefined

  const close = () =>
    setParams((p) => {
      const next = new URLSearchParams(p)
      next.delete(PARAM)
      return next
    })

  useEffect(() => {
    if (!member) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  })

  // Portal to <body>: page-transition transforms on ancestors would otherwise break position: fixed
  return createPortal(
    <AnimatePresence>
      {member && (
        <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-stretch justify-center bg-navy-950/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={close}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} – faculty profile`}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden bg-white shadow-lift sm:max-h-[90vh] sm:rounded-3xl"
          >
            <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-navy-950 to-navy-700 px-5 py-4 text-white">
              <p className="font-display flex items-center gap-2 text-lg font-bold"><Contact className="h-5 w-5" /> Faculty Profile</p>
              <button onClick={close} aria-label="Close" autoFocus className="grid h-9 w-9 place-items-center rounded-lg border border-white/25 hover:bg-white/10"><X className="h-4 w-4" /></button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
              <ProfileBody key={member.id} m={member} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ProfileBody({ m }: { m: FacultyMember }) {
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'none'; profile?: Profile }>({ status: 'loading' })

  useEffect(() => {
    let live = true
    fetch(`/faculty-profiles/${m.id}.json`)
      .then((r) => (r.ok && r.headers.get('content-type')?.includes('json') ? r.json() : null))
      .then((p: Profile | null) => live && setState(p ? { status: 'ready', profile: p } : { status: 'none' }))
      .catch(() => live && setState({ status: 'none' }))
    return () => {
      live = false
    }
  }, [m.id])

  const deptNames = m.departments.map((s) => departments.find((d) => d.slug === s)?.name ?? s).join(', ')
  const p = state.profile

  return (
    <>
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{m.name}</h2>
          <p className="mt-1 text-slate-500">{m.designation}</p>
          {deptNames && <p className="mt-1 font-semibold text-navy-600">{deptNames}</p>}
          {m.responsibility && (
            <p className="mt-3 inline-flex items-start gap-1.5 rounded-lg bg-navy-50 px-2.5 py-1.5 text-sm font-semibold text-navy-700"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />{m.responsibility}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {m.email && <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 font-medium text-navy-600 hover:underline"><Mail className="h-4 w-4" />{m.email}</a>}
            {p?.cv && <a href={p.cv} className="flex items-center gap-1.5 font-medium text-navy-600 hover:underline"><Download className="h-4 w-4" />Download CV (.docx)</a>}
          </div>
        </div>
        <FacultyPhoto m={m} className="h-40 w-32 shrink-0 rounded-2xl border border-line text-3xl sm:h-48 sm:w-40" />
      </div>

      <div className="mt-8">
        {state.status === 'loading' && <p className="py-10 text-center text-sm text-slate-500">Loading profile…</p>}
        {state.status !== 'loading' && !p?.sections.length && (
          <p className="rounded-2xl border border-dashed border-line py-10 text-center text-sm text-slate-500">A detailed profile has not been published for this faculty member yet.</p>
        )}
        {p?.sections.map((s, i) => (
          <section key={i} className="mt-8 first:mt-0">
            <h3 className="font-display mb-3 text-lg font-bold text-ink">{s.title}</h3>
            <div className="space-y-2">
              {s.blocks.map((b, j) =>
                b.type === 'table' ? (
                  <ProfileTable key={j} rows={b.rows} />
                ) : (
                  <p key={j} className="text-[17px] leading-relaxed text-slate-700" style={{ textAlign: b.align }}>{b.text}</p>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

function ProfileTable({ rows }: { rows: Cell[][] }) {
  const cols = Math.max(...rows.map((r) => r.length))
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[480px] text-sm">
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => (
            <tr key={i} className={i === 0 ? 'bg-mist font-semibold text-ink' : 'text-slate-700'}>
              {Array.from({ length: cols }, (_, k) => (
                <td key={k} className="px-3 py-2.5 align-top" style={{ textAlign: r[k]?.align }}>{r[k]?.text ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
