import React from 'react';
import StaffReligionAnalyticsChart from "./StaffCharts/StaffReligionAnalyticsChart";

const StaffReligionAnalytics = ({religionStaffs}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>Religion-wise Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="religion-wise-analytics-chart flex justify-center items-center h-[420px] maxSm:h-auto">
                <StaffReligionAnalyticsChart religionStaffs={religionStaffs}/>
            </div>
        </div>
    );
};

export default StaffReligionAnalytics;