import { recruiters, type Recruiter } from '../../data/content'

/**
 * Each tile carries its own right margin rather than using flex `gap`, so a track built
 * from two identical copies translates exactly one copy at -50% and the loop never jumps.
 */
function Tile({ r }: { r: Recruiter }) {
  return (
    <div className="mr-4 flex h-[84px] w-[200px] shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-5 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift sm:h-[92px] sm:w-[224px]">
      {r.logo ? (
        <img src={r.logo} alt={r.name} loading="lazy" className="max-h-12 w-auto max-w-[165px] object-contain" />
      ) : (
        <span className="font-display text-center text-[15px] font-bold leading-tight tracking-tight text-navy-800 sm:text-base">
          {r.name}
        </span>
      )}
    </div>
  )
}

/** Two tracks scrolling in opposite directions, continuously. */
export function RecruiterWall({ className = '' }: { className?: string }) {
  const half = Math.ceil(recruiters.length / 2)
  const rows = [recruiters.slice(0, half), recruiters.slice(half)]

  return (
    <div className={`fade-mask-x space-y-4 overflow-hidden ${className}`} aria-label="Companies that recruit from IET-DAVV">
      {rows.map((row, i) => (
        <div key={i} className={`flex w-max ${i === 0 ? 'marquee-track' : 'marquee-track-reverse'}`}>
          {[...row, ...row].map((r, k) => (
            <Tile key={`${r.name}-${k}`} r={r} />
          ))}
        </div>
      ))}
    </div>
  )
}
