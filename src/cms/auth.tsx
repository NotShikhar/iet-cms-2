import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * PROTOTYPE AUTHENTICATION.
 *
 * The credential check below runs in the browser, so the accounts are visible in the
 * JavaScript bundle and the gate can be bypassed by anyone who wants to. It exists to
 * demonstrate the admin flow, not to protect anything.
 *
 * A production deployment must verify credentials on the server (institute LDAP / DAVV
 * single sign-on or a session API) and the /admin routes must be protected there too.
 */
const ACCOUNTS = [
  { username: 'admin', password: 'iet@2026', name: 'Web Administrator', role: 'Administrator', email: 'director@ietdavv.edu.in' },
  { username: 'editor', password: 'iet@2026', name: 'Content Editor', role: 'Editor', email: 'webmaster@ietdavv.edu.in' },
]

export const DEMO_ACCOUNTS = ACCOUNTS.map(({ username, password, role }) => ({ username, password, role }))

export type AdminUser = { username: string; name: string; role: string; email: string }

const KEY = 'ietdavv-cms-session'

type Auth = {
  user: AdminUser | null
  signIn: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>
  signOut: () => void
}

const Ctx = createContext<Auth | null>(null)

function load(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as AdminUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(load)

  const signIn = useCallback<Auth['signIn']>(async (username, password) => {
    // Small delay so the form behaves like a real sign-in
    await new Promise((r) => setTimeout(r, 450))
    const match = ACCOUNTS.find((a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password)
    if (!match) return { ok: false, error: 'Incorrect username or password.' }
    const u: AdminUser = { username: match.username, name: match.name, role: match.role, email: match.email }
    try {
      sessionStorage.setItem(KEY, JSON.stringify(u))
    } catch {
      /* ignore */
    }
    setUser(u)
    return { ok: true }
  }, [])

  const signOut = useCallback(() => {
    try {
      sessionStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
    setUser(null)
  }, [])

  const value = useMemo<Auth>(() => ({ user, signIn, signOut }), [user, signIn, signOut])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const a = useContext(Ctx)
  if (!a) throw new Error('useAuth must be used inside AuthProvider')
  return a
}
