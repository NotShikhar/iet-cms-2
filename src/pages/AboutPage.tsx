import { ArrowRight, Landmark, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePage } from '../cms/store'
import { Markdown } from '../components/ui/Markdown'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { leadership } from '../data/departments'
import { milestones } from '../data/content'

export default function AboutPage() {
  const about = usePage('about-iet')
  const vm = usePage('vision-mission-iet')
  const director = usePage('directors-message')

  return (
    <>
      <PageHero eyebrow="About IET" title="Thirty years at the forefront of engineering education." description="A self-financing, academically autonomous University Teaching Department of Devi Ahilya Vishwavidyalaya, approved by AICTE, UGC and the Government of Madhya Pradesh." crumbs={[{ label: 'About' }]} image="/media/ietnew/PV03_S_28_1.jpg" />

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <SectionHeader eyebrow="Our Story" title="From ninety students to Central India’s leading engineering institute." />
            <Reveal className="mt-6">{about && <Markdown>{about.sections[0].body}</Markdown>}</Reveal>
            <Reveal>
              <Link to="/page/about-iet" className="btn btn-secondary mt-4">Full history & landmarks <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Stagger className="grid gap-4">
              {vm?.sections.map((s) => (
                <StaggerItem key={s.heading}>
                  <div className="card p-6">
                    <span className="eyebrow">{s.heading}</span>
                    <Markdown className="mt-3">{s.body}</Markdown>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section id="director" className="bg-mist py-20 scroll-mt-28">
        <div className="container-x grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="relative">
              <img src="/media/ietnew/Pratosh-Bansal.webp" alt="Dr. Pratosh Bansal, Director" className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-lift" />
              <div className="glass absolute -bottom-5 left-5 right-5 rounded-2xl p-4">
                <p className="font-display font-bold text-ink">Dr. Pratosh Bansal</p>
                <p className="text-xs text-slate-500">Director, IET · Professor, Information Technology</p>
              </div>
            </div>
          </Reveal>
          <div className="min-w-0 lg:col-span-8">
            <SectionHeader eyebrow="Director's Message" title="Welcome to IET DAVV." />
            <Reveal delay={0.1} className="mt-6">
              {director && <Markdown>{director.sections[0].body}</Markdown>}
              <Link to="/page/directors-message" className="btn btn-secondary mt-2">Brief introduction & CV <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Milestones" title="Three decades of growth." />
          <div className="relative mt-14">
            <div className="absolute left-4 top-0 h-full w-px bg-line lg:left-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} className={`relative flex gap-6 lg:w-1/2 ${i % 2 ? 'lg:ml-auto lg:pl-12' : 'lg:pr-12 lg:text-right'}`}>
                  <span className={`absolute left-4 top-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-saffron-400 shadow lg:left-auto ${i % 2 ? 'lg:-left-0 lg:-translate-x-1/2' : 'lg:-right-0 lg:translate-x-1/2'}`} />
                  <div className="card ml-10 flex-1 p-5 lg:ml-0">
                    <p className="font-display text-2xl font-extrabold text-navy-600">{m.year}</p>
                    <p className="mt-1 text-slate-600">{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="administration" className="bg-mist py-20 scroll-mt-28">
        <div className="container-x">
          <SectionHeader eyebrow="Administration" title="Leadership & governance." description="The institute functions under the statutes of Devi Ahilya Vishwavidyalaya with statutory committees and cells." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((a, i) => (
              <StaggerItem key={a.role}>
                <div className="card card-hover flex items-center gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-600 text-white">{i < 2 ? <Landmark className="h-5 w-5" /> : i < 5 ? <Users className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{a.role}</p>
                    <p className="font-display text-base font-bold text-ink">{a.name}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {[
              ['Committees & Cells', '/page/committees'],
              ['Administrative Officer', '/page/administrative-officer'],
              ['Mandatory Disclosure & EOA', '/page/mandatory-disclosure'],
              ['Anti-Ragging & Discipline', '/page/anti-ragging'],
              ['Strategic Plan 2018-23', '/page/strategic-plan'],
              ['Faculty & Research', '/page/faculty-research'],
            ].map(([t, to]) => (
              <Link key={t} to={to} className="chip hover:border-navy-300">{t}</Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="davv" className="py-20 scroll-mt-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <img src="/media/main/slider/Devi_Ahilya_bai.jpg" alt="Devi Ahilya Bai Holkar" className="aspect-[16/10] w-full rounded-3xl object-cover shadow-lift" />
          </Reveal>
          <div>
            <SectionHeader eyebrow="Parent University" title="Devi Ahilya Vishwavidyalaya, Indore" description="Established in 1964 by an Act of the Legislature of Madhya Pradesh, DAVV is the first State University in Madhya Pradesh to be accredited with an ‘A+’ grade by NAAC, with 33 teaching departments, 16 faculties and 294 affiliated colleges." />
            <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-3">
              <Link to="/page/about-davv" className="btn btn-primary">About DAVV</Link>
              <Link to="/page/vice-chancellors-message" className="btn btn-secondary">Vice Chancellor's Message</Link>
              <a href="https://www.dauniv.ac.in" target="_blank" rel="noreferrer" className="btn btn-ghost">dauniv.ac.in</a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
