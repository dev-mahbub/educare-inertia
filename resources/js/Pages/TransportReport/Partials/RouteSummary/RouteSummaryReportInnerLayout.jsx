import TransportHeaderMenus from "@/Components/Partials/Menus/Transport/TransportHeaderMenus";
import React from "react";
import RouteSummaryReport from "./RouteSummaryReport";

const RouteSummaryReportInnerLayout = ({
    routeData,
    totalStudent,
    studentData,
    routeName,
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
                    <RouteSummaryReport
                        routeData={routeData}
                        totalStudent={totalStudent}
                        studentData={studentData}
                        routeName={routeName}
                    />
                </div>
            </div>
        </div>
    );
};

export default RouteSummaryReportInnerLayout;
