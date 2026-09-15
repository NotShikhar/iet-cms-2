// Figures and lists reproduced from the IET-DAVV Institute Profile (IET_Profile.pdf), the Admission Guidelines 2026-27 and IET Times.

export const recruiters = [
  'Infosys', 'Capgemini', 'Cognizant', 'LTIMindtree', 'Accenture',
  'Barclays', 'ZS Associates', 'Dice', 'Groww', 'Quantiphi', 'Mu Sigma',
  'Volvo Eicher', 'Jindal SAW', 'Tata Electronics', 'Crompton Greaves', 'Torrent Power', 'JK Cement', 'Force Motors',
  'Medibuddy', 'Beghou Consulting', 'Intellicus', 'CarWale', 'CoreEL', 'Appalto Electronics',
]

export const recruiterGroups = [
  { title: 'Top Tech & IT', items: ['Infosys', 'Capgemini', 'Cognizant', 'LTIMindtree', 'Accenture'] },
  { title: 'Product & Analytics', items: ['Barclays', 'ZS Associates', 'Dice', 'Groww', 'Quantiphi', 'Mu Sigma'] },
  { title: 'Core Engineering & Manufacturing', items: ['Volvo Eicher', 'Jindal SAW', 'Tata Electronics', 'Crompton Greaves', 'Torrent Power', 'JK Cement', 'Force Motors'] },
  { title: 'Other Notable Recruiters', items: ['Medibuddy', 'Beghou Consulting', 'Intellicus', 'CarWale', 'CoreEL', 'Appalto Electronics'] },
]

export const placementStats = [
  { label: 'Offers (2025-26)', value: 428, suffix: '' },
  { label: 'Companies on campus (2025-26)', value: 46, suffix: '' },
  { label: 'Average CTC (2025-26)', value: 7.1, suffix: ' LPA', decimals: 1 },
  { label: 'Highest CTC (2024-25)', value: 64, suffix: ' LPA' },
]

export const placementYears = [
  { year: '2024-25', companies: 66, highest: 64, offers: 403, average: 8.1 },
  { year: '2025-26', companies: 46, highest: 22, offers: 428, average: 7.1 },
]

export const placementRate = [
  { session: '2022-23', rate: 85 },
  { session: '2023-24', rate: 85 },
  { session: '2024-25', rate: 90 },
]

export const facilities = [
  { title: 'Hostels', text: 'Four boys hostels (Visvesvarayya, Ramanujan, S. N. Bose, Vikram Sarabhai) and the Bachhendri Pal Girls Hostel – 700 seats with mess, Wi-Fi, CCTV and common rooms.', icon: 'Building2', image: '/media/ietnew/PV03_S_28_1.jpg', to: '/page/hostel' },
  { title: 'Central Library & E-Books', text: 'Institute library with reading rooms and book bank, McGraw Hill and Wiley e-book libraries, plus the DAVV Central Library.', icon: 'Library', image: '/media/ietnew/PV02_S_8-1-scaled.jpg', to: '/page/e-books' },
  { title: 'Laboratories & VLSI Centre', text: 'Department laboratories including VLSI labs with EDA tools set up under the MeitY Chips-to-Startup programme.', icon: 'FlaskConical', image: '/media/ietnew/PV03_S_31_2-scaled.jpg', to: '/page/research-projects' },
  { title: 'ACIIE Incubation Centre', text: 'Atal Centre for Innovation, Incubation & Entrepreneurship with the Institute’s Innovation Council and the student E-Cell.', icon: 'Rocket', image: '/media/ietnew/PV03_S_66_2.jpg', to: '/page/aciie' },
  { title: 'Sports & Recreation', text: 'Sports ground, indoor and outdoor games, chess tournaments and access to the DAVV sports facilities and university auditorium.', icon: 'Dumbbell', image: '/media/ietnew/PV03_S_66_1.jpg', to: '/campus-life' },
  { title: 'NSS & Community', text: 'NSS unit and Red Ribbon Club running blood donation camps, plantation drives and cleanliness campaigns across Indore.', icon: 'HeartHandshake', image: '/media/ietnew/PV03_S_69_2-scaled.jpg', to: '/page/nss' },
]

export const clubs = [
  { name: 'GDSC', desc: 'Google Developer Student Club – 400+ members', color: 'bg-navy-100 text-navy-700', to: '/page/gdsc' },
  { name: 'E-Cell', desc: 'Entrepreneurship Cell under ACIIE', color: 'bg-saffron-100 text-saffron-600', to: '/page/aciie' },
  { name: 'NSS', desc: 'National Service Scheme & Red Ribbon Club', color: 'bg-emerald-100 text-emerald-700', to: '/page/nss' },
  { name: 'SAE BAJA', desc: 'mBAJA “Pride of MP” 2025 · eBAJA 2026', color: 'bg-rose-100 text-rose-700', to: '/page/aciie' },
  { name: 'ISHRAE', desc: 'HVAC&R student chapter since 2010', color: 'bg-sky-100 text-sky-700', to: '/page/ishrae' },
  { name: 'Invento', desc: 'Annual technical festival', color: 'bg-violet-100 text-violet-700', to: '/campus-life' },
  { name: 'Robotics & Drones', desc: 'NIDAR’26 · Drone Development Challenge', color: 'bg-teal-100 text-teal-700', to: '/page/aciie' },
  { name: 'IET Times', desc: 'Institute newspaper & Live@IET channel', color: 'bg-amber-100 text-amber-700', to: '/page/iet-times' },
]

export const milestones = [
  { year: '1996', text: 'IET starts on 4 September with 90 students in Mechanical, Computer and Electronics & Instrumentation Engineering.' },
  { year: '2002', text: 'IET becomes a PG institute; M.E./M.Tech programmes begin.' },
  { year: '2006', text: 'M.Sc. programme in Applied Mathematics started.' },
  { year: '2009', text: 'MHRD selects the IET campus as the temporary location of IIT Indore (2009-10). GATE top ranks in 2001, 2002 and 2009.' },
  { year: '2010', text: 'ISHRAE IET Chapter established; wins Best Chapter Award in 2015.' },
  { year: '2023', text: 'MeitY Chips-to-Startup programme (₹95 lakh) – IC fabrication on 130nm and 180nm technology.' },
  { year: '2025', text: 'Dr. Pratosh Bansal joins as Director (10 July). SAE mBAJA “Pride of MP”. Placement rate reaches 90%.' },
  { year: '2026', text: 'Two new B.Tech programmes (IP, EEE) fill all 120 seats; DAVV approves major expansion of the IET campus; ₹100 Cr ANRF-PAIR project with IIT Indore.' },
]

export const stats = [
  { label: 'Years since 1996', value: 30, suffix: '' },
  { label: 'Students enrolled', value: 2500, suffix: '+' },
  { label: 'B.Tech programmes', value: 9, suffix: '' },
  { label: 'Placement offers 2025-26', value: 428, suffix: '' },
  { label: 'Highest CTC (LPA)', value: 64, suffix: '' },
  { label: 'Research publications', value: 350, suffix: '+' },
]

export const accreditations = [
  { name: 'AICTE Approved', detail: 'B.Tech & M.Tech programmes approved by AICTE, New Delhi' },
  { name: 'UGC Recognised', detail: 'University Teaching Department of DAVV' },
  { name: 'NAAC A+', detail: 'Through Devi Ahilya Vishwavidyalaya' },
  { name: 'Academically Autonomous', detail: 'Flexible, industry-aligned CBCS curriculum' },
  { name: 'Govt. of Madhya Pradesh', detail: 'Approved institution' },
  { name: 'NIRF', detail: 'Consistent presence in NIRF rankings' },
]

export const quickLinks = [
  { label: 'Admission 2026-27', icon: 'GraduationCap', href: '/admissions', tone: 'navy' },
  { label: 'Results', icon: 'FileBadge', href: '/page/results', tone: 'teal' },
  { label: 'Time Table', icon: 'CalendarDays', href: '/page/class-time-table', tone: 'saffron' },
  { label: 'Notices', icon: 'Bell', href: '/notices', tone: 'rose' },
  { label: 'Scholarships', icon: 'Award', href: '/page/scholarships', tone: 'violet' },
  { label: 'E-Books', icon: 'BookOpen', href: '/page/e-books', tone: 'sky' },
  { label: 'Alumni', icon: 'Users', href: '/page/notable-alumni', tone: 'emerald' },
  { label: 'IET Times', icon: 'Newspaper', href: '/page/iet-times', tone: 'slate' },
] as const

// Home-page hero slideshow — photographs published by the institute (ietdavv.edu.in/ietnew and IET Times PhotoVista).
export const heroSlides = [
  { image: '/media/hero/campus-green.webp', title: 'Vikramshila Parisar', caption: 'The institute campus on Khandwa Road, Indore' },
  { image: '/media/hero/main-gate.webp', title: 'Main gate', caption: 'Institute of Engineering & Technology, Devi Ahilya Vishwavidyalaya' },
  { image: '/media/hero/c-block-dusk.webp', title: 'C-Block', caption: 'Academic block at dusk' },
  { image: '/media/hero/atrium.webp', title: 'Academic block', caption: 'The central courtyard between departments' },
  { image: '/media/hero/classroom.webp', title: 'Classrooms', caption: 'A lecture hall during class hours' },
  { image: '/media/hero/nss-volunteers.webp', title: 'NSS IET-DAVV', caption: 'Volunteers of the Red Ribbon Club on campus' },
]

// Campus photo strip on the home page.
export const campusGallery = [
  { image: '/media/hero/g-b-block-computer.webp', alt: 'B-Block, Computer Engineering Department' },
  { image: '/media/hero/g-a-block-mechanical.webp', alt: 'A-Block, Mechanical Engineering Department' },
  { image: '/media/hero/g-m-block.webp', alt: 'M-Block, the administrative block' },
  { image: '/media/hero/g-chess.webp', alt: 'IET chess tournament' },
  { image: '/media/hero/g-campus-evening.webp', alt: 'Campus at sunset' },
  { image: '/media/hero/g-cricket-night.webp', alt: 'Inter-branch cricket tournament under floodlights' },
  { image: '/media/hero/g-campus-walk.webp', alt: 'Students on campus' },
  { image: '/media/hero/g-placement-cell.webp', alt: 'Centralized Placement Cell felicitation' },
  { image: '/media/hero/g-campus-night.webp', alt: 'Academic block at night' },
  { image: '/media/hero/g-students.webp', alt: 'Students of IET-DAVV' },
]
