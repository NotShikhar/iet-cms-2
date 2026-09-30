import { BadgeCheck, Mail } from 'lucide-react'
import { useState } from 'react'
import type { FacultyMember } from '../../cms/types'

const initials = (name: string) =>
  name
    .replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s+/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export function FacultyPhoto({ m, className = '' }: { m: FacultyMember; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!m.photo || failed)
    return <div className={`grid place-items-center bg-gradient-to-br from-navy-500 to-navy-700 font-display font-bold text-white ${className}`}>{initials(m.name)}</div>
  return <img src={m.photo} alt={m.name} loading="lazy" onError={() => setFailed(true)} className={`object-cover object-top ${className}`} />
}

export function FacultyCard({ m, onOpen }: { m: FacultyMember; onOpen?: (id: string) => void }) {
  return (
    <div className="card card-hover group flex h-full flex-col overflow-hidden">
      <button type="button" onClick={() => onOpen?.(m.id)} disabled={!onOpen} className="flex flex-1 flex-col text-left disabled:cursor-default" aria-label={`View full profile of ${m.name}`}>
        <span className="block w-full overflow-hidden">
          <FacultyPhoto m={m} className="aspect-[4/5] w-full text-3xl transition duration-300 group-hover:scale-[1.03]" />
        </span>
        <span className="flex flex-1 flex-col px-4 pt-4">
          <span className="font-display font-bold leading-snug text-ink group-hover:text-navy-700">{m.name}</span>
          <span className="text-sm text-slate-500">{m.designation}</span>
          {m.responsibility && (
            <span className="mt-2 flex items-start gap-1.5 rounded-lg bg-navy-50 px-2 py-1.5 text-xs font-semibold text-navy-700">
              <BadgeCheck className="mt-px h-3.5 w-3.5 shrink-0" />
              {m.responsibility}
            </span>
          )}
          {onOpen && <span className="mt-2 text-xs font-semibold text-saffron-600">View full profile →</span>}
        </span>
      </button>
      {m.email ? (
        <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 break-all px-4 pb-4 pt-2 text-xs font-medium text-navy-600 hover:underline">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          {m.email}
        </a>
      ) : (
        <span className="pb-4" />
      )}
    </div>
  )
}
