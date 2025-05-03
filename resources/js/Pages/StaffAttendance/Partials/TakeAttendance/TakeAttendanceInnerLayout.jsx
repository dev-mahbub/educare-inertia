
import StaffAttendanceHeaderMenus from "@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus";
import TakeAttendanceFilterTableMain from "./TakeAttendanceFilterTableMain";
const TakeAttendanceInnerLayout = ({
    allStaff,
    staffTypes,
    attendanceTypes,
    departments,
    staffAttendance,
    leaveTypes,
    isBackDateAllowed,
    dayTypes
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StaffAttendanceHeaderMenus title="Staff Attendance" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <TakeAttendanceFilterTableMain
                            allStaff={allStaff}
                            staffTypes={staffTypes}
                            attendanceTypes={attendanceTypes}
                            departments={departments}
                            staffAttendance={staffAttendance}
                            leaveTypes={leaveTypes}
                            isBackDateAllowed={isBackDateAllowed}
                            dayTypes={dayTypes}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TakeAttendanceInnerLayout;
