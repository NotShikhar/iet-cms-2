import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Props = { value: number; suffix?: string; prefix?: string; decimals?: number; className?: string }

export function Counter({ value, suffix = '', prefix = '', decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, value, mv])

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  )
}
