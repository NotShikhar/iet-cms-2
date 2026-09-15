import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCms } from '../../cms/store'
import { departments } from '../../data/departments'

type MenuItem = { label: string; to: string; children?: { label: string; to: string; desc?: string }[] }

const menu: MenuItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About IET', to: '/page/about-iet', desc: 'History since 1996' },
      { label: 'Vision & Mission – IET', to: '/page/vision-mission-iet', desc: 'What we stand for' },
      { label: 'About DAVV', to: '/page/about-davv', desc: 'Our parent university' },
      { label: "Director's Message", to: '/page/directors-message', desc: 'Dr. Pratosh Bansal' },
      { label: "Vice Chancellor's Message", to: '/page/vice-chancellors-message', desc: 'Prof. Rakesh Singhai' },
      { label: 'Strategic Plan', to: '/page/strategic-plan', desc: 'Goals & action points' },
      { label: 'Alumni', to: '/page/notable-alumni', desc: 'Notable alumni & network' },
      { label: 'Administrative Officer', to: '/page/administrative-officer', desc: 'Dr. Paresh Atri' },
      { label: 'Committees & Cells', to: '/page/committees', desc: 'Statutory committees' },
      { label: 'Mandatory Disclosure & EOA', to: '/page/mandatory-disclosure', desc: 'AICTE documents' },
      { label: 'Tenders', to: '/page/tenders', desc: 'Tender notifications' },
    ],
  },
  {
    label: 'Academics',
    to: '/academics',
    children: [
      { label: 'Programmes Offered', to: '/academics', desc: 'B.Tech, M.Tech, M.Sc., Ph.D.' },
      { label: 'Academic Calendar', to: '/page/academic-calendar', desc: 'Institute & AICTE calendars' },
      { label: 'Class Time Table', to: '/page/class-time-table', desc: 'All branches & years' },
      { label: 'Schemes & Syllabus (CBCS)', to: '/page/syllabus', desc: 'B.Tech, B.Des, PTDC' },
      { label: 'Results', to: '/page/results', desc: 'May–June 2026' },
      { label: 'Roll Lists', to: '/page/roll-list', desc: 'Section-wise lists' },
      { label: 'Project Documents', to: '/page/project-documents', desc: 'B.E. IV year formats' },
      { label: 'Faculty & Research', to: '/page/faculty-research', desc: 'Metrics, patents, leadership' },
      { label: 'Research Projects', to: '/page/research-projects', desc: 'C2S & ANRF PAIR' },
      { label: 'Program Outcomes', to: '/page/program-outcomes', desc: 'Graduate attributes' },
      { label: 'E-Books', to: '/page/e-books', desc: 'McGraw Hill & Wiley' },
      { label: 'Student Feedback', to: '/page/student-feedback', desc: 'Reports & action taken' },
    ],
  },
  {
    label: 'Departments',
    to: '/departments',
    children: departments.map((d) => ({ label: d.name, to: `/departments/${d.slug}`, desc: d.tagline })),
  },
  {
    label: 'Admissions',
    to: '/admissions',
    children: [
      { label: 'Admission 2026-27', to: '/admissions', desc: 'Programmes, brochures & FAQs' },
      { label: 'B.Tech Admission Guidelines', to: '/page/admission-guidelines', desc: 'Documents, fees, contacts' },
      { label: 'College Level Counselling', to: '/page/clc-process', desc: 'CLC procedure' },
      { label: 'Scholarships', to: '/page/scholarships', desc: 'State, central & AICTE schemes' },
      { label: 'Hostel', to: '/page/hostel', desc: 'Capacity, wardens & fees' },
    ],
  },
  { label: 'Placements', to: '/placements' },
  {
    label: 'Campus Life',
    to: '/campus-life',
    children: [
      { label: 'Campus & Facilities', to: '/campus-life', desc: 'Hostels, labs, sports' },
      { label: 'GDSC', to: '/page/gdsc', desc: 'Google Developer Student Club' },
      { label: 'ACIIE & E-Cell', to: '/page/aciie', desc: 'Innovation & incubation' },
      { label: 'NSS', to: '/page/nss', desc: 'National Service Scheme' },
      { label: 'ISHRAE Chapter', to: '/page/ishrae', desc: 'HVAC&R student chapter' },
      { label: 'IET Times & Live@IET', to: '/page/iet-times', desc: 'News portal & YouTube' },
      { label: 'Anti-Ragging & Discipline', to: '/page/anti-ragging', desc: 'Committees & counsellor' },
    ],
  },
  { label: 'Notices', to: '/notices' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const location = useLocation()
  const { content } = useCms()
  const s = content.settings
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setActive(null)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-900 text-[13px] text-navy-100 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-saffron-300" />{s.phones.join(' / ')}</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-saffron-300" />{s.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={s.links['DAVV University']} target="_blank" rel="noreferrer" className="hover:text-white">DAVV University</a>
            <a href={s.links['Online Grievance']} target="_blank" rel="noreferrer" className="hover:text-white">Online Grievance</a>
            <a href={s.links['Forms Portal']} target="_blank" rel="noreferrer" className="hover:text-white">Forms</a>
            <a href={s.links['Alumni Network']} target="_blank" rel="noreferrer" className="hover:text-white">Alumni</a>
            <Link to="/admin" className="rounded-md bg-white/10 px-2.5 py-0.5 font-medium text-white hover:bg-white/20">Admin Login</Link>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ${scrolled ? 'glass border-b border-line/80 shadow-soft' : 'bg-white/95 border-b border-transparent'}`}>
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src="/media/ietnew/iet_logo-300x300.png" alt="IET DAVV" className="h-11 w-11 rounded-xl object-contain" />
            <div className="leading-tight">
              <div className="font-display text-[15px] font-bold tracking-tight text-ink sm:text-base xl:whitespace-nowrap xl:text-[15px] 2xl:text-base">
                <span className="sm:hidden">IET DAVV Indore</span>
                <span className="hidden sm:inline">{s.name}</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 sm:text-xs xl:whitespace-nowrap">
                <span className="sm:hidden">{s.name}</span>
                <span className="hidden sm:inline">{s.university}</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center xl:flex" onMouseLeave={() => setActive(null)}>
            {menu.map((item) => (
              <div key={item.label} className={`relative ${item.to === '/' ? 'hidden 2xl:block' : ''}`} onMouseEnter={() => setActive(item.children ? item.label : null)}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `flex items-center gap-1 whitespace-nowrap rounded-lg px-1.5 py-2 text-[13px] font-semibold 2xl:px-2.5 transition-colors ${isActive ? 'text-navy-600' : 'text-slate-700 hover:text-navy-600'}`}
                >
                  {item.label}
                  {item.children && <ChevronDown className={`h-3.5 w-3.5 transition-transform ${active === item.label ? 'rotate-180' : ''}`} />}
                </NavLink>
                <AnimatePresence>
                  {item.children && active === item.label && <Dropdown items={item.children} />}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link to="/admissions" className="btn btn-primary hidden whitespace-nowrap !px-4 !py-2.5 lg:inline-flex">
              <span className="2xl:hidden">Admissions</span><span className="hidden 2xl:inline">Admission 2026-27</span> <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-line text-slate-700 xl:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-navy-500 via-saffron-400 to-navy-500" />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-lift"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display font-bold text-ink">Menu</span>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg border border-line" aria-label="Close menu"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-1">
                {menu.map((item) => (
                  <MobileItem key={item.label} item={item} />
                ))}
              </div>
              <Link to="/admissions" className="btn btn-primary mt-5 w-full">Admission 2026-27</Link>
              <Link to="/admin" className="btn btn-secondary mt-2 w-full">Admin Login (CMS)</Link>
              <div className="mt-6 space-y-1 text-sm text-slate-600">
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-navy-600" />{s.phones.join(' / ')}</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-navy-600" />{s.email}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function Dropdown({ items }: { items: { label: string; to: string; desc?: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)
  const wide = items.length > 6

  // Keep the panel inside the viewport whatever the trigger position or window width
  useLayoutEffect(() => {
    const clamp = () => {
      const el = ref.current
      const anchor = el?.parentElement
      if (!el || !anchor) return
      const pad = 16
      const left = anchor.getBoundingClientRect().left
      const overflow = left + el.offsetWidth - (window.innerWidth - pad)
      setShift(overflow > 0 ? -Math.min(overflow, Math.max(0, left - pad)) : 0)
    }
    clamp()
    window.addEventListener("resize", clamp)
    return () => window.removeEventListener("resize", clamp)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      style={{ marginLeft: shift }}
      className={`absolute left-0 top-full pt-2 ${wide ? "w-[min(680px,calc(100vw-2rem))]" : "w-[min(20rem,calc(100vw-2rem))]"}`}
    >
      <div className={`glass rounded-2xl p-2 ${wide ? "grid gap-x-1 sm:grid-cols-2" : ""}`}>
        {items.map((c) => (
          <Link key={c.label} to={c.to} className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-navy-50">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-400" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink group-hover:text-navy-700">{c.label}</span>
              {c.desc && <span className="block text-xs text-slate-500">{c.desc}</span>}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

function MobileItem({ item }: { item: MenuItem }) {
  const [exp, setExp] = useState(false)
  if (!item.children)
    return (
      <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-[15px] font-semibold ${isActive ? 'bg-navy-50 text-navy-700' : 'text-slate-800'}`}>
        {item.label}
      </NavLink>
    )
  return (
    <div>
      <button onClick={() => setExp(!exp)} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-semibold text-slate-800">
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${exp ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {exp && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="ml-3 border-l border-line pl-3">
              {item.children.map((c) => (
                <Link key={c.label} to={c.to} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-navy-50 hover:text-navy-700">
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
