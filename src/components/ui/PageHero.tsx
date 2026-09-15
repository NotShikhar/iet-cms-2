import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
  eyebrow: string
  title: string
  description?: string
  crumbs?: { label: string; href?: string }[]
  image?: string
}

export function PageHero({ eyebrow, title, description, crumbs = [], image }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div className="grid-bg absolute inset-0 fade-mask-b opacity-70" />
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <img src={image} alt="" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-mist via-mist/70 to-transparent" />
        </div>
      )}
      <div className="container-x relative py-16 lg:py-24">
        <nav className="mb-6 flex items-center gap-1 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-navy-600">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {c.href ? <Link to={c.href} className="hover:text-navy-600">{c.label}</Link> : <span className="text-navy-700">{c.label}</span>}
            </span>
          ))}
        </nav>
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6 }}
          className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
