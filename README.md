# IET DAVV Indore — CMS Website Prototype

A modern, light-theme website and content-management prototype for the **Institute of Engineering & Technology, Devi Ahilya Vishwavidyalaya, Indore**, built on the institute's own published content.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. Production build: `npm run build` (output in `dist/`), preview with `npm run preview`.

## Stack

- React 19 + TypeScript (Vite)
- Tailwind CSS v4 with a navy / saffron / teal design system (`src/index.css`)
- Framer Motion for section reveals, counters, menus and page transitions (no animated imagery)
- React Router v7, react-markdown + remark-gfm for CMS page bodies

## Where the content comes from

All text, images, documents and videos were collected from the institute's official sites:

| Source | Used for |
| --- | --- |
| https://ietdavv.edu.in/ (Joomla site) | About, programmes, committees, admission notices, results, time tables, syllabus, scholarships, hostel contacts, tenders, ISHRAE, strategic plan, placement posters |
| https://ietdavv.edu.in/ietnew/ (WordPress site) | About IET/DAVV, vision & mission, Director's and Vice Chancellor's messages, Administrative Officer, campus photographs, admission brochures, anti-ragging documents |
| https://notices.ietdavv.edu.in/ | Notice board (22 notices with PDFs) |
| https://times.ietdavv.edu.in/ | IET Times news articles and images |
| Institute PDFs (`IET_Profile.pdf`, `hostel_info.pdf`, `Admission_Guideline_BTech.pdf`, `CLC_Notice_IET.pdf`, `Counsellor_Menter.pdf`) | Faculty research metrics, HODs, placements, recruiters, research projects, alumni, hostels, fees |
| GDSC site, YouTube channel @blastatiet | Club information and videos |

Downloaded media lives in `public/media/` (`main/`, `ietnew/`, `notices/`, `times/`). Large document sets that remain on institute servers (results, time tables, syllabus PDFs) are linked to their original URLs.

## Home page

The hero is a self-running slideshow of six institute photographs: the image changes every 3 seconds with a 0.7s crossfade, and the next photograph is preloaded so the cadence never stutters. There are no arrows, dots or play controls — only a small caption naming the photograph on screen. Visitors whose system asks for reduced motion see a single still photograph instead. Slides are defined in `heroSlides` (`src/data/content.ts`).

A scrolling notice ticker sits above the hero, and a "Campus in pictures" grid of ten more photographs sits in the campus-life section (`campusGallery`).

Slideshow and gallery images are web-sized WebP copies in `public/media/hero/` (2 MB total, down from 9.6 MB of originals); the full-resolution originals remain in `public/media/ietnew/` and `public/media/times/`. Hero frames are generated at 1800x900 with `withoutEnlargement`, so no photograph is ever upscaled — the two low-resolution campus shots (A-Block, M-Block) are used only in the gallery, where they are shown small and stay sharp.

## Recruiter wall

The placement section on the home page and the Placements page both render `RecruiterWall` — two rows of company tiles scrolling continuously in opposite directions (52s per loop, edge-faded, stopped for `prefers-reduced-motion`). Each tile carries its own right margin rather than flex `gap`, so translating -50% lands exactly one copy along and the loop has no visible jump.

**Logos.** 21 of the 24 recruiters ship a real logo in `public/media/recruiters/` (580 kB total).
They were taken from the company's Wikipedia article infobox where one exists, otherwise from the
company's own website, then trimmed and normalised to a 600x176 transparent PNG so every tile
renders at a consistent 164x48.

ZS Associates, CoreEL and Appalto Electronics publish no usable logo file — no Wikipedia article,
ZS renders its mark as inline SVG, the CoreEL site returns HTTP 500, and Appalto ships only a white
knockout that would be invisible on a white tile — so those three fall back to a wordmark tile.

To change or add one, drop a file in `public/media/recruiters/` and set the `logo` field on that
company in `recruiters` (`src/data/content.ts`). Company logos are trademarks of their owners;
naming recruiters on a placement page is ordinary practice, but the institute should confirm it is
content to reproduce the marks.

## CMS layer

- `src/cms/types.ts` – content model (settings, notices, events, news, pages, documents, media, videos)
- `src/cms/generated.ts` – generated from the crawl (notices, news, documents, media, videos)
- `src/cms/pages.ts` – institutional pages as Markdown sections (verbatim institute text)
- `src/cms/defaultContent.ts` – site settings, events and the assembled default content
- `src/cms/store.tsx` – `CmsProvider` / `useCms()`; edits made in the admin console persist in the browser's localStorage and can be reset

`/admin/login` is the sign-in page and `/admin` is the console behind it: dashboard, notices (create / edit / publish / delete), events, news, page editor (Markdown sections with preview), media library, documents, videos and site settings. A production deployment would connect these screens to a backend and authentication.

**Sign-in (prototype).** `/admin` redirects to `/admin/login` unless a session exists; the session lives in `sessionStorage` and ends when the tab closes. Demo accounts are `admin / iet@2026` (Administrator) and `editor / iet@2026` (Editor), shown on the login page itself. The credential check runs in the browser (`src/cms/auth.tsx`), so the accounts are readable in the JavaScript bundle and the gate can be bypassed — it demonstrates the flow and is not security. A live deployment must authenticate on the server against institute/DAVV accounts and protect the admin API there.

## Routes

`/`, `/about`, `/academics`, `/departments`, `/departments/:slug`, `/admissions`, `/placements`, `/campus-life`, `/notices`, `/contact`, `/page/:slug` (33 CMS pages), `/admin`.

## Notes

- Content reflects the sites as crawled on 15 September 2026. Update `src/cms/pages.ts` or use the admin console for changes.
- The E-Cell domain listed on the institute site (ecellietdavv.in) currently serves unrelated third-party content and is deliberately not linked.
