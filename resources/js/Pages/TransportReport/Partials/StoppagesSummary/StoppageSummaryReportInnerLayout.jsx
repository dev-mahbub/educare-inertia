import TransportHeaderMenus from "@/Components/Partials/Menus/Transport/TransportHeaderMenus";
import React from "react";
import StoppageSummaryReport from "./StoppageSummaryReport";

const StoppageSummaryReportInnerLayout = ({
    stopPageData,
    totalStudent,
    studentData,
    stopPageName,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StoppageSummaryReport
                        stopPageData={stopPageData}
                        totalStudent={totalStudent}
                        studentData={studentData}
                        stopPageName={stopPageName}
                    />
                </div>
            </div>
        </div>
    );
};

export default StoppageSummaryReportInnerLayout;
