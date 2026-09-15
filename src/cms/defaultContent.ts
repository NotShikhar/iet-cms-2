import { generatedDocuments, generatedMedia, generatedNews, generatedNotices, generatedVideos } from './generated'
import { pages } from './pages'
import type { CmsContent, EventItem, SiteSettings } from './types'

export const settings: SiteSettings = {
  name: 'Institute of Engineering & Technology',
  short: 'IET DAVV',
  university: 'Devi Ahilya Vishwavidyalaya, Indore',
  motto: 'Knowledge meets Innovation',
  established: 1996,
  address: 'Vikramshila Parisar, Khandwa Road, Indore – 452017 (M.P.), India',
  phones: ['0731-2361116', '0731-2361117'],
  email: 'director@ietdavv.edu.in',
  logo: '/media/ietnew/iet_logo-300x300.png',
  universityLogo: '/media/ietnew/DAVV-Final-Logo-May-2026-2.png',
  social: {
    facebook: 'https://www.facebook.com/davv.iet',
    twitter: 'https://x.com/ietdavv',
    linkedin: 'https://in.linkedin.com/school/ietdavv/',
    youtube: 'https://www.youtube.com/@blastatiet',
  },
  links: {
    'DAVV University': 'https://www.dauniv.ac.in/',
    'DTE MP Online Counselling': 'https://dte.mponline.gov.in/',
    'Class Time Table': 'https://timetable.ietdavv.edu.in/',
    'Notice Board': 'https://notices.ietdavv.edu.in/',
    'IET Times': 'https://times.ietdavv.edu.in/',
    'ACIIE Incubation': 'https://aciie.ietdavv.edu.in/',
    'GDSC IET DAVV': 'https://gdsc.ietdavv.edu.in/',
    'iConnect': 'https://iconnect.ietdavv.edu.in/',
    'Forms Portal': 'https://forms.ietdavv.edu.in/',
    'Alumni Network': 'https://ietdavvalumni.almaconnect.com/',
    'Online Grievance': 'https://help.ietonline.in/',
    'Old Exam Papers (college email)': 'https://drive.google.com/drive/folders/1wgXXItjKajVHGKAtD3pBbAV6CZvfuuaN?usp=sharing',
  },
}

export const events: EventItem[] = [
  { id: 'ev-1', title: 'College Level Counselling (CLC) – B.Tech vacant seats', date: '2026-09-12', time: 'Merit list after 1:00 PM', venue: 'IET-DAVV, Khandwa Road', type: 'Admission', url: '/media/main/downloads/Admission/2026-27/CLC_Notice_IET.pdf', published: true },
  { id: 'ev-2', title: 'Internal Hackathon 2026 – Smart India Hackathon (SIH) 2026', date: '2026-09-12', time: 'Full day', venue: 'IET-DAVV Campus', type: 'Hackathon', url: 'https://times.ietdavv.edu.in/', published: true },
  { id: 'ev-3', title: 'Test II – B.Tech II-III / B.E. IV / M.Tech I / M.Sc. I / B.Tech PTDC (all branches)', date: '2026-09-22', time: 'As per time table', venue: 'Examination Halls', type: 'Examination', url: '/media/notices/iet_6aa3cc16e3a785.68412979.pdf', published: true },
  { id: 'ev-4', title: 'Career Siddhi – weekend placement training sessions (8 sessions over one month)', date: '2026-09-19', time: 'Saturdays & Sundays', venue: 'IET-DAVV', type: 'Training', url: 'https://times.ietdavv.edu.in/', published: true },
  { id: 'ev-5', title: 'Invento – annual technical festival (GitHub presents)', date: '2026-10-13', time: '13–14 October', venue: 'IET-DAVV Campus', type: 'Festival', published: true },
]

export const defaultContent: CmsContent = {
  settings,
  notices: generatedNotices,
  events,
  news: generatedNews,
  pages,
  documents: generatedDocuments,
  videos: generatedVideos,
  media: generatedMedia,
}
