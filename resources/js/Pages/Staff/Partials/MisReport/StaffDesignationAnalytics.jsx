import React from 'react';
import StaffDesignationAnalyticsChart from "./StaffCharts/StaffDesignationAnalyticsChart";

const StaffDesignationAnalytics = ({designationStaffs}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>Designation-wise Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="staff-designation-analytics-chart">
                <StaffDesignationAnalyticsChart designationStaffs={designationStaffs}/>
            </div>
        </div>
    );
};

export default StaffDesignationAnalytics;