import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

type Props = {};

const Calendar = (props: Props) => {
  const handleDateClick = (event: any) => {
    console.log("Day Clicked!", event);
  };

  const handleEventClick = (event: any) => {
    console.log("Event Clicked!", event);
  };
  return (
    <FullCalendar
      events={[
        { title: "event 1", date: "2022-08-26" },
        { title: "event 2", date: "2022-08-27" },
      ]}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      height="85vh"
    />
  );
};

export default Calendar;
