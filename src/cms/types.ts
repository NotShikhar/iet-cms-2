export type NoticeCategory = 'Academic' | 'Examination' | 'Admission' | 'Tender' | 'Placement' | 'Event' | 'General'

export type Notice = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  category: NoticeCategory
  url?: string // PDF or page link
  isNew?: boolean
  published: boolean
}

export type EventItem = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  time?: string
  venue?: string
  type: string
  url?: string
  published: boolean
}

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  date: string
  tag: string
  image?: string
  url?: string
  published: boolean
}

export type Person = {
  name: string
  designation: string
  department?: string
  email?: string
  phone?: string
  photo?: string
  qualifications?: string
}

export type Department = {
  slug: string
  code: string
  name: string
  tagline: string
  description: string
  established?: number
  intake?: number
  programs: string[]
  labs?: string[]
  hod?: Person
  faculty?: Person[]
  focus?: string[]
  image?: string
}

export type Program = {
  level: 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'Part-Time'
  title: string
  duration: string
  branches: string[]
  intake?: number
  eligibility?: string
  note?: string
}

export type DocumentItem = {
  id: string
  title: string
  url: string
  category: string
  date?: string
}

export type MediaItem = {
  path: string
  alt: string
  tags: string[]
  source: string
}

export type Video = { id: string; title: string }

export type PageSection = { heading?: string; body: string } // body = Markdown

export type CmsPage = {
  slug: string
  title: string
  eyebrow?: string
  intro?: string
  hero?: string
  sections: PageSection[]
  source?: string
  updatedAt?: string
}

export type SiteSettings = {
  name: string
  short: string
  university: string
  motto: string
  established: number
  address: string
  phones: string[]
  email: string
  logo: string
  universityLogo: string
  social: { facebook: string; twitter: string; linkedin: string; youtube: string }
  links: Record<string, string>
}

export type CmsContent = {
  settings: SiteSettings
  notices: Notice[]
  events: EventItem[]
  news: NewsItem[]
  pages: CmsPage[]
  documents: DocumentItem[]
  videos: Video[]
  media: MediaItem[]
}
