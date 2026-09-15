import { About } from '../components/home/About'
import { CampusLife } from '../components/home/CampusLife'
import { Departments } from '../components/home/Departments'
import { HeroSlider } from '../components/home/HeroSlider'
import { News } from '../components/home/News'
import { NoticeTicker } from '../components/home/NoticeTicker'
import { NoticesEvents } from '../components/home/NoticesEvents'
import { Placements } from '../components/home/Placements'
import { Programs } from '../components/home/Programs'
import { QuickLinks } from '../components/home/QuickLinks'
import { Stats } from '../components/home/Stats'

export default function Home() {
  return (
    <>
      <NoticeTicker />
      <HeroSlider />
      <QuickLinks />
      <Stats />
      <About />
      <Programs />
      <Departments />
      <NoticesEvents />
      <Placements />
      <CampusLife />
      <News />
    </>
  )
}
