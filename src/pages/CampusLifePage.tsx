import { Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCms } from '../cms/store'
import { clubs, facilities } from '../data/content'
import { Icon } from '../components/ui/Icon'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'

export default function CampusLifePage() {
  const { content } = useCms()
  const gallery = content.media.filter((m) => m.tags.includes('campus') || m.tags.includes('students')).slice(0, 9)
  const events = content.events.filter((e) => e.published)
  return (
    <>
      <PageHero eyebrow="Campus Life" title="Learn, live and build at Vikramshila Parisar." description="Hostels for 700 students, department laboratories, the ACIIE incubation centre, sports facilities and a calendar of technical, cultural and community events." crumbs={[{ label: 'Campus Life' }]} image="/media/ietnew/PV03_S_66_1.jpg" />

      <section className="py-16">
        <div className="container-x">
          <SectionHeader eyebrow="Facilities" title="Everything you need on campus." />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <StaggerItem key={f.title}>
                <Link to={f.to} className="card card-hover block overflow-hidden">
                  <div className="h-44 overflow-hidden"><img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover" /></div>
                  <div className="p-5">
                    <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-50 text-navy-600"><Icon name={f.icon} className="h-4 w-4" /></span><h3 className="font-display text-lg font-bold text-ink">{f.title}</h3></div>
                    <p className="mt-2 text-sm text-slate-600">{f.text}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="aciie" className="bg-navy-950 py-16 text-white scroll-mt-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow !text-saffron-300">Innovation</span>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">ACIIE, GDSC and national-level achievements</h2>
            <p className="mt-4 text-navy-100/85">The Atal Centre for Innovation, Incubation & Entrepreneurship hosts the Institute’s Innovation Council and the student E-Cell. GDSC IET DAVV counts 400+ active members and ran India’s first Pre-DevFest with 800+ participants. Student teams secured AIR 3 in the NIDAR’26 business pitch, AIR 7 at the Drone Development Challenge 2025 and the SAE mBAJA 2025 “Pride of MP” award.</p>
            <div className="mt-6 flex flex-wrap gap-2">{['Seed & incubation support', 'Innovation Council', 'E-Cell', 'Robotics Club', 'EV / Aeromodelling / BAHA Club', 'Coding clubs'].map((t) => <span key={t} className="rounded-lg bg-white/10 px-3 py-1 text-xs font-medium">{t}</span>)}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/page/aciie" className="btn btn-accent">About ACIIE</Link>
              <Link to="/page/gdsc" className="btn border border-white/20 bg-white/10 text-white hover:bg-white/20">GDSC IET DAVV</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}><img src="/media/ietnew/PV03_S_69_2-scaled.jpg" alt="NSS IET-DAVV volunteers with Blood Donation Camp posters" className="aspect-[4/3] w-full rounded-3xl object-cover" loading="lazy" /></Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeader eyebrow="Student Bodies" title="Clubs & communities" />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((c) => (
              <StaggerItem key={c.name}><Link to={c.to} className="card card-hover block h-full p-5"><span className={`grid h-11 w-11 place-items-center rounded-xl text-sm font-bold ${c.color}`}>{c.name.slice(0, 2).toUpperCase()}</span><h3 className="font-display mt-4 text-lg font-bold text-ink">{c.name}</h3><p className="text-sm text-slate-500">{c.desc}</p></Link></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="container-x">
          <SectionHeader eyebrow="Events" title="Upcoming on campus" />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
            {events.map((e) => {
              const d = new Date(e.date)
              return (
                <StaggerItem key={e.id}>
                  <div className="card flex gap-5 p-5">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-600 text-white"><span className="font-display text-2xl font-bold leading-none">{d.getDate()}</span><span className="text-xs uppercase">{d.toLocaleString('en', { month: 'short' })}</span></div>
                    <div><span className="text-xs font-semibold uppercase tracking-wider text-teal-600">{e.type}</span><h3 className="font-display font-bold text-ink">{e.url ? <a href={e.url} target="_blank" rel="noreferrer" className="hover:text-navy-700">{e.title}</a> : e.title}</h3><p className="mt-1 flex flex-wrap gap-x-4 text-xs text-slate-500">{e.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>}{e.venue && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>}</p></div>
                  </div>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Gallery" title="Life at IET" description="Photographs from the institute website." />
          <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((g, i) => (
              <StaggerItem key={g.path} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
                <figure className="h-full overflow-hidden rounded-2xl">
                  <img src={g.path} alt={g.alt} loading="lazy" className="h-full min-h-[160px] w-full object-cover" />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
