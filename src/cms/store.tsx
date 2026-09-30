import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultContent } from './defaultContent'
import type { CmsContent, CmsPage, EventItem, FacultyMember, MediaItem, NewsItem, Notice, Tender } from './types'

const KEY = 'ietdavv-cms-content-v1'

type Store = {
  content: CmsContent
  isDirty: boolean
  update: (patch: Partial<CmsContent> | ((c: CmsContent) => CmsContent)) => void
  reset: () => void
  upsertNotice: (n: Notice) => void
  deleteNotice: (id: string) => void
  upsertEvent: (e: EventItem) => void
  deleteEvent: (id: string) => void
  upsertNews: (n: NewsItem) => void
  deleteNews: (id: string) => void
  upsertTender: (t: Tender) => void
  deleteTender: (id: string) => void
  upsertPage: (p: CmsPage) => void
  /** Insert a media item, or replace the one currently at `originalPath`. */
  upsertMedia: (m: MediaItem, originalPath?: string) => void
  deleteMedia: (path: string) => void
  /** New members are added at the end of the list; existing ones are replaced in place. */
  upsertFaculty: (m: FacultyMember) => void
  deleteFaculty: (id: string) => void
  /** Set when the browser refused to save (usually localStorage quota exceeded). */
  saveError: string | null
}

const Ctx = createContext<Store | null>(null)

function load(): { content: CmsContent; dirty: boolean } {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<CmsContent>
      // portal links aren't editable in the admin, so always take them from code (keeps URL updates from being masked by old saves)
      const settings = { ...defaultContent.settings, ...(saved.settings ?? {}), links: defaultContent.settings.links }
      return { content: { ...defaultContent, ...saved, settings }, dirty: true }
    }
  } catch {
    /* ignore */
  }
  return { content: defaultContent, dirty: false }
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [{ content, dirty }, setState] = useState(load)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (!dirty) return
    try {
      const { videos, documents, ...rest } = content
      void videos
      void documents
      localStorage.setItem(KEY, JSON.stringify(rest))
      setSaveError(null)
    } catch {
      setSaveError('Browser storage is full — the latest change was not saved. Remove some uploaded images or use image URLs instead.')
    }
  }, [content, dirty])

  const update = useCallback<Store['update']>((patch) => {
    setState((s) => ({ dirty: true, content: typeof patch === 'function' ? patch(s.content) : { ...s.content, ...patch } }))
  }, [])

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
    setState({ content: defaultContent, dirty: false })
    setSaveError(null)
  }, [])

  const upsert = <T extends { id: string }>(list: T[], item: T) => {
    const i = list.findIndex((x) => x.id === item.id)
    if (i === -1) return [item, ...list]
    const copy = [...list]
    copy[i] = item
    return copy
  }

  const value = useMemo<Store>(
    () => ({
      content,
      isDirty: dirty,
      update,
      reset,
      upsertNotice: (n) => update((c) => ({ ...c, notices: upsert(c.notices, n) })),
      deleteNotice: (id) => update((c) => ({ ...c, notices: c.notices.filter((x) => x.id !== id) })),
      upsertEvent: (e) => update((c) => ({ ...c, events: upsert(c.events, e) })),
      deleteEvent: (id) => update((c) => ({ ...c, events: c.events.filter((x) => x.id !== id) })),
      upsertNews: (n) => update((c) => ({ ...c, news: upsert(c.news, n) })),
      deleteNews: (id) => update((c) => ({ ...c, news: c.news.filter((x) => x.id !== id) })),
      upsertTender: (t) => update((c) => ({ ...c, tenders: upsert(c.tenders, t) })),
      deleteTender: (id) => update((c) => ({ ...c, tenders: c.tenders.filter((x) => x.id !== id) })),
      upsertPage: (p) =>
        update((c) => {
          const i = c.pages.findIndex((x) => x.slug === p.slug)
          const pages = [...c.pages]
          if (i === -1) pages.push(p)
          else pages[i] = p
          return { ...c, pages }
        }),
      upsertMedia: (m, originalPath) =>
        update((c) => {
          const i = originalPath === undefined ? -1 : c.media.findIndex((x) => x.path === originalPath)
          if (i === -1) return { ...c, media: [m, ...c.media] }
          const media = [...c.media]
          media[i] = m
          // keep news stories that use this image pointing at it
          const news = m.path === originalPath ? c.news : c.news.map((n) => (n.image === originalPath ? { ...n, image: m.path } : n))
          return { ...c, media, news }
        }),
      deleteMedia: (path) => update((c) => ({ ...c, media: c.media.filter((x) => x.path !== path) })),
      upsertFaculty: (m) =>
        update((c) => {
          // a department has one Head: appointing a new one clears the flag on the previous Head
          const others = m.headOf ? c.faculty.map((x) => (x.id !== m.id && x.headOf === m.headOf ? { ...x, headOf: undefined } : x)) : c.faculty
          const i = others.findIndex((x) => x.id === m.id)
          if (i === -1) return { ...c, faculty: [...others, m] }
          const faculty = [...others]
          faculty[i] = m
          return { ...c, faculty }
        }),
      deleteFaculty: (id) => update((c) => ({ ...c, faculty: c.faculty.filter((x) => x.id !== id) })),
      saveError,
    }),
    [content, dirty, update, reset, saveError],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCms() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useCms must be used inside CmsProvider')
  return s
}

export function usePage(slug: string) {
  const { content } = useCms()
  return content.pages.find((p) => p.slug === slug)
}

export function fmtDate(iso: string) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const uid = () => Math.random().toString(36).slice(2, 10)

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Open until the end of its last date; tenders without a last date have no status. */
export function tenderStatus(t: { lastDate?: string }): 'Open' | 'Closed' | null {
  if (!t.lastDate) return null
  return t.lastDate >= today() ? 'Open' : 'Closed'
}
