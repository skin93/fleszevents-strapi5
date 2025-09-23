import CustomCalendar from "@/components/custom-calendar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllEvents } from "@/lib/data/events";
export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const { events } = await getAllEvents();
  return (
    <SidebarProvider>
      <CustomCalendar events={events} />
    </SidebarProvider>
  );
}
