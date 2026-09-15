import { ArrowRight, Megaphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fmtDate, useCms } from '../../cms/store'

export function NoticeTicker() {
  const { content } = useCms()
  const items = content.notices.filter((n) => n.published).slice(0, 10)
  if (items.length === 0) return null
  const loop = [...items, ...items]

  return (
    <div className="border-b border-line bg-white">
      <div className="container-x flex items-center gap-4 py-2.5">
        <span className="flex shrink-0 items-center gap-2 rounded-lg bg-saffron-400 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
          <Megaphone className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Latest</span>
        </span>
        <div className="fade-mask-x min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-8" style={{ animationDuration: '70s' }}>
            {loop.map((n, i) => (
              <a
                key={`${n.id}-${i}`}
                href={n.url || '#'}
                target={n.url ? '_blank' : undefined}
                rel="noreferrer"
                className="flex shrink-0 items-center gap-2 text-sm text-slate-700 hover:text-navy-700"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400" />
                <span className="font-medium">{n.title}</span>
                <span className="text-xs text-slate-400">{fmtDate(n.date)}</span>
              </a>
            ))}
          </div>
        </div>
        <Link to="/notices" className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-navy-600 hover:underline sm:flex">
          All notices <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
