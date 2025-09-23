import CustomCalendar from "@/components/custom-calendar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllEvents } from "@/lib/data/events";

export default async function Page() {
  const { events } = await getAllEvents();
  return (
    <SidebarProvider>
      <CustomCalendar events={events} />
    </SidebarProvider>
  );
}
