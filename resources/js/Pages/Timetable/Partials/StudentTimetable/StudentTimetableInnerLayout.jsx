import StudentTimetableList from "./StudentTimetableList";
import StudentTimetableFilter from "./StudentTimetableFilter";

const StudentTimetableInnerLayout = ({
    students,
    classrooms,
    schoolShifts,
    classroomPeriods,
    timetables
}) => {

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentTimetableFilter students={students} schoolShifts={schoolShifts} classroomPeriods={classroomPeriods}/>
                    <StudentTimetableList classroomPeriods={classroomPeriods} timetables={timetables} />
                </div>
            </div>
        </div>
    );
};

export default StudentTimetableInnerLayout;
