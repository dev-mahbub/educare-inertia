import TransportHeaderMenus from "@/Components/Partials/Menus/Transport/TransportHeaderMenus";
import React from "react";
import ClassWiseSummaryReport from "./ClassWiseSummaryReport";

const ClassWiseSummaryInnerLayout = ({
    classrooms,
    studentData,
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
                    <ClassWiseSummaryReport
                        classrooms={classrooms}
                        studentData={studentData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassWiseSummaryInnerLayout;
