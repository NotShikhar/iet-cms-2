import { Link } from 'react-router-dom'
import { quickLinks } from '../../data/content'
import { Icon } from '../ui/Icon'
import { Stagger, StaggerItem } from '../ui/Reveal'

const tones: Record<string, string> = {
  navy: 'bg-navy-50 text-navy-600 group-hover:bg-navy-600',
  teal: 'bg-teal-500/10 text-teal-600 group-hover:bg-teal-600',
  saffron: 'bg-saffron-50 text-saffron-600 group-hover:bg-saffron-500',
  rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600',
  violet: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600',
  sky: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600',
  emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600',
  slate: 'bg-slate-100 text-slate-600 group-hover:bg-slate-700',
}

export function QuickLinks() {
  return (
    <section className="relative z-10 mt-6 sm:mt-10">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-3 rounded-3xl border border-line bg-white p-3 shadow-lift sm:grid-cols-4 lg:grid-cols-8">
          {quickLinks.map((q) => (
            <StaggerItem key={q.label}>
              <Link to={q.href} className="group flex flex-col items-center gap-2.5 rounded-2xl px-3 py-4 text-center transition hover:bg-mist">
                <span className={`grid h-11 w-11 place-items-center rounded-xl transition-colors duration-300 group-hover:text-white ${tones[q.tone]}`}>
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <span className="text-[13px] font-semibold text-slate-700 group-hover:text-ink">{q.label}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
