import {
  Award,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Circle,
  Dumbbell,
  FileBadge,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Library,
  MessageSquareWarning,
  Newspaper,
  Rocket,
  Users,
  Wifi,
  type LucideProps,
} from 'lucide-react'
import type { ComponentType } from 'react'

const icons: Record<string, ComponentType<LucideProps>> = {
  Award,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Dumbbell,
  FileBadge,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Library,
  MessageSquareWarning,
  Newspaper,
  Rocket,
  Users,
  Wifi,
}

type Props = LucideProps & { name: string }

export function Icon({ name, ...rest }: Props) {
  const Cmp = icons[name] ?? Circle
  return <Cmp {...rest} />
}
