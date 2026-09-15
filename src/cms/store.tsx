import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultContent } from './defaultContent'
import type { CmsContent, CmsPage, EventItem, NewsItem, Notice } from './types'

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
  upsertPage: (p: CmsPage) => void
}

const Ctx = createContext<Store | null>(null)

function load(): { content: CmsContent; dirty: boolean } {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<CmsContent>
      return { content: { ...defaultContent, ...saved, settings: { ...defaultContent.settings, ...(saved.settings ?? {}) } }, dirty: true }
    }
  } catch {
    /* ignore */
  }
  return { content: defaultContent, dirty: false }
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [{ content, dirty }, setState] = useState(load)

  useEffect(() => {
    if (!dirty) return
    try {
      const { media, videos, documents, ...rest } = content
      void media
      void videos
      void documents
      localStorage.setItem(KEY, JSON.stringify(rest))
    } catch {
      /* ignore */
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
      upsertPage: (p) =>
        update((c) => {
          const i = c.pages.findIndex((x) => x.slug === p.slug)
          const pages = [...c.pages]
          if (i === -1) pages.push(p)
          else pages[i] = p
          return { ...c, pages }
        }),
    }),
    [content, dirty, update, reset],
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
