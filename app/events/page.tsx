import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventsHero } from "@/components/events/events-hero"
import { UpcomingEvents } from "@/components/events/upcoming-events"
import { WeeklySchedule } from "@/components/events/weekly-schedule"
import { PrivateEvents } from "@/components/events/private-events"

export const metadata = {
  title: "Events | The Gilded Glass",
  description: "Discover live music, special nights, and private event options at The Gilded Glass.",
}

export default function EventsPage() {
  return (
    <>
      <Navigation />
      <main>
        <EventsHero />
        <UpcomingEvents />
        <WeeklySchedule />
        <PrivateEvents />
      </main>
      <Footer />
    </>
  )
}
