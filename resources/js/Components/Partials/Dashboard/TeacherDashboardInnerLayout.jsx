import React from "react";
import TeacherMisReportMenu from "../Header/TeacherMisReportMenu";
import TeacherDashboardAcademicContent from "./Teacher/TeacherDashboardAcademicContent";
 
const TeacherDashboardInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherMisReportMenu title="Teacher Dashboard" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherDashboardAcademicContent/>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardInnerLayout;
