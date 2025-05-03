import SchoolShiftMenu from "../../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import TeacherTimetableHeader from "./TeacherTimetableHeader";
import TeacherTimetableList from "./TeacherTimetableList";

const TeacherTimetableInnerLayout = ({
    teachers,
    schoolShifts,
    schoolPeriods,
    timetables
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <SchoolShiftMenu title="Time Table Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherTimetableHeader
                        teachers={teachers}
                        schoolShifts={schoolShifts}
                        schoolPeriods={schoolPeriods}
                    />
                    <TeacherTimetableList
                        schoolPeriods={schoolPeriods}
                        timetables={timetables}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherTimetableInnerLayout;
