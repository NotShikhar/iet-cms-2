import { motion } from 'framer-motion'
import { ArrowRight, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import { placementRate, placementStats, placementYears, recruiters } from '../../data/content'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function Placements() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="Training & Placement" title="Careers that start on campus." description="The Centralized Placement Cell, led by Dr. Govind Maheshwari, works with recruiters across IT, product, analytics and core engineering. The 2026-27 season opened with around 90 offers and a highest package of ₹34 lakh by August 2026." />
            <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-4">
              {placementStats.map((s) => (
                <div key={s.label} className="card p-5">
                  <p className="font-display text-3xl font-extrabold text-navy-700"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} /></p>
                  <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/placements" className="btn btn-primary mt-8">Placement statistics <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="min-w-0">
            <div className="card min-w-0 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Placement percentage</p>
                  <p className="font-display text-xl font-bold text-ink">Steady improvement</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-600"><Briefcase className="h-5 w-5" /></span>
              </div>
              <div className="mt-8 flex h-44 items-end gap-6">
                {placementRate.map((p, i) => (
                  <motion.div
                    key={p.session}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <span className="text-sm font-bold text-navy-700">{p.rate}%</span>
                    <div className="flex w-full flex-1 items-end">
                      <motion.div
                        variants={{ hidden: { height: '0%' }, show: { height: `${p.rate}%` } }}
                        transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className={`w-full rounded-t-xl ${i === 2 ? 'bg-gradient-to-t from-navy-600 to-teal-500' : 'bg-navy-200'}`}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{p.session}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5 text-sm">
                {placementYears.map((y) => (
                  <div key={y.year} className="rounded-xl bg-mist p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{y.year}</p>
                    <p className="mt-1 text-slate-700"><span className="font-bold text-ink">{y.offers}</span> offers · <span className="font-bold text-ink">{y.companies}</span> companies</p>
                    <p className="text-slate-700">Highest <span className="font-bold text-ink">{y.highest} LPA</span> · Avg <span className="font-bold text-ink">{y.average} LPA</span></p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Major recruiters</p>
                <div className="fade-mask-x overflow-hidden">
                  <div className="animate-marquee flex w-max gap-2">
                    {[...recruiters, ...recruiters].map((r, i) => (
                      <span key={i} className="rounded-lg border border-line bg-mist px-3 py-1.5 text-xs font-semibold text-slate-700">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
