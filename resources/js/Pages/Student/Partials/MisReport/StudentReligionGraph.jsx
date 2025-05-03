import React from 'react';
import StudentReligionChart from "./StudentCharts/StudentReligionChart";

const StudentReligionGraph = ( {getReligionWiseStudent} ) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-3">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>Religion-wise Students</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <StudentReligionChart getReligionWiseStudent = {getReligionWiseStudent} />
            </div>
        </div>
    );
};

export default StudentReligionGraph;