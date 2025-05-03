import React from 'react';
import StudentGrowthChart from "./StudentCharts/StudentGrowthChart";

const StudentGrowthGraph = ( {getTotalStudentPerSession} ) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>School growth analytics - Student wise</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <StudentGrowthChart getTotalStudentPerSession = {getTotalStudentPerSession} />
            </div>
        </div>
    );
};

export default StudentGrowthGraph;