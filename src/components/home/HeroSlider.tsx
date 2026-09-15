import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Award, Building2, MapPin, PlayCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '../../cms/store'
import { heroSlides } from '../../data/content'

const INTERVAL = 3000

export function HeroSlider() {
  const { content } = useCms()
  const s = content.settings
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const count = heroSlides.length

  // Rotate on its own. Visitors who ask for reduced motion keep a single still photograph.
  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => clearTimeout(id)
  }, [index, count, reduce])

  // Keep the next photograph warm so the change never stutters
  useEffect(() => {
    const next = new Image()
    next.src = heroSlides[(index + 1) % count].image
  }, [index, count])

  const slide = heroSlides[index]
  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: reduce ? 0 : 0.7, ease: 'easeInOut' as const } }

  return (
    <section className="relative isolate overflow-hidden bg-white" aria-label="Institute of Engineering & Technology">
      {/* Desktop: the photograph fills the band, a light scrim keeps the headline readable */}
      <div className="absolute inset-0 hidden lg:block">
        <AnimatePresence initial={false}>
          <motion.img key={slide.image} src={slide.image} alt="" aria-hidden="true" {...fade} className="absolute inset-0 h-full w-full object-cover" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-white from-42% via-white/88 via-62% to-transparent to-84%" />
      </div>
      <div className="grid-bg absolute inset-0 opacity-70 lg:w-3/5" />

      <div className="container-x relative flex min-h-[560px] flex-col justify-center py-12 sm:py-14 lg:min-h-[700px] lg:py-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="chip !border-navy-200 !bg-white !text-navy-700 shadow-soft">
            <span className="h-2 w-2 shrink-0 rounded-full bg-saffron-400" />
            Established 4 September 1996 · {s.motto}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]"
          >
            Institute of Engineering &amp; Technology
            <span className="mt-3 block text-[0.52em] font-bold leading-snug text-navy-600">
              Devi Ahilya Vishwavidyalaya, Indore
              <span className="mt-2 block h-1 w-24 rounded-full bg-saffron-400" />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }} className="mt-6 max-w-xl leading-relaxed text-slate-700 sm:text-lg">
            One of Central India’s leading engineering institutes: an autonomous, AICTE-approved and UGC-recognised institution offering B.Tech, M.Tech, M.Sc. and Ph.D. programmes under the NAAC A+ accredited DAVV.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.26 }} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/admissions" className="btn btn-primary !px-6 !py-3.5 text-base">Admission 2026-27 <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/departments" className="btn btn-secondary !py-3.5">Departments</Link>
            <a href={s.social.youtube} target="_blank" rel="noreferrer" className="btn btn-ghost"><PlayCircle className="h-5 w-5 text-saffron-500" /> Live@IET</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2"><Award className="h-4 w-4 text-navy-600" /> AICTE · UGC · NAAC A+ (DAVV)</span>
            <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-navy-600" /> Academically autonomous</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-navy-600" /> Vikramshila Parisar, Khandwa Road</span>
          </motion.div>
        </div>

        {/* Mobile & tablet: the slideshow as its own picture card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative mt-10 overflow-hidden rounded-3xl border border-line shadow-lift lg:hidden">
          <div className="relative aspect-[4/3] sm:aspect-[16/9]">
            <AnimatePresence initial={false}>
              <motion.img key={slide.image} src={slide.image} alt={`${slide.title} — ${slide.caption}`} {...fade} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent p-4 pt-10 text-white">
            <p className="font-display text-sm font-bold">{slide.title}</p>
            <p className="text-xs text-white/85">{slide.caption}</p>
          </div>
        </motion.div>

        {/* Caption for the photograph currently on screen (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden lg:absolute lg:bottom-12 lg:right-8 lg:block"
        >
          <div className="rounded-2xl border border-line bg-white px-4 py-3 shadow-soft">
            <p className="font-display text-sm font-bold text-ink">{slide.title}</p>
            <p className="text-xs text-slate-600">{slide.caption}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
