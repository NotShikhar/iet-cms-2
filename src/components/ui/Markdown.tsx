import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FileText } from 'lucide-react'

export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`cms-prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const isDoc = /\.pdf(\?|$)|notice_file=|drive\.google/i.test(href ?? '')
            return (
              <a href={href} target="_blank" rel="noreferrer" className={isDoc ? 'doc-link' : undefined}>
                {isDoc && <FileText className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />}
                {children}
              </a>
            )
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
