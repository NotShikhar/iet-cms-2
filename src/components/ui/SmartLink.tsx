import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const isExternal = (to: string) => /^https?:\/\//i.test(to)

/** Router link for internal paths; opens absolute http(s) URLs in a new tab. */
export function SmartLink({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  if (isExternal(to))
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
