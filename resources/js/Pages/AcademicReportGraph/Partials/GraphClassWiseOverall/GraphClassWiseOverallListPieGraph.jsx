import React from 'react';
import GraphClassWiseOverallListPieChart from './GraphClassWiseOverallListPieChart';
const GraphClassWiseOverallListPieGraph = ({ ranges = [] }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm flex justify-center items-center py-5">
            <div className="student-subject-wise-report-chart">
                <GraphClassWiseOverallListPieChart ranges = {ranges}/>
            </div>
        </div>
    );
};

export default GraphClassWiseOverallListPieGraph;