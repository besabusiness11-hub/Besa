import {
  CalendarCheck,
  Clock,
  Dumbbell,
  HelpCircle,
  Image,
  Instagram,
  MapPin,
  MessageCircle,
  Quote,
  Star,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { palestreContent, type FeatureIconKey } from "@/lib/palestre-content";

const ICONS: Record<FeatureIconKey, LucideIcon> = {
  "calendar-check": CalendarCheck,
  star: Star,
  clock: Clock,
  dumbbell: Dumbbell,
  image: Image,
  users: Users,
  quote: Quote,
  tag: Tag,
  "help-circle": HelpCircle,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  instagram: Instagram,
};

export default function FeatureGrid() {
  const { featureGrid } = palestreContent;
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h2 className="palestre-display text-2xl">{featureGrid.title}</h2>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {featureGrid.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li
              key={item.label}
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm"
            >
              <Icon className="h-4 w-4 shrink-0 text-[var(--pal-red)]" aria-hidden="true" />
              {item.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
