import SchoolShiftMenu from "../../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import ClassroomTimetableHeader from "./ClassroomTimetableHeader";
import ClassroomTimetableList from "./ClassroomTimetableList";

const ClassroomTimetableInnerLayout = ({
    classrooms,
    schoolShifts,
    classroomPeriods,
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
                    <ClassroomTimetableHeader
                        classrooms={classrooms}
                        schoolShifts={schoolShifts}
                        classroomPeriods={classroomPeriods}
                    />
                    <ClassroomTimetableList
                        classroomPeriods={classroomPeriods}
                        timetables={timetables}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassroomTimetableInnerLayout;
