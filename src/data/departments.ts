// Departments and programmes as published on ietdavv.edu.in / ietnew (Programs Offered, Faculty) and the IET-DAVV Institute Profile.
export type Department = {
  slug: string
  code: string
  name: string
  short: string
  tagline: string
  established?: number
  programs: string[]
  hod?: string
  hodDesignation?: string
  description: string
  focus: string[]
  color: string
  image: string
  faculty?: string[]
}

export const departments: Department[] = [
  {
    slug: 'computer-engineering',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    short: 'Computer Engg.',
    tagline: 'One of the three founding departments (1996)',
    established: 1996,
    programs: ['B.Tech Computer Science & Engineering', 'M.Tech Computer Engineering (Software Engineering)', 'Ph.D. Computer Engineering'],
    hod: 'Dr. Ashish Jain',
    hodDesignation: 'Professor & Head',
    description: 'Computer Engineering was one of the three branches with which IET began in 1996. The department runs the B.Tech in Computer Science & Engineering, the M.Tech with specialisation in Software Engineering and the Ph.D. programme, and hosts the Google Developer Student Club and the institute’s coding community.',
    focus: ['Artificial Intelligence & Machine Learning', 'Data Science', 'Software Engineering', 'AI for Sustainability'],
    color: 'from-navy-500 to-navy-700',
    image: '/media/ietnew/PV03_S_31_2-scaled.jpg',
    faculty: ['Dr. Vrinda Tokekar – Professor', 'Dr. G. L. Prajapati'],
  },
  {
    slug: 'information-technology',
    code: 'IT',
    name: 'Information Technology',
    short: 'Information Tech.',
    tagline: 'Information security, ERP and digital forensics',
    programs: ['B.Tech Information Technology', 'M.Tech Information Technology (Information Security)', 'Ph.D. Information Technology'],
    hod: 'Dr. Hemant Makwana',
    hodDesignation: 'Professor & Head',
    description: 'The Department of Information Technology offers the B.Tech in IT and the M.Tech with specialisation in Information Security. The Director of the institute, Dr. Pratosh Bansal, is a Professor of this department, whose research spans ERP, knowledge management, digital forensics, green IT and energy systems.',
    focus: ['Information Security', 'Digital Forensics', 'ERP & Knowledge Management', 'Green IT'],
    color: 'from-teal-500 to-teal-600',
    image: '/media/ietnew/PV02_S_8-1-scaled.jpg',
    faculty: ['Dr. Pratosh Bansal – Professor & Director', 'Dr. Vrinda Tokekar – Professor', 'Dr. C. P. Patidar – Associate Professor'],
  },
  {
    slug: 'electronics-telecommunication',
    code: 'E&TC',
    name: 'Electronics & Telecommunication Engineering',
    short: 'Electronics & Telecom.',
    tagline: 'VLSI, digital communication and the Chips-to-Startup programme',
    programs: ['B.Tech Electronics & Telecommunication Engineering', 'M.Tech Electronics (Digital Communication)', 'M.Tech Microelectronics & VLSI Design', 'Ph.D. Electronics & Telecommunication'],
    description: 'Home of the MeitY Chips-to-Startup (C2S) programme at IET with ₹95 lakh funding (PI Dr. Vaibhav Neema, Co-PI Dr. Ravi Sindal). The department has fabricated ICs on 130nm (Tiny Tapeout) and 180nm SCL technology, developed the iPACE implantable pacemaker chip, and secured patents in SRAM cell design and smart memory technology for hardware data security.',
    focus: ['Microelectronics & VLSI Design', 'Digital Communication', 'ASIC / SoC Design', 'Hardware Security'],
    color: 'from-violet-500 to-violet-700',
    image: '/media/ietnew/PV03_S_28_1.jpg',
    faculty: ['Dr. Ravi Sindal – Professor & Dean, Faculty of Engineering', 'Dr. Vaibhav Neema', 'Dr. Raksha Upadhyay', 'Dr. Uma Bhatt'],
  },
  {
    slug: 'electronics-instrumentation',
    code: 'E&I',
    name: 'Electronics & Instrumentation Engineering',
    short: 'Electronics & Instru.',
    tagline: 'Founding department (1996) – IoT, automation and instrumentation',
    established: 1996,
    programs: ['B.Tech Electronics & Instrumentation Engineering', 'M.Tech Electronics (IoT and Automation)', 'Ph.D. Electronics & Instrumentation'],
    hod: 'Dr. Ajay Verma',
    hodDesignation: 'Professor & Head',
    description: 'A founding department of the institute, Electronics & Instrumentation trains engineers for process industries, industrial automation and IoT-enabled instrumentation. The Head of the department also chairs the Hostel Management Committee.',
    focus: ['IoT & Automation', 'Process Instrumentation', 'Embedded Systems', 'Biomedical Instrumentation'],
    color: 'from-sky-500 to-sky-700',
    image: '/media/ietnew/PV03_S_36_2-scaled.jpg',
    faculty: ['Dr. Ajay Verma – Professor & Head'],
  },
  {
    slug: 'mechanical-engineering',
    code: 'ME',
    name: 'Mechanical Engineering',
    short: 'Mechanical Engg.',
    tagline: 'Founding department (1996) – design, thermal and SAE BAJA teams',
    established: 1996,
    programs: ['B.Tech Mechanical Engineering', 'B.Tech Mechanical Engineering (Part-Time / PTDC)', 'M.Tech Mechanical Engineering (Design and Thermal)', 'M.Tech Industrial Engineering & Management', 'Ph.D. Mechanical Engineering'],
    hod: 'Dr. Ashesh Tiwari',
    hodDesignation: 'Professor & Head',
    description: 'One of the three founding departments, Mechanical Engineering runs full-time and part-time B.Tech programmes and M.Tech specialisations in Design & Thermal and Industrial Engineering & Management. Its SAE teams (mBAJA “Pride of MP” 2025, eBAJA 2026) and ANRF-funded projects on natural-fibre composites and latent heat thermal energy storage anchor the department’s research.',
    focus: ['Design & Thermal Engineering', 'Automotive – SAE BAJA / eBAJA', 'Natural Fibre Composites', 'Thermal Energy Storage'],
    color: 'from-saffron-400 to-saffron-600',
    image: '/media/ietnew/PV03_S_54_2.jpg',
    faculty: ['Dr. Ashesh Tiwari – Professor & Head', 'Dr. Govind Maheshwari – Professor & Prof. In-charge, Placements', 'Dr. Vijay Karma – Professor', 'Dr. Nagendra Sohani – Professor & Sr. Warden', 'Dr. Devendra Singh Verma – Professor', 'Dr. Sharad Choudhary'],
  },
  {
    slug: 'civil-engineering',
    code: 'CE',
    name: 'Civil Engineering',
    short: 'Civil Engg.',
    tagline: 'Infrastructure, structures and sustainability',
    programs: ['B.Tech Civil Engineering', 'Ph.D. Civil Engineering'],
    hod: 'Dr. Vijay Karma',
    hodDesignation: 'Professor (Mechanical Engg.) & Head (Civil Engg.)',
    description: 'The Department of Civil Engineering offers the B.Tech in Civil Engineering with laboratories in structural engineering, surveying, geotechnical and environmental engineering. Civil Engineering students contributed to the 2026-27 placement season within the first month of the drive.',
    focus: ['Structural Engineering', 'Geotechnical Engineering', 'Environmental Engineering', 'Surveying'],
    color: 'from-emerald-500 to-emerald-700',
    image: '/media/ietnew/PV03_S_63_2.jpg',
  },
  {
    slug: 'computer-science-business-systems',
    code: 'CSBS',
    name: 'Computer Science & Business Systems',
    short: 'CS & Business Systems',
    tagline: 'Industry-designed B.Tech with business fundamentals',
    programs: ['B.Tech Computer Science & Business Systems'],
    hod: 'Dr. C. P. Patidar',
    hodDesignation: 'Associate Professor (IT) & Head (CSBS)',
    description: 'The B.Tech in Computer Science & Business Systems combines core computer science with business systems, analytics and design thinking. The programme follows its own CBCS scheme (Semesters III–V published) and is coordinated from the Department of Information Technology.',
    focus: ['Business Analytics', 'Cloud & Enterprise Systems', 'Design Thinking', 'Software Engineering'],
    color: 'from-rose-500 to-rose-700',
    image: '/media/ietnew/PV03_S_66_1.jpg',
  },
  {
    slug: 'applied-sciences',
    code: 'AS',
    name: 'Applied Science',
    short: 'Applied Science',
    tagline: 'Physics, chemistry, mathematics and the M.Sc. programme',
    programs: ['M.Sc. Applied Mathematics', 'Ph.D. Applied Physics', 'Ph.D. Applied Chemistry', 'Ph.D. Applied Mathematics'],
    hod: 'Dr. Shashi Prakash',
    hodDesignation: 'Professor & Head',
    description: 'The Department of Applied Science anchors first-year engineering education and offers the M.Sc. in Applied Mathematics (since 2006) and Ph.D. programmes in Applied Physics, Chemistry and Mathematics. Its Head, Dr. Shashi Prakash, is the institute’s most cited researcher with 194 publications and an h-index of 23. The student counsellor, Dr. Ruchi Singh, is a faculty member of this department.',
    focus: ['Applied Mathematics', 'Applied Physics', 'Applied Chemistry', 'Materials Science'],
    color: 'from-slate-500 to-slate-700',
    image: '/media/ietnew/PV03_S_67_2.jpg',
    faculty: ['Dr. Shashi Prakash – Professor & Head', 'Dr. Ruchi Singh – Assistant Professor & Student Counsellor'],
  },
]

export const programs = [
  {
    level: 'Undergraduate',
    title: 'B.Tech (Full Time)',
    duration: '4 Years · 8 Semesters',
    count: '9 Programmes',
    items: ['Computer Science & Engineering (CSE)', 'Information Technology (IT)', 'Electronics & Telecommunication (E&TC)', 'Electronics & Instrumentation (E&I)', 'Mechanical Engineering (ME)', 'Civil Engineering (CE)', 'Computer Science & Business Systems (CSBS)', 'Industrial & Production Engineering (IP) – new 2026', 'Electrical & Electronics Engineering (EEE) – new 2026'],
    note: 'Admission through JEE (Main) and DTE Madhya Pradesh online counselling; vacant seats through College Level Counselling.',
  },
  {
    level: 'Postgraduate',
    title: 'M.Tech (Full Time)',
    duration: '2 Years · 4 Semesters',
    count: '7 Programmes',
    items: ['Mechanical Engineering (Design and Thermal)', 'Computer Engineering (Software Engineering)', 'Information Technology (Information Security)', 'Industrial Engineering & Management', 'Electronics (Digital Communication)', 'Electronics (IoT and Automation)', 'Microelectronics & VLSI Design'],
    note: 'PG programmes started in 2002. Admission information and FAQs are published under Admissions.',
  },
  {
    level: 'Part-Time',
    title: 'B.Tech (Part-Time / PTDC)',
    duration: 'Evening programme',
    count: '1 Programme',
    items: ['Mechanical Engineering (ME)'],
    note: 'For working diploma holders seeking a degree while in employment.',
  },
  {
    level: 'Postgraduate',
    title: 'M.Sc. Applied Mathematics',
    duration: '2 Years · 4 Semesters',
    count: 'Since 2006',
    items: ['Applied Mathematics'],
    note: 'Admission through DAVV Common Entrance Test. See the PG Admission notice for M.Sc. Applied Mathematics.',
  },
  {
    level: 'Doctoral',
    title: 'Ph.D. (Full Time)',
    duration: 'Research programme',
    count: '8 Areas',
    items: ['Computer Engineering', 'Information Technology', 'Electronics & Telecommunication Engineering', 'Electronics & Instrumentation Engineering', 'Mechanical Engineering', 'Applied Physics', 'Applied Chemistry', 'Applied Mathematics'],
    note: 'Admission lists, course-work time tables and open-defence notices are published on the Notice Board.',
  },
  {
    level: 'Undergraduate',
    title: 'B.Des & MBA (Technology Management)',
    duration: 'Through DAVV Institute of Design / IET',
    count: 'Other programmes',
    items: ['B.Des (through Devi Ahilya Institute of Design)', 'MBA (Technology Management) – proposed, admissions from next session through CAT/GATE'],
    note: 'B.Design admissions are open; the MBA in Technology Management (120 seats) is on hold for 2026-27.',
  },
]

export const leadership = [
  { role: 'Vice Chancellor, DAVV', name: 'Prof. Rakesh Singhai' },
  { role: 'Registrar, DAVV', name: 'Shri Prajwal Khare' },
  { role: 'Director, IET', name: 'Dr. Pratosh Bansal' },
  { role: 'Dean, Faculty of Engineering', name: 'Dr. Ravi Sindal' },
  { role: 'Administrative Officer', name: 'Dr. Paresh Atri' },
  { role: 'Prof. In-charge, Placements', name: 'Dr. Govind Maheshwari' },
  { role: 'Sr. Warden (All Hostels)', name: 'Dr. Nagendra Sohani' },
  { role: 'Prof. In-charge, B.E. I Year', name: 'Dr. Dheeraj Mandloi' },
  { role: 'Student Counsellor', name: 'Dr. Ruchi Singh' },
]
