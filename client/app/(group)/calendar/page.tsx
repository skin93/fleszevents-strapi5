import CustomCalendar from "@/components/custom-calendar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUpcomingEvents, getUpcomingEventsAtMonth } from "@/lib/data/events";
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ month: string; year: string }>;
};

export default async function CalendarPage({ searchParams }: Props) {
  const { year, month } = await searchParams;

  if (month === undefined && year === undefined) {
    const { events } = await getUpcomingEvents();
    return (
      <SidebarProvider>
        <CustomCalendar events={events} />
      </SidebarProvider>
    );
  } else {
    const monthAsNumber = Number(month) - 1;
    const yearAsNumber = Number(year);
    const { events } = await getUpcomingEventsAtMonth(
      yearAsNumber,
      monthAsNumber
    );
    return (
      <SidebarProvider>
        <CustomCalendar
          events={events}
          month={monthAsNumber}
          year={yearAsNumber}
        />
      </SidebarProvider>
    );
  }
}
