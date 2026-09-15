import { Building2, Mail, MapPin, Phone, Send, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useCms } from '../cms/store'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'

const offices = [
  { t: 'Director', d: 'Dr. Pratosh Bansal · director@ietdavv.edu.in', I: UserRound },
  { t: 'Administrative Officer', d: 'Dr. Paresh Atri · 0731-2368531 · 9977820281 · 9893593622', I: Building2 },
  { t: 'Admission enquiries', d: '(M) 98264 18567 · 89821 77634 · 88897 86191', I: Phone },
  { t: 'Hostel (boys)', d: 'Mr. Gopal Laad 6263844675 · Mr. Prahlad Verma 7089516742 · Emergency: 9893359141, 9424891320, 9826490631', I: Building2 },
  { t: 'Hostel (girls)', d: 'Mrs. Sunita Sharma 9406626026 · Emergency: 9907561756', I: Building2 },
  { t: 'Student Counsellor', d: 'Dr. Ruchi Singh, Assistant Professor, Applied Science Department', I: UserRound },
]

export default function ContactPage() {
  const { content } = useCms()
  const s = content.settings
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHero eyebrow="Reach Us" title="Contact IET-DAVV." description="Institute of Engineering and Technology, Devi Ahilya Vishwavidyalaya, Khandwa Road, Indore – 452017 (M.P.). Directions are available from Devi Ahilyabai Holkar Airport and Indore Railway Station." crumbs={[{ label: 'Contact' }]} image="/media/ietnew/PV02_S_65-1-scaled.jpg" />
      <section className="py-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {[
              { I: MapPin, t: 'Address', d: `${s.name}, ${s.university}. ${s.address}` },
              { I: Phone, t: 'Phone', d: s.phones.join(' / ') },
              { I: Mail, t: 'Email', d: s.email },
            ].map(({ I, t, d }) => (
              <Reveal key={t}><div className="card flex gap-4 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-600 text-white"><I className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t}</p><p className="mt-0.5 text-sm font-medium text-ink">{d}</p></div></div></Reveal>
            ))}
            <Reveal>
              <div className="card overflow-hidden">
                <iframe title="IET DAVV map" className="h-64 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Institute+of+Engineering+and+Technology+DAVV+Khandwa+Road+Indore&output=embed" />
              </div>
            </Reveal>
          </div>
          <div className="space-y-5 lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="card p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold text-ink">Offices & helplines</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {offices.map((o) => (
                    <li key={o.t} className="flex gap-3 rounded-xl border border-line p-3"><o.I className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" /><div><p className="text-sm font-bold text-ink">{o.t}</p><p className="text-xs text-slate-600">{o.d}</p></div></li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <a href="https://help.ietonline.in/" target="_blank" rel="noreferrer" className="chip hover:border-navy-300">Online grievance submission</a>
                  <a href="https://dauniv.samarth.ac.in/index.php/pgportal/grievance-public/public" target="_blank" rel="noreferrer" className="chip hover:border-navy-300">DAVV Samarth grievance portal</a>
                  <a href="https://forms.ietdavv.edu.in/" target="_blank" rel="noreferrer" className="chip hover:border-navy-300">Forms portal</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="card p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold text-ink">Send an enquiry</h3>
                <p className="mt-1 text-sm text-slate-500">Admission queries, grievances, recruiter requests or general information. (Prototype form – submissions are not transmitted.)</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {['Full name', 'Email address', 'Phone', 'Subject'].map((l) => (
                    <label key={l} className="block text-sm"><span className="font-medium text-slate-700">{l}</span><input required className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100" /></label>
                  ))}
                  <label className="block text-sm sm:col-span-2"><span className="font-medium text-slate-700">Category</span>
                    <select className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"><option>Admission enquiry</option><option>Student grievance</option><option>Recruiter / Industry</option><option>Alumni</option><option>Other</option></select>
                  </label>
                  <label className="block text-sm sm:col-span-2"><span className="font-medium text-slate-700">Message</span><textarea required rows={5} className="mt-1.5 w-full rounded-xl border border-line bg-white p-3 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100" /></label>
                </div>
                <button type="submit" className="btn btn-primary mt-6">{sent ? 'Enquiry submitted ✓' : <>Submit enquiry <Send className="h-4 w-4" /></>}</button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
