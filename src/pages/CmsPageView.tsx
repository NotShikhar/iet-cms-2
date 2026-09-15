import { ExternalLink, FileText } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Markdown } from '../components/ui/Markdown'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { useCms, usePage } from '../cms/store'

export default function CmsPageView() {
  const { slug = '' } = useParams()
  const page = usePage(slug)
  const { content } = useCms()
  if (!page) return <Navigate to="/" replace />
  const related = content.pages.filter((p) => p.eyebrow === page.eyebrow && p.slug !== page.slug).slice(0, 8)
  const docs = content.documents.filter((d) => d.category.toLowerCase() === (page.eyebrow ?? '').toLowerCase()).slice(0, 8)

  return (
    <>
      <PageHero eyebrow={page.eyebrow ?? 'IET DAVV'} title={page.title} description={page.intro} crumbs={[{ label: page.eyebrow ?? 'Pages' }, { label: page.title }]} image={page.hero} />
      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            {page.sections.map((s, i) => (
              <Reveal key={i} className={i > 0 ? 'mt-10' : ''}>
                {s.heading && <h2 className="font-display mb-3 text-2xl font-bold text-ink">{s.heading}</h2>}
                <Markdown>{s.body}</Markdown>
              </Reveal>
            ))}
            {page.source && (
              <p className="mt-10 text-xs text-slate-400">
                Source: <a href={page.source} target="_blank" rel="noreferrer" className="break-all underline">{page.source}</a>
              </p>
            )}
          </div>
          <aside className="space-y-5 lg:col-span-4">
            {related.length > 0 && (
              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{page.eyebrow}</p>
                <ul className="mt-3 space-y-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/page/${p.slug}`} className="text-sm font-medium text-slate-700 hover:text-navy-600">{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {docs.length > 0 && (
              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Documents</p>
                <ul className="mt-3 space-y-2">
                  {docs.map((d) => (
                    <li key={d.id}>
                      <a href={d.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm font-medium text-slate-700 hover:text-navy-600">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                        {d.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Official portals</p>
              <ul className="mt-3 space-y-2 text-sm">
                {Object.entries(content.settings.links).map(([k, v]) => (
                  <li key={k}>
                    <a href={v} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-navy-600">
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                      {k}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
