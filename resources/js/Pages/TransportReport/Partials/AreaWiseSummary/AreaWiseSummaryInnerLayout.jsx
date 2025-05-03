import TransportHeaderMenus from "@/Components/Partials/Menus/Transport/TransportHeaderMenus";
import React from "react";
import AreaWiseSummaryReport from "./AreaWiseSummaryReport";

const AreaWiseSummaryInnerLayout = ({
    areaData,
    areaName,
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
                    <AreaWiseSummaryReport
                        areaData={areaData}
                        areaName={areaName}
                        studentData={studentData}
                    />
                </div>
            </div>
        </div>
    );
};

export default AreaWiseSummaryInnerLayout;
