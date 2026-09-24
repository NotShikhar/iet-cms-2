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
    <section className="relative z-20 -mt-8 sm:-mt-14">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-2 shadow-lift sm:grid-cols-4 sm:gap-3 sm:rounded-3xl sm:p-3 lg:grid-cols-8">
          {quickLinks.map((q) => (
            <StaggerItem key={q.label}>
              <Link to={q.href} className="group flex h-full items-center gap-2 rounded-xl px-2 py-2.5 transition hover:bg-mist sm:flex-col sm:justify-start sm:gap-2.5 sm:rounded-2xl sm:px-3 sm:py-4 sm:text-center">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-300 group-hover:text-white sm:h-11 sm:w-11 sm:rounded-xl ${tones[q.tone]}`}>
                  <Icon name={q.icon} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </span>
                <span className="min-w-0 text-[12.5px] font-semibold leading-tight text-slate-700 group-hover:text-ink sm:text-[13px]">{q.label}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
