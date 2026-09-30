// Snapshots the detailed faculty profiles from the One IET portal into public/faculty-profiles/<id>.json.
// The portal has no CORS headers, so the site can't read it live; re-run this to refresh:
//   node scripts/import-faculty-profiles.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const PORTAL = 'https://one.ietdavv.edu.in/'
const OUT = new URL('../public/faculty-profiles/', import.meta.url)

// Faculty ids come from the CMS seed data (id "f59" = portal faculty_id 59)
const src = await readFile(new URL('../src/cms/faculty.ts', import.meta.url), 'utf8')
const ids = [...src.matchAll(/id: 'f(\d+)'/g)].map((m) => Number(m[1]))

const text = (c) => (c && typeof c === 'object' ? c.text ?? '' : c ?? '').replace(/\s+/g, ' ').trim()
const align = (c) => (c && typeof c === 'object' && ['center', 'right', 'justify'].includes(c.align) ? c.align : undefined)

// Drop the "Date / Place / Dr Name" signature lines at the end of scanned CVs
function clean(sections) {
  return sections
    .map((s) => {
      const blocks = s.blocks ?? []
      const out = []
      blocks.forEach((b, i) => {
        const nearEnd = i >= blocks.length - 4
        if (b.type === 'table') {
          const rows = (b.rows ?? []).map((r) => r.map((c) => ({ text: text(c), align: align(c) })))
          const flat = rows.flat().map((c) => c.text).join(' ')
          if (/\bDate\b/i.test(flat) && /\bPlace\b/i.test(flat) && /\bDr\.?\s/i.test(flat) && flat.length < 200) return
          if (rows.flat().every((c) => !c.text)) return
          out.push({ type: 'table', rows })
        } else {
          const t = text(b.text)
          if (!t) return
          if (nearEnd && (/^(Date|Place)\b/i.test(t) || (/^Dr\.?\s/i.test(t) && t.length < 60))) return
          out.push({ type: 'paragraph', text: t, align: align(b) })
        }
      })
      return { title: text(s.title) || 'Profile', blocks: out }
    })
    .filter((s) => s.blocks.length)
}

await mkdir(OUT, { recursive: true })
let withProfile = 0
for (const id of ids) {
  const res = await fetch(`${PORTAL}facultyprofile.php?public=1&action=view_profile&faculty_id=${id}`)
  const { success, profile: p } = await res.json()
  if (!success) {
    console.warn(`f${id}: ${res.status} not available`)
    continue
  }
  let sections = []
  try {
    sections = clean(JSON.parse(p.profile_sections || '[]'))
  } catch {
    /* profile not filled in */
  }
  if (sections.length) withProfile++
  const data = {
    id: `f${id}`,
    departments: p.departments || p.department || '',
    joined: p.doj || undefined,
    cv: p.resume_docx ? PORTAL + p.resume_docx : undefined,
    sections,
  }
  await writeFile(new URL(`f${id}.json`, OUT), JSON.stringify(data))
}
console.log(`Saved ${ids.length} profiles (${withProfile} with detailed sections) to public/faculty-profiles/`)
