import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import type { SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '../../cms/store'
import { departments } from '../../data/departments'

const cols = [
  {
    title: 'Academics',
    links: [
      { label: 'Programmes Offered', to: '/academics' },
      { label: 'Academic Calendar', to: '/page/academic-calendar' },
      { label: 'Class Time Table', to: '/page/class-time-table' },
      { label: 'Schemes & Syllabus', to: '/page/syllabus' },
      { label: 'Results', to: '/page/results' },
      { label: 'Roll Lists', to: '/page/roll-list' },
      { label: 'Faculty & Research', to: '/page/faculty-research' },
    ],
  },
  {
    title: 'Students',
    links: [
      { label: 'Admission 2026-27', to: '/admissions' },
      { label: 'Scholarships', to: '/page/scholarships' },
      { label: 'Hostel', to: '/page/hostel' },
      { label: 'Placements', to: '/placements' },
      { label: 'GDSC', to: '/page/gdsc' },
      { label: 'ACIIE & E-Cell', to: '/page/aciie' },
      { label: 'NSS', to: '/page/nss' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: "Director's Message", to: '/page/directors-message' },
      { label: 'Committees & Cells', to: '/page/committees' },
      { label: 'Mandatory Disclosure & EOA', to: '/page/mandatory-disclosure' },
      { label: 'Anti-Ragging & Discipline', to: '/page/anti-ragging' },
      { label: 'Student Feedback', to: '/page/student-feedback' },
      { label: 'Tenders', to: '/page/tenders' },
      { label: 'Admin Login (CMS)', to: '/admin' },
    ],
  },
]

export function Footer() {
  const { content } = useCms()
  const s = content.settings
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-950 text-navy-100">
      <div className="dot-bg absolute inset-0 opacity-[0.12]" />
      <div className="container-x relative">
        <div className="-translate-y-10 rounded-3xl border border-white/10 bg-gradient-to-r from-navy-600 to-navy-800 p-8 shadow-lift sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-300">Admission 2026-27</p>
            <h3 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">Nine B.Tech programmes. Seven M.Tech specialisations. One campus in Indore.</h3>
            <p className="mt-2 max-w-xl text-navy-100/80">Admissions through JEE (Main) and DTE Madhya Pradesh counselling. College Level Counselling for vacant seats as notified by DTE.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link to="/admissions" className="btn btn-accent">Admission information <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn border border-white/20 bg-white/10 text-white hover:bg-white/20">Reach us</Link>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/media/ietnew/iet_logo-300x300.png" alt="IET DAVV" className="h-11 w-11 rounded-xl bg-white object-contain p-0.5" />
            <img src={s.universityLogo} alt="Devi Ahilya Vishwavidyalaya" className="h-11 w-11 rounded-xl bg-white object-contain p-0.5" />
            <div>
              <div className="font-display font-bold text-white">{s.name}</div>
              <div className="text-xs text-navy-200">{s.university}</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200/80">
            An academically autonomous, AICTE-approved and UGC-recognised University Teaching Department of the NAAC A+ accredited Devi Ahilya Vishwavidyalaya, established on 4 September 1996.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-navy-100/90">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-300" />{s.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-saffron-300" />{s.phones.join(' / ')}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-saffron-300" />{s.email}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Facebook, href: s.social.facebook, label: 'Facebook' },
              { Icon: Twitter, href: s.social.twitter, label: 'X' },
              { Icon: Linkedin, href: s.social.linkedin, label: 'LinkedIn' },
              { Icon: Youtube, href: s.social.youtube, label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-navy-100 transition hover:bg-saffron-400 hover:text-ink">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{c.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}><Link to={l.to} className="text-navy-200/85 transition hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-x relative border-t border-white/10 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-300">Departments</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {departments.map((d) => (
            <Link key={d.slug} to={`/departments/${d.slug}`} className="text-navy-200/80 hover:text-white">{d.name}</Link>
          ))}
        </div>
      </div>
      <div className="container-x relative border-t border-white/10 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-300">Official portals</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {Object.entries(s.links).map(([k, v]) => (
            <a key={k} href={v} target="_blank" rel="noreferrer" className="text-navy-200/80 hover:text-white">{k}</a>
          ))}
        </div>
      </div>
      <div className="container-x relative flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Institute of Engineering & Technology, Devi Ahilya Vishwavidyalaya, Indore. All rights reserved.</p>
        <p>Content and media sourced from ietdavv.edu.in · CMS prototype</p>
      </div>
    </footer>
  )
}

type SP = SVGProps<SVGSVGElement>
function Facebook(p: SP) { return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z"/></svg> }
function Twitter(p: SP) { return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 3h3l-6.6 7.6L21.7 21h-6.1l-4.8-6.2L5.3 21h-3l7.1-8.1L2.3 3h6.3l4.3 5.7L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z"/></svg> }
function Linkedin(p: SP) { return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6.9 8.9H3.4V21h3.5V8.9zM5.2 3.3a2 2 0 100 4.1 2 2 0 000-4.1zM20.6 13.6c0-3.4-1.8-5-4.3-5-2 0-2.9 1.1-3.4 1.9V8.9H9.4V21h3.5v-6c0-1.6.3-3.2 2.3-3.2 1.9 0 2 1.8 2 3.3V21h3.4v-7.4z"/></svg> }
function Youtube(p: SP) { return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22.5 7.2a2.8 2.8 0 00-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 00-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 002 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 002-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM9.8 15.1V8.9l5.7 3.1-5.7 3.1z"/></svg> }
