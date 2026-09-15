import { ArrowRight, CheckCircle2, ClipboardList, FileCheck, FileText, GraduationCap, IndianRupee, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCms } from '../cms/store'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'

const steps = [
  { icon: ClipboardList, t: 'Qualify JEE (Main)', d: 'Eligibility for B.Tech is laid down by DTE, Madhya Pradesh (dte.mponline.gov.in). M.Tech and M.Sc. admissions follow the institute and DAVV CET processes.' },
  { icon: FileCheck, t: 'DTE online counselling', d: 'Register on the DTE MP Online portal, fill choices and receive an allotment letter. Vacant seats are filled through College Level Counselling at the institute.' },
  { icon: GraduationCap, t: 'Report with documents', d: 'Produce all original documents for verification: allotment letter, JEE mark sheet, 10th/12th mark sheets, TC, migration, domicile, category, Aadhaar, gap certificate.' },
  { icon: IndianRupee, t: 'Pay fees & enrol', d: 'First instalment of Rs. 49,000 (Rs. 51,450 boys / 51,010 girls for TFW) including caution money; then complete the institute admission form.' },
]

const brochures = [
  { t: 'B.Tech Programmes – General Information', u: '/media/ietnew/UG_Admissions_BTech.pdf' },
  { t: 'B.Tech Admission FAQs', u: '/media/ietnew/BTech_FAQs.pdf' },
  { t: 'B.Design Programme – General Information', u: '/media/ietnew/UG_Admissions_BDes.pdf' },
  { t: 'M.Tech Programmes – General Information', u: '/media/ietnew/PG_Admissions_MTech.pdf' },
  { t: 'M.Tech Admission FAQs', u: '/media/ietnew/MTech_FAQs.pdf' },
  { t: 'M.Sc. Applied Mathematics – PG Admission', u: '/media/main/downloads/Admission/2026-27/PG_Admission_MSc_AM.pdf' },
  { t: 'Guidelines for B.Tech admission (documents, fees, contacts)', u: '/media/main/downloads/Admission/2026-27/Admission_Guideline_BTech.pdf' },
  { t: 'College Level Counselling (CLC) notice', u: '/media/main/downloads/Admission/2026-27/CLC_Notice_IET.pdf' },
  { t: "Freshers' Induction Programme 2026", u: '/media/main/downloads/Admission/2026-27/INDUCTION2026.pdf' },
  { t: 'Hostel admission guidelines', u: '/media/main/downloads/Admission/2026-27/Hostel_Guidelines.pdf' },
]

export default function AdmissionsPage() {
  const { content } = useCms()
  const admNotices = content.notices.filter((n) => n.published && n.category === 'Admission').slice(0, 6)
  return (
    <>
      <PageHero eyebrow="Admission 2026-27" title="Your engineering journey starts here." description="Admissions to B.Tech are through JEE (Main) and DTE Madhya Pradesh counselling. B.Tech First Year classes for 2026-27 commenced on 5 August 2026; College Level Counselling for vacant seats was held on 12 September 2026." crumbs={[{ label: 'Admissions' }]} image="/media/ietnew/PV02_S_65-1-scaled.jpg" />

      <section className="py-16">
        <div className="container-x">
          <SectionHeader eyebrow="Process" title="Four steps to admission." />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StaggerItem key={s.t}>
                <div className="card card-hover relative h-full p-6">
                  <span className="absolute right-5 top-5 font-display text-4xl font-extrabold text-navy-100">0{i + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-600 text-white"><s.icon className="h-5 w-5" /></span>
                  <h3 className="font-display mt-5 text-lg font-bold text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Link to="/page/admission-guidelines" className="btn btn-primary">B.Tech admission guidelines <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/page/clc-process" className="btn btn-secondary">CLC procedure</Link>
            <a href="https://dte.mponline.gov.in/" target="_blank" rel="noreferrer" className="btn btn-ghost">DTE MP Online portal</a>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Programmes Open" title="Admission 2026-27" description="Brochures, general information and FAQs published by the institute." />
            <Stagger className="mt-8 grid gap-3">
              {brochures.map((b) => (
                <StaggerItem key={b.t}>
                  <a href={b.u} target="_blank" rel="noreferrer" className="card card-hover flex items-center gap-3 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600"><FileText className="h-5 w-5" /></span>
                    <span className="text-sm font-semibold text-ink">{b.t}</span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <SectionHeader eyebrow="Fees & Support" title="What you need to know." />
            <Reveal delay={0.1} className="mt-8 space-y-4">
              {[
                ['First instalment (General/SC/ST/OBC)', 'Rs. 49,000/- for boys and girls, including one-time caution money of Rs. 4,000/-. Exam fees Rs. 2,750/- per semester.'],
                ['TFW candidates', 'Rs. 51,450/- (boys) and Rs. 51,010/- (girls) at the time of admission.'],
                ['Payment', 'DD or online in favour of “Registrar Self Finance IET-DAVV”, payable at Indore (A/c No. 32113656219, IFSC SBIN0030470, SBI IET branch, Khandwa Road).'],
                ['Cancellation', 'Before the due date only 10% of total fees is deducted. Last date for cancellation with full refund for 2026-27 was 31 July 2026 as per AICTE/DTE.'],
                ['Scholarships', 'All eligible students including SC/ST/OBC are entitled to scholarships as per GOI / Govt. of MP schemes after admission.'],
                ['Hostel', 'Available in the institute premises on first-come-first-serve basis. Room rent Rs. 22,500 per annum plus refundable deposit Rs. 3,000; mess approx. Rs. 2,500–3,000 per month.'],
              ].map(([t, d]) => (
                <div key={t} className="card flex gap-3 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" /><div><p className="font-semibold text-ink">{t}</p><p className="text-sm text-slate-600">{d}</p></div></div>
              ))}
              <div className="rounded-2xl border border-saffron-200 bg-saffron-50 p-4 text-sm text-slate-700">
                <p className="flex items-center gap-2 font-bold text-saffron-600"><Phone className="h-4 w-4" /> Admission enquiries</p>
                <p className="mt-1">(M) 98264 18567 · 89821 77634 · 88897 86191 · Admission team: 8889786191, 9977820281, 8839364824, 9752226806 (10 AM – 6 PM)</p>
                <p className="mt-1">Admin. Officer: Dr. Paresh Atri – 9893593622 · Prof. I/c B.E. I Year: Dr. Dheeraj Mandloi – 9407894470</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="notices" className="py-16 scroll-mt-28">
        <div className="container-x">
          <SectionHeader eyebrow="Admission Notices" title="Latest from the admission cell." />
          <Reveal className="card mt-8 divide-y divide-line">
            {admNotices.map((n) => (
              <a key={n.id} href={n.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-4 hover:bg-mist">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm font-medium text-ink">{n.title}</span>
                <span className="ml-auto shrink-0 text-xs text-slate-500">{n.date}</span>
              </a>
            ))}
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Link to="/page/scholarships" className="btn btn-secondary">Scholarships</Link>
            <Link to="/page/hostel" className="btn btn-secondary">Hostel</Link>
            <Link to="/page/roll-list" className="btn btn-secondary">Roll lists</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
