import { BadgeCheck } from 'lucide-react'
import { accreditations } from '../../data/content'
import { Stagger, StaggerItem } from '../ui/Reveal'

export function Stats() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="container-x">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Approvals &amp; accreditation
        </p>
        <Stagger className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3">
          {accreditations.map((a) => (
            <StaggerItem key={a.name}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-navy-200 hover:shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-600">
                  <BadgeCheck className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-ink">{a.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{a.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
