import React from 'react';
import GraphClassWiseOverallListBarChart from './GraphClassWiseOverallListBarChart';
const GraphClassWiseOverallListBarGraph = ({ ranges = [] }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm">
            <div className="student-subject-wise-report-chart">
                <GraphClassWiseOverallListBarChart ranges={ranges}/>
            </div>
        </div>
    );
};

export default GraphClassWiseOverallListBarGraph;