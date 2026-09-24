import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '../../cms/store'
import { heroSlides } from '../../data/content'

const INTERVAL = 3000

const figures = [
  { value: '9', label: 'B.Tech programmes' },
  { value: '2,500+', label: 'Students on campus' },
  { value: '428', label: 'Placement offers 2025-26' },
  { value: '₹64 L', label: 'Highest package' },
]

export function HeroSlider() {
  const { content } = useCms()
  const s = content.settings
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const count = heroSlides.length

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => clearTimeout(id)
  }, [index, count, reduce])

  useEffect(() => {
    const next = new Image()
    next.src = heroSlides[(index + 1) % count].image
  }, [index, count])

  const slide = heroSlides[index]

  return (
    <section className="relative isolate overflow-hidden bg-navy-950" aria-label="Institute of Engineering & Technology">
      {/* Photograph */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.image}
            src={slide.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* Cinematic scrim: deep at the bottom-left where the words sit, clear at the top-right */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/45 to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[520px] flex-col justify-end pb-10 pt-12 sm:min-h-[640px] sm:pb-16 sm:pt-24 lg:min-h-[740px] lg:pb-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" />
          <span className="sm:hidden">Established 4 September 1996</span>
          <span className="hidden sm:inline">{s.university} · Established 4 September 1996</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-5 max-w-4xl text-[2rem] font-extrabold leading-[1.06] tracking-tight text-white min-[400px]:text-[2.35rem] sm:mt-6 sm:text-6xl sm:leading-[1.02] lg:text-[4.25rem]"
        >
          Institute of Engineering &amp; Technology
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16 }}
          className="font-display mt-3 text-lg font-bold tracking-tight text-saffron-300 sm:mt-4 sm:text-2xl"
        >
          Knowledge meets Innovation
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.24 }}
          className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-100 sm:mt-6 sm:text-lg"
        >
          One of Central India’s leading engineering institutes — an autonomous, AICTE-approved and UGC-recognised institution offering B.Tech, M.Tech, M.Sc. and Ph.D. programmes under the NAAC A+ accredited DAVV.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.32 }}
          className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3"
        >
          <Link to="/admissions" className="btn btn-accent w-full !py-3.5 text-[15px] sm:w-auto sm:!px-7 sm:!py-4 sm:text-base">
            Admission 2026-27 <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="grid grid-cols-2 gap-2.5 sm:contents">
            <Link to="/departments" className="btn w-full border border-white/25 bg-white/10 !px-3 !py-3.5 text-[15px] text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto sm:!px-5 sm:!py-4 sm:text-base">
              <span className="sm:hidden">Departments</span>
              <span className="hidden sm:inline">Explore departments</span>
            </Link>
            <a href={s.social.youtube} target="_blank" rel="noreferrer" className="btn w-full border border-white/25 !px-3 !py-3.5 text-[15px] text-white hover:bg-white/10 sm:w-auto sm:border-0 sm:!px-5 sm:!py-4 sm:text-base">
              <PlayCircle className="h-5 w-5 shrink-0 text-saffron-300" /> Live@IET
            </a>
          </div>
        </motion.div>

        {/* Key figures */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.44 }}
          className="mt-8 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-4 border-t border-white/15 pt-5 sm:mt-12 sm:gap-x-6 sm:gap-y-6 sm:pt-8 sm:grid-cols-4"
        >
          {figures.map((f) => (
            <div key={f.label}>
              <dt className="font-display text-xl font-extrabold text-white sm:text-3xl">{f.value}</dt>
              <dd className="mt-1 text-xs font-medium leading-snug text-navy-200 sm:text-sm">{f.label}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Which photograph is on screen */}
        <div className="pointer-events-none absolute bottom-6 right-4 hidden max-w-[45%] text-right sm:px-6 lg:block lg:px-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-white/70"
            >
              <span className="font-semibold text-white/90">{slide.title}</span> · {slide.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
