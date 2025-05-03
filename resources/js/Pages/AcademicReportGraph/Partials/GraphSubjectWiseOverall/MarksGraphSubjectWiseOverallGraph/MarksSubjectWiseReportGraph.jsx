import React from 'react';
import MarksSubjectWiseReportGraphChart from './MarksSubjectWiseReportGraphChart';
const MarksSubjectWiseReportGraph = ({  markRanges = [] }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm">
            <div className="student-subject-wise-report-chart">
                <MarksSubjectWiseReportGraphChart
                 markRanges = {markRanges}
                />
            </div>
        </div>
    );
};

export default MarksSubjectWiseReportGraph;