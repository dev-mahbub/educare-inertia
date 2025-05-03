import React from 'react';
import MarksGraphSubjectWiseOverallListPieChart from './MarksGraphSubjectWiseOverallListPieChart';
const MarksGraphSubjectWiseOverallListPieGraph = ({ markRanges = [] }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm flex justify-center items-center py-5">
            <div className="student-subject-wise-report-chart">
                <MarksGraphSubjectWiseOverallListPieChart 
                markRanges = {markRanges}
                />
            </div>
        </div>
    );
};

export default MarksGraphSubjectWiseOverallListPieGraph;