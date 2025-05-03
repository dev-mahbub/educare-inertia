import CalendarTopbar from './CalendarTopbar';
import EventCalendar from './EventCalendar';

const CalendarInnerLayout = ({
    exams,
    events,
    holidays
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CalendarTopbar />
                    <EventCalendar
                        exams={exams}
                        events={events}
                        holidays={holidays}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarInnerLayout;
