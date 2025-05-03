import React from "react";
import GenderWiseReportChart from "./GenderWiseReportChart";

const GenderWiseReport = () => {
    return (
        <>
            <div className="educare-bulk-messages-area educare-dashboard-card min-h-full">
                <div className="educare-card-header mb-[20px]">
                    <h3 className="educare-card-header-title">
                        Gender Wise Report
                    </h3>
                    <div className="educare-card-header-icon">
                        <span>
                            <i className="icon-more"></i>
                        </span>
                    </div>
                </div>
                <div className="educare-bulk-chart flex justify-center">
                    <GenderWiseReportChart />
                </div>
            </div>
        </>
    );
};

export default GenderWiseReport;
