import { accreditations, stats } from '../../data/content'
import { Counter } from '../ui/Counter'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'

export function Stats() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="bg-white p-6 text-center transition hover:bg-mist">
              <div className="font-display text-3xl font-extrabold tracking-tight text-navy-700 sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <div className="fade-mask-x overflow-hidden">
            <div className="animate-marquee flex w-max gap-4">
              {[...accreditations, ...accreditations].map((a, i) => (
                <div key={i} className="chip !gap-2 !px-4 !py-2">
                  <span className="h-2 w-2 rounded-full bg-saffron-400" />
                  <span className="font-semibold">{a.name}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{a.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
