import StudentHeaderMenus from "@/Components/Partials/Menus/Student/StudentHeaderMenus";
import React from "react";
import TcSummaryReportTables from "./TcSummaryReportTables";

const TcSummaryReportInnerLayout = ({
    tcSummery,
    tcStudents,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentHeaderMenus title="STUDENTS" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <TcSummaryReportTables
                            tcSummery={tcSummery}
                            tcStudents={tcStudents}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TcSummaryReportInnerLayout;
