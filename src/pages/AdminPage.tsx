import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CalendarDays, Check, Eye, FileText, Image, LayoutDashboard, LogOut, Newspaper, Pencil, Plus, RotateCcw, Save, Settings, Trash2, Video, X } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../cms/auth'
import { fmtDate, uid, useCms } from '../cms/store'
import type { CmsPage, EventItem, NewsItem, Notice, NoticeCategory } from '../cms/types'

type Tab = 'Dashboard' | 'Notices' | 'Events' | 'News' | 'Pages' | 'Media' | 'Documents' | 'Videos' | 'Settings'
const nav: { i: typeof Bell; l: Tab }[] = [
  { i: LayoutDashboard, l: 'Dashboard' },
  { i: Bell, l: 'Notices' },
  { i: CalendarDays, l: 'Events' },
  { i: Newspaper, l: 'News' },
  { i: FileText, l: 'Pages' },
  { i: Image, l: 'Media' },
  { i: FileText, l: 'Documents' },
  { i: Video, l: 'Videos' },
  { i: Settings, l: 'Settings' },
]

const CATS: NoticeCategory[] = ['Academic', 'Examination', 'Admission', 'Tender', 'Placement', 'Event', 'General']
const input = 'h-10 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100'
const label = 'block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1'

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('Dashboard')
  const { content, isDirty, reset } = useCms()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="bg-mist">
      <div className="container-x py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="eyebrow">Content Management System</span>
            <h1 className="font-display text-2xl font-bold text-ink">IET DAVV · Admin Console</h1>
          </div>
          <div className="flex items-center gap-2">
            {isDirty && (
              <button onClick={() => confirm('Discard all local edits and restore the published content?') && reset()} className="btn btn-secondary !py-2 text-xs">
                <RotateCcw className="h-4 w-4" /> Reset to defaults
              </button>
            )}
            <Link to="/" className="btn btn-primary !py-2 text-xs">
              <Eye className="h-4 w-4" /> View site
            </Link>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <aside className="card h-fit p-3 lg:col-span-3">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-navy-50 p-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-600 text-sm font-bold text-white">
                {(user?.name ?? 'A').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">{user?.name}</p>
                <p className="truncate text-xs text-slate-500">{user?.role} · {user?.email}</p>
              </div>
            </div>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.l}>
                  <button onClick={() => setTab(n.l)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${tab === n.l ? 'bg-navy-600 text-white shadow-soft' : 'text-slate-700 hover:bg-mist'}`}>
                    <n.i className="h-4 w-4" />
                    {n.l}
                    <span className={`ml-auto rounded-md px-1.5 text-[11px] ${tab === n.l ? 'bg-white/20' : 'bg-mist text-slate-500'}`}>{countFor(n.l, content)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 px-3 text-[11px] leading-relaxed text-slate-400">Prototype: edits are saved in this browser (localStorage). A production deployment would connect these screens to the institute's database and authentication.</p>
            <button
              onClick={() => { signOut(); navigate('/admin/login', { replace: true }) }}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </aside>

          <div className="min-w-0 space-y-5 lg:col-span-9">
            {tab === 'Dashboard' && <Dashboard go={setTab} />}
            {tab === 'Notices' && <NoticesAdmin />}
            {tab === 'Events' && <EventsAdmin />}
            {tab === 'News' && <NewsAdmin />}
            {tab === 'Pages' && <PagesAdmin />}
            {tab === 'Media' && <MediaAdmin />}
            {tab === 'Documents' && <DocumentsAdmin />}
            {tab === 'Videos' && <VideosAdmin />}
            {tab === 'Settings' && <SettingsAdmin />}
          </div>
        </div>
      </div>
    </div>
  )
}

function countFor(t: Tab, c: ReturnType<typeof useCms>['content']) {
  switch (t) {
    case 'Notices': return c.notices.length
    case 'Events': return c.events.length
    case 'News': return c.news.length
    case 'Pages': return c.pages.length
    case 'Media': return c.media.length
    case 'Documents': return c.documents.length
    case 'Videos': return c.videos.length
    default: return ''
  }
}

function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h2 className="font-display font-bold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  )
}

function Dashboard({ go }: { go: (t: Tab) => void }) {
  const { content } = useCms()
  const stats = [
    ['Published notices', content.notices.filter((n) => n.published).length, 'Notices'],
    ['Upcoming events', content.events.filter((e) => e.published).length, 'Events'],
    ['CMS pages', content.pages.length, 'Pages'],
    ['Media assets', content.media.length + content.documents.length, 'Media'],
  ] as const
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([l, v, t], i) => (
          <motion.button key={l} onClick={() => go(t)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card card-hover p-5 text-left">
            <p className="text-xs font-medium text-slate-500">{l}</p>
            <p className="font-display mt-1 text-3xl font-extrabold text-ink">{v}</p>
          </motion.button>
        ))}
      </div>
      <Panel title="Recent notices" action={<button onClick={() => go('Notices')} className="text-sm font-semibold text-navy-600 hover:underline">Manage</button>}>
        <ul className="divide-y divide-line">
          {content.notices.slice(0, 6).map((n) => (
            <li key={n.id} className="flex items-center gap-3 px-5 py-3 text-sm">
              <span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{n.category}</span>
              <span className="min-w-0 flex-1 truncate font-medium text-ink">{n.title}</span>
              <span className="text-xs text-slate-500">{fmtDate(n.date)}</span>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-5 md:grid-cols-2">
        <Panel title="Quick actions">
          <div className="grid grid-cols-2 gap-2 p-4">
            {(['Notices', 'Events', 'News', 'Pages'] as Tab[]).map((t) => (
              <button key={t} onClick={() => go(t)} className="btn btn-secondary !py-2 text-xs"><Plus className="h-4 w-4" /> New {t.replace(/s$/, '').toLowerCase()}</button>
            ))}
          </div>
        </Panel>
        <Panel title="Site">
          <ul className="space-y-2 p-4 text-sm text-slate-700">
            <li><span className="font-semibold text-ink">{content.settings.name}</span></li>
            <li>{content.settings.university}</li>
            <li>{content.settings.address}</li>
            <li>{content.settings.phones.join(' / ')} · {content.settings.email}</li>
          </ul>
        </Panel>
      </div>
    </>
  )
}

/* ---------- Notices ---------- */
function NoticesAdmin() {
  const { content, upsertNotice, deleteNotice } = useCms()
  const [editing, setEditing] = useState<Notice | null>(null)
  const [q, setQ] = useState('')
  const list = useMemo(() => content.notices.filter((n) => n.title.toLowerCase().includes(q.toLowerCase())), [content.notices, q])
  const blank = (): Notice => ({ id: uid(), title: '', date: new Date().toISOString().slice(0, 10), category: 'General', url: '', isNew: true, published: true })

  return (
    <Panel
      title={`Notices (${content.notices.length})`}
      action={
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className={`${input} !h-9 w-44`} />
          <button onClick={() => setEditing(blank())} className="btn btn-primary !px-3 !py-2 text-xs"><Plus className="h-4 w-4" /> New notice</button>
        </div>
      }
    >
      <AnimatePresence>{editing && <NoticeForm key={editing.id} value={editing} onCancel={() => setEditing(null)} onSave={(n) => { upsertNotice(n); setEditing(null) }} />}</AnimatePresence>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-mist text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr><th className="px-5 py-3">Title</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((n) => (
              <tr key={n.id} className="hover:bg-mist">
                <td className="max-w-md px-5 py-3 font-medium text-ink"><span className="line-clamp-2">{n.title}</span>{n.url && <a href={n.url} target="_blank" rel="noreferrer" className="block truncate text-xs text-navy-600 hover:underline">{n.url}</a>}</td>
                <td className="px-5 py-3"><span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{n.category}</span></td>
                <td className="whitespace-nowrap px-5 py-3 text-slate-600">{fmtDate(n.date)}</td>
                <td className="px-5 py-3">
                  <button onClick={() => upsertNotice({ ...n, published: !n.published })} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${n.published ? 'bg-emerald-50 text-emerald-700' : 'bg-saffron-100 text-saffron-600'}`}>{n.published ? 'Published' : 'Draft'}</button>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right">
                  <button onClick={() => setEditing(n)} className="rounded-lg p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy-600" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => confirm('Delete this notice?') && deleteNotice(n.id)} className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function FormShell({ title, onCancel, onSave, children }: { title: string; onCancel: () => void; onSave: () => void; children: ReactNode }) {
  return (
    <motion.form
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      onSubmit={(e) => { e.preventDefault(); onSave() }}
      className="overflow-hidden border-b border-line bg-navy-50/50"
    >
      <div className="p-5">
        <p className="mb-4 text-sm font-bold text-ink">{title}</p>
        <div className="grid gap-4 md:grid-cols-2">{children}</div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="btn btn-primary !py-2 text-xs"><Save className="h-4 w-4" /> Save & publish</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary !py-2 text-xs"><X className="h-4 w-4" /> Cancel</button>
        </div>
      </div>
    </motion.form>
  )
}

function NoticeForm({ value, onSave, onCancel }: { value: Notice; onSave: (n: Notice) => void; onCancel: () => void }) {
  const [n, setN] = useState(value)
  return (
    <FormShell title={value.title ? 'Edit notice' : 'New notice'} onCancel={onCancel} onSave={() => n.title && onSave(n)}>
      <label className="md:col-span-2"><span className={label}>Title</span><input required value={n.title} onChange={(e) => setN({ ...n, title: e.target.value })} className={input} /></label>
      <label><span className={label}>Date</span><input type="date" value={n.date} onChange={(e) => setN({ ...n, date: e.target.value })} className={input} /></label>
      <label><span className={label}>Category</span><select value={n.category} onChange={(e) => setN({ ...n, category: e.target.value as NoticeCategory })} className={input}>{CATS.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label className="md:col-span-2"><span className={label}>Document / link URL</span><input value={n.url ?? ''} onChange={(e) => setN({ ...n, url: e.target.value })} placeholder="https://notices.ietdavv.edu.in/?notice_file=..." className={input} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!n.isNew} onChange={(e) => setN({ ...n, isNew: e.target.checked })} /> Mark as NEW</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={n.published} onChange={(e) => setN({ ...n, published: e.target.checked })} /> Published</label>
    </FormShell>
  )
}

/* ---------- Events ---------- */
function EventsAdmin() {
  const { content, upsertEvent, deleteEvent } = useCms()
  const [editing, setEditing] = useState<EventItem | null>(null)
  const blank = (): EventItem => ({ id: uid(), title: '', date: new Date().toISOString().slice(0, 10), time: '', venue: '', type: 'Event', published: true })
  return (
    <Panel title={`Events (${content.events.length})`} action={<button onClick={() => setEditing(blank())} className="btn btn-primary !px-3 !py-2 text-xs"><Plus className="h-4 w-4" /> New event</button>}>
      <AnimatePresence>
        {editing && (
          <EventForm key={editing.id} value={editing} onCancel={() => setEditing(null)} onSave={(e) => { upsertEvent(e); setEditing(null) }} />
        )}
      </AnimatePresence>
      <ul className="divide-y divide-line">
        {content.events.map((e) => (
          <li key={e.id} className="flex items-center gap-4 px-5 py-3 text-sm hover:bg-mist">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-600 text-white"><span className="font-display text-lg font-bold leading-none">{new Date(e.date).getDate() || '—'}</span><span className="text-[10px] uppercase">{new Date(e.date).toLocaleString('en', { month: 'short' })}</span></div>
            <div className="min-w-0 flex-1"><p className="font-medium text-ink">{e.title}</p><p className="text-xs text-slate-500">{e.type} · {e.time} · {e.venue}</p></div>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${e.published ? 'bg-emerald-50 text-emerald-700' : 'bg-saffron-100 text-saffron-600'}`}>{e.published ? 'Published' : 'Draft'}</span>
            <button onClick={() => setEditing(e)} className="rounded-lg p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy-600"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => confirm('Delete this event?') && deleteEvent(e.id)} className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function EventForm({ value, onSave, onCancel }: { value: EventItem; onSave: (e: EventItem) => void; onCancel: () => void }) {
  const [e, setE] = useState(value)
  return (
    <FormShell title={value.title ? 'Edit event' : 'New event'} onCancel={onCancel} onSave={() => e.title && onSave(e)}>
      <label className="md:col-span-2"><span className={label}>Title</span><input required value={e.title} onChange={(ev) => setE({ ...e, title: ev.target.value })} className={input} /></label>
      <label><span className={label}>Date</span><input type="date" value={e.date} onChange={(ev) => setE({ ...e, date: ev.target.value })} className={input} /></label>
      <label><span className={label}>Time</span><input value={e.time ?? ''} onChange={(ev) => setE({ ...e, time: ev.target.value })} className={input} /></label>
      <label><span className={label}>Venue</span><input value={e.venue ?? ''} onChange={(ev) => setE({ ...e, venue: ev.target.value })} className={input} /></label>
      <label><span className={label}>Type</span><input value={e.type} onChange={(ev) => setE({ ...e, type: ev.target.value })} className={input} /></label>
      <label className="md:col-span-2"><span className={label}>Link (optional)</span><input value={e.url ?? ''} onChange={(ev) => setE({ ...e, url: ev.target.value })} className={input} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={e.published} onChange={(ev) => setE({ ...e, published: ev.target.checked })} /> Published</label>
    </FormShell>
  )
}

/* ---------- News ---------- */
function NewsAdmin() {
  const { content, upsertNews, deleteNews } = useCms()
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const blank = (): NewsItem => ({ id: uid(), title: '', excerpt: '', date: new Date().toISOString().slice(0, 10), tag: 'News', image: '', published: true })
  return (
    <Panel title={`News & achievements (${content.news.length})`} action={<button onClick={() => setEditing(blank())} className="btn btn-primary !px-3 !py-2 text-xs"><Plus className="h-4 w-4" /> New story</button>}>
      <AnimatePresence>
        {editing && (
          <NewsForm key={editing.id} value={editing} onCancel={() => setEditing(null)} onSave={(n) => { upsertNews(n); setEditing(null) }} />
        )}
      </AnimatePresence>
      <ul className="divide-y divide-line">
        {content.news.map((n) => (
          <li key={n.id} className="flex items-center gap-4 px-5 py-3 text-sm hover:bg-mist">
            {n.image ? <img src={n.image} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" /> : <div className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-mist text-slate-400"><Image className="h-4 w-4" /></div>}
            <div className="min-w-0 flex-1"><p className="font-medium text-ink">{n.title}</p><p className="text-xs text-slate-500">{n.tag} · {fmtDate(n.date)}</p></div>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${n.published ? 'bg-emerald-50 text-emerald-700' : 'bg-saffron-100 text-saffron-600'}`}>{n.published ? 'Published' : 'Draft'}</span>
            <button onClick={() => setEditing(n)} className="rounded-lg p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy-600"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => confirm('Delete this story?') && deleteNews(n.id)} className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function NewsForm({ value, onSave, onCancel }: { value: NewsItem; onSave: (n: NewsItem) => void; onCancel: () => void }) {
  const [n, setN] = useState(value)
  const { content } = useCms()
  return (
    <FormShell title={value.title ? 'Edit story' : 'New story'} onCancel={onCancel} onSave={() => n.title && onSave(n)}>
      <label className="md:col-span-2"><span className={label}>Title</span><input required value={n.title} onChange={(e) => setN({ ...n, title: e.target.value })} className={input} /></label>
      <label className="md:col-span-2"><span className={label}>Excerpt</span><textarea rows={3} value={n.excerpt} onChange={(e) => setN({ ...n, excerpt: e.target.value })} className={`${input} h-auto py-2`} /></label>
      <label><span className={label}>Date</span><input type="date" value={n.date} onChange={(e) => setN({ ...n, date: e.target.value })} className={input} /></label>
      <label><span className={label}>Tag</span><input value={n.tag} onChange={(e) => setN({ ...n, tag: e.target.value })} className={input} /></label>
      <label className="md:col-span-2"><span className={label}>Image (from media library)</span>
        <select value={n.image ?? ''} onChange={(e) => setN({ ...n, image: e.target.value })} className={input}>
          <option value="">— none —</option>
          {content.media.filter((m) => /\.(jpe?g|png|webp)$/i.test(m.path)).map((m) => <option key={m.path} value={m.path}>{m.alt || m.path}</option>)}
        </select>
      </label>
      <label className="md:col-span-2"><span className={label}>Link (optional)</span><input value={n.url ?? ''} onChange={(e) => setN({ ...n, url: e.target.value })} className={input} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={n.published} onChange={(e) => setN({ ...n, published: e.target.checked })} /> Published</label>
    </FormShell>
  )
}

/* ---------- Pages ---------- */
function PagesAdmin() {
  const { content, upsertPage } = useCms()
  const [slug, setSlug] = useState(content.pages[0]?.slug ?? '')
  const page = content.pages.find((p) => p.slug === slug)
  const [draft, setDraft] = useState<CmsPage | null>(null)
  const current = draft && draft.slug === slug ? draft : page
  const [saved, setSaved] = useState(false)

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="card h-fit p-2 lg:col-span-4">
        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Pages</p>
        <ul className="max-h-[70vh] overflow-y-auto">
          {content.pages.map((p) => (
            <li key={p.slug}>
              <button onClick={() => { setSlug(p.slug); setDraft(null) }} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${slug === p.slug ? 'bg-navy-600 font-semibold text-white' : 'text-slate-700 hover:bg-mist'}`}>
                {p.title}
                <span className={`block truncate text-[11px] ${slug === p.slug ? 'text-navy-100' : 'text-slate-400'}`}>/{p.slug}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-8">
        {current && (
          <Panel
            title={`Edit: ${current.title}`}
            action={
              <div className="flex items-center gap-2">
                <Link to={`/page/${current.slug}`} className="btn btn-secondary !py-2 text-xs"><Eye className="h-4 w-4" /> Preview</Link>
                <button onClick={() => { upsertPage({ ...current, updatedAt: new Date().toISOString() }); setDraft(null); setSaved(true); setTimeout(() => setSaved(false), 1500) }} className="btn btn-primary !py-2 text-xs">{saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />} {saved ? 'Saved' : 'Publish'}</button>
              </div>
            }
          >
            <div className="space-y-4 p-5">
              <label><span className={label}>Title</span><input value={current.title} onChange={(e) => setDraft({ ...current, title: e.target.value })} className={input} /></label>
              <label><span className={label}>Intro</span><textarea rows={2} value={current.intro ?? ''} onChange={(e) => setDraft({ ...current, intro: e.target.value })} className={`${input} h-auto py-2`} /></label>
              {current.sections.map((s, i) => (
                <div key={i} className="rounded-xl border border-line p-4">
                  <label><span className={label}>Section heading</span><input value={s.heading ?? ''} onChange={(e) => setDraft({ ...current, sections: current.sections.map((x, j) => (j === i ? { ...x, heading: e.target.value } : x)) })} className={input} /></label>
                  <label className="mt-3 block"><span className={label}>Body (Markdown)</span><textarea rows={10} value={s.body} onChange={(e) => setDraft({ ...current, sections: current.sections.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)) })} className={`${input} h-auto py-2 font-mono text-xs`} /></label>
                  <button type="button" onClick={() => setDraft({ ...current, sections: current.sections.filter((_, j) => j !== i) })} className="mt-2 text-xs font-semibold text-rose-600 hover:underline">Remove section</button>
                </div>
              ))}
              <button type="button" onClick={() => setDraft({ ...current, sections: [...current.sections, { heading: 'New section', body: '' }] })} className="btn btn-secondary !py-2 text-xs"><Plus className="h-4 w-4" /> Add section</button>
              {current.source && <p className="text-xs text-slate-400">Source: <a href={current.source} target="_blank" rel="noreferrer" className="underline">{current.source}</a></p>}
            </div>
          </Panel>
        )}
      </div>
    </div>
  )
}

/* ---------- Media / Documents / Videos / Settings ---------- */
function MediaAdmin() {
  const { content } = useCms()
  const [filter, setFilter] = useState('all')
  const tags = useMemo(() => ['all', ...new Set(content.media.flatMap((m) => m.tags))], [content.media])
  const list = content.media.filter((m) => filter === 'all' || m.tags.includes(filter))
  return (
    <Panel title={`Media library (${content.media.length})`} action={<select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${input} !h-9 w-44`}>{tags.map((t) => <option key={t}>{t}</option>)}</select>}>
      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((m) => (
          <figure key={m.path} className="overflow-hidden rounded-xl border border-line bg-white">
            <img src={m.path} alt={m.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="p-2">
              <p className="truncate text-xs font-semibold text-ink">{m.alt}</p>
              <p className="truncate text-[11px] text-slate-400">{m.path}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Panel>
  )
}

function DocumentsAdmin() {
  const { content } = useCms()
  return (
    <Panel title={`Documents (${content.documents.length})`}>
      <ul className="divide-y divide-line">
        {content.documents.map((d) => (
          <li key={d.id} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-mist">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600"><FileText className="h-4 w-4" /></span>
            <div className="min-w-0 flex-1"><p className="truncate font-medium text-ink">{d.title}</p><p className="truncate text-xs text-slate-500">{d.category} · <a href={d.url} target="_blank" rel="noreferrer" className="text-navy-600 hover:underline">{d.url}</a></p></div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function VideosAdmin() {
  const { content } = useCms()
  return (
    <Panel title={`Videos (${content.videos.length})`}>
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.videos.map((v) => (
          <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="overflow-hidden rounded-xl border border-line">
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" className="aspect-video w-full object-cover" />
            <p className="line-clamp-2 p-2 text-xs font-semibold text-ink">{v.title}</p>
          </a>
        ))}
      </div>
    </Panel>
  )
}

function SettingsAdmin() {
  const { content, update } = useCms()
  const s = content.settings
  const set = (patch: Partial<typeof s>) => update((c) => ({ ...c, settings: { ...c.settings, ...patch } }))
  return (
    <Panel title="Site settings">
      <div className="grid gap-4 p-5 md:grid-cols-2">
        <label><span className={label}>Institute name</span><input value={s.name} onChange={(e) => set({ name: e.target.value })} className={input} /></label>
        <label><span className={label}>University</span><input value={s.university} onChange={(e) => set({ university: e.target.value })} className={input} /></label>
        <label className="md:col-span-2"><span className={label}>Address</span><input value={s.address} onChange={(e) => set({ address: e.target.value })} className={input} /></label>
        <label><span className={label}>Phones (comma separated)</span><input value={s.phones.join(', ')} onChange={(e) => set({ phones: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} className={input} /></label>
        <label><span className={label}>Email</span><input value={s.email} onChange={(e) => set({ email: e.target.value })} className={input} /></label>
        <label><span className={label}>Motto</span><input value={s.motto} onChange={(e) => set({ motto: e.target.value })} className={input} /></label>
        <label><span className={label}>YouTube</span><input value={s.social.youtube} onChange={(e) => set({ social: { ...s.social, youtube: e.target.value } })} className={input} /></label>
      </div>
    </Panel>
  )
}
