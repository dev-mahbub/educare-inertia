import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const AttendanceCalendar = ({
    presents,
    absents,
    holidays
}) => {
    
    return (
        <div className="body-bg">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                events={[
                    // {
                    //     title: "Event",
                    //     date: "2024-01-08",
                    //     backgroundColor: "#F78359",
                    //     textColor: "white",
                    // },
                    // {
                    //     title: "Exam",
                    //     date: "2024-01-15",
                    //     backgroundColor: "#0B52BD",
                    //     textColor: "white",
                    // },
                    // {
                    //     title: "Holidays",
                    //     date: "2024-01-25",
                    //     backgroundColor: "#F30445",
                    //     textColor: "white",
                    // },
                    ...presents,
                    ...absents,
                    ...holidays
                ]}
                eventContent={(eventInfo) => (
                    <>
                        <b>{eventInfo.timeText}</b>
                        <p>{eventInfo.event.title}</p>
                    </>
                )}
                eventClick={(eventClickInfo) => {
                    alert(`Event clicked: ${eventClickInfo.event.title}`);
                }}
            />
        </div>
    );
};

export default AttendanceCalendar;
