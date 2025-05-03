import React from "react";
import StudentMisReportMenu from "../Header/StudentMisReportMenu";
import StudentDashboardTables from "./Student/StudentDashboardTables";

const StudentDashboardInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <StudentMisReportMenu title="Student Dashboard" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentDashboardTables />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardInnerLayout;
