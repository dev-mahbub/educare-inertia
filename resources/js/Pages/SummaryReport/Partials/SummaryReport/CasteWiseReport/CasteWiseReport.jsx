import React from "react";
import CasteWiseReportChart from "./CasteWiseReportChart";

const CasteWiseReport = () => {
    return (
        <>
            <div className="educare-bulk-messages-area educare-dashboard-card min-h-full">
                <div className="educare-card-header mb-[20px]">
                    <h3 className="educare-card-header-title">
                        Caste Wise Report
                    </h3>
                    <div className="educare-card-header-icon">
                        <span>
                            <i className="icon-more"></i>
                        </span>
                    </div>
                </div>
                <div className="educare-bulk-chart flex justify-center">
                    <CasteWiseReportChart />
                </div>
            </div>
        </>
    );
};

export default CasteWiseReport;
