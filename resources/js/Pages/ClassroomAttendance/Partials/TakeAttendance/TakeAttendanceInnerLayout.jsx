import StudentAttendanceHeaderMenus from "@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus";
import React from "react";
import TakeAttendanceFilterTableMain from "./TakeAttendanceFilterTableMain";

const TakeAttendanceInnerLayout = ({
    classrooms,
    students,
    absentStudents,
    presentStudents,
    classroomAttendances,
}) => {

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentAttendanceHeaderMenus title="STUDENT ATTENDANCE" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <TakeAttendanceFilterTableMain
                            classrooms={classrooms}
                            students={students}
                            absentStudents={absentStudents}
                            presentStudents={presentStudents}
                            classroomAttendances={classroomAttendances}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TakeAttendanceInnerLayout;
