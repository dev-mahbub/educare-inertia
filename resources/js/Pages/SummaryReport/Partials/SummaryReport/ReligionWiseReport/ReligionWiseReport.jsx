import React from "react";
import ReligionWiseReportChart from "./ReligionWiseReportChart";

const ReligionWiseReport = () => {
    return (
        <>
            <div className="educare-bulk-messages-area educare-dashboard-card min-h-full">
                <div className="educare-card-header mb-[20px]">
                    <h3 className="educare-card-header-title">
                        Religion Wise Report
                    </h3>
                    <div className="educare-card-header-icon">
                        <span>
                            <i className="icon-more"></i>
                        </span>
                    </div>
                </div>
              
                <div className="educare-bulk-chart flex justify-center">
                    <ReligionWiseReportChart />
                </div>
            </div>
        </>
    );
};

export default ReligionWiseReport;
