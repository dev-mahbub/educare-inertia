import React from 'react';
import StaffCasteAnalyticsChart from "./StaffCharts/StaffCasteAnalyticsChart";

const StaffCasteAnalytics = ({castleStaffs}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-2">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>Caste-wise Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="staff-caste-analytics-chart flex justify-center items-center h-[420px] maxSm:h-auto">
                <StaffCasteAnalyticsChart castleStaffs={castleStaffs} />
            </div>
        </div>
    );
};

export default StaffCasteAnalytics;
