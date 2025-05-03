import React from 'react';
import StaffsDepartmentAnalysisChart from "./StaffCharts/StaffsDepartmentAnalysisChart";

const StaffsDepartmentAnalysis = ({departmentsStaffs}) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>Department-wise Analysis</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="staff-department-analytics-chart">
                <StaffsDepartmentAnalysisChart 
                    departmentsStaffs={departmentsStaffs} />
            </div>
        </div>
    );
};

export default StaffsDepartmentAnalysis;