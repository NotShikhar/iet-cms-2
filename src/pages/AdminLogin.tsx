import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, LogIn, ShieldAlert, TriangleAlert, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { DEMO_ACCOUNTS, useAuth } from '../cms/auth'
import { settings } from '../cms/defaultContent'

export default function AdminLogin() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (user) return <Navigate to={from} replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const res = await signIn(username, password)
    setBusy(false)
    if (res.ok) navigate(from, { replace: true })
    else setError(res.error ?? 'Sign in failed.')
  }

  const field = 'h-12 w-full rounded-xl border border-line bg-white pl-11 pr-3 text-sm outline-none transition focus:border-navy-400 focus:ring-2 focus:ring-navy-100'

  return (
    <div className="relative min-h-screen overflow-hidden bg-mist">
      <img src="/media/hero/main-gate.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/80" />
      <div className="grid-bg absolute inset-0 opacity-70" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-md">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy-700">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>

          <div className="card p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <img src={settings.logo} alt="" className="h-12 w-12 rounded-xl object-contain" />
              <div className="min-w-0">
                <p className="font-display text-base font-bold leading-tight text-ink">{settings.name}</p>
                <p className="text-xs text-slate-500">{settings.university}</p>
              </div>
            </div>

            <div className="mt-7">
              <span className="eyebrow">Content Management System</span>
              <h1 className="font-display mt-2 text-2xl font-bold text-ink">Admin Login</h1>
              <p className="mt-1 text-sm text-slate-600">Sign in to manage notices, events, news and pages.</p>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Username</span>
                <span className="relative block">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    autoFocus
                    required
                    placeholder="admin"
                    className={field}
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Password</span>
                <span className="relative block">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className={`${field} !pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-500 hover:bg-mist hover:text-navy-600"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>

              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-700">
                  <ShieldAlert className="h-4 w-4 shrink-0" /> {error}
                </motion.p>
              )}

              <button type="submit" disabled={busy} className="btn btn-primary w-full !py-3.5 disabled:opacity-70">
                {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <><LogIn className="h-4 w-4" /> Sign in</>}
              </button>
            </form>

            <div className="mt-6 rounded-xl border border-saffron-200 bg-saffron-50 p-3.5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600">
                <TriangleAlert className="h-3.5 w-3.5" /> Prototype credentials
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {DEMO_ACCOUNTS.map((a) => (
                  <li key={a.username}>
                    <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">{a.username}</code>
                    {' / '}
                    <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">{a.password}</code>
                    <span className="text-slate-500"> — {a.role}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                This check runs in the browser and is for demonstration only. A live deployment must authenticate against the institute's server.
              </p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            {settings.name} · {settings.address}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
