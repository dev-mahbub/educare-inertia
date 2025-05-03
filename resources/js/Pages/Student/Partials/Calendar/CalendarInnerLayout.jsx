import CalendarTopbar from './CalendarTopbar';
import AttendanceCalendar from './AttendanceCalendar';

const CalendarInnerLayout = ({
    presents,
    absents,
    holidays
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CalendarTopbar />
                    <AttendanceCalendar
                        presents={presents}
                        absents={absents}
                        holidays={holidays}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarInnerLayout;
