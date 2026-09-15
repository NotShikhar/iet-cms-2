import { ArrowRight, CheckCircle2, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const points = [
  'Started on 4 September 1996 with 90 students in three branches; welcomes over 900 students annually today',
  'Academically autonomous with a flexible, industry-aligned CBCS curriculum',
  'Approved by AICTE and the Government of Madhya Pradesh; recognised by UGC',
  'MoUs with NIC, RRCAT, TCS and Eicher Motors; ₹100 Cr ANRF-PAIR project with IIT Indore as hub',
  'Over 100 research publications every year; 350+ papers in Scopus/SCI journals',
]

export function About() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
      <div className="dot-bg absolute inset-0 opacity-50" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="About the Institute"
            title="A University Teaching Department at the forefront of engineering education."
            description="IET operates under the Faculty of Engineering of Devi Ahilya Vishwavidyalaya — a NAAC A+ accredited university — and has earned consistent recognition for its rigorous curriculum, research culture and industry-aligned teaching."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/page/about-iet" className="btn btn-primary">About IET <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/page/vision-mission-iet" className="btn btn-secondary">Vision & Mission</Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src="/media/ietnew/PV02_S_65-1-scaled.jpg" alt="Main gate signboard of IET, Devi Ahilya Vishwavidyalaya, Vikramshila Parisar" className="col-span-2 h-56 w-full rounded-3xl object-cover shadow-soft sm:h-72" />
            <img src="/media/ietnew/PV02_S_8-1-scaled.jpg" alt="Central atrium of the academic block" className="h-44 w-full rounded-3xl object-cover shadow-soft" />
            <Link to="/page/directors-message" className="card flex flex-col justify-between p-5 hover:border-navy-200">
              <Quote className="h-6 w-6 text-saffron-400" />
              <p className="mt-2 text-sm leading-relaxed text-slate-600">"IET is not merely an institution; it is a living, breathing community of curious minds, and that curiosity, I believe, is the most powerful force in engineering."</p>
              <div className="mt-3">
                <p className="text-sm font-bold text-ink">Dr. Pratosh Bansal</p>
                <p className="text-xs text-slate-500">Director, IET-DAVV</p>
              </div>
            </Link>
          </div>
          <div className="glass absolute -left-4 -top-4 hidden rounded-2xl px-4 py-3 sm:block">
            <p className="font-display text-2xl font-extrabold text-navy-700">1996</p>
            <p className="text-xs text-slate-500">Established</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
