import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, description, align = 'left', className = '' }: Props) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <span className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
    </Reveal>
  )
}
