import { useState } from "react";
import SchoolShiftMenu from "../../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import CreateTimeTableFormList from "./CreateTimeTableFormList";
import CreateTimeTableHeader from "./CreateTimeTableHeader";

const CreateTimetableInnerLayout = ({
    classrooms,
    schoolShifts,
    classroomPeriods,
    timetableDays,
    subjects,
    teachers
}) => {

    const [timetableData, setTimetableData] = useState([]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <SchoolShiftMenu title="Time Table Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateTimeTableHeader
                        classrooms={classrooms}
                        schoolShifts={schoolShifts}
                        classroomPeriods={classroomPeriods}
                        timetableData={timetableData}
                    />
                    <CreateTimeTableFormList
                        classroomPeriods={classroomPeriods}
                        timetableDays={timetableDays}
                        subjects={subjects}
                        teachers={teachers}
                        timetableData={timetableData}
                        setTimetableData={setTimetableData}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateTimetableInnerLayout;
