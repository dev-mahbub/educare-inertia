import React from 'react';
import StudentHouseChart from "./StudentCharts/StudentHouseChart";

const StudentHouseGraph = ( {getHouseWiseStudent} ) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>House-wise Students</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <StudentHouseChart getHouseWiseStudent = {getHouseWiseStudent} />
            </div>
        </div>
    );
};

export default StudentHouseGraph;