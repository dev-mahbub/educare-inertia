import React from 'react';
import GraphWeakersReportChart from './GraphWeakersReportChart';
const GraphWeakersReportChartGraph = ({ graphWeakerReport }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm">
            <div className="student-subject-wise-report-chart">
                <GraphWeakersReportChart
                graphWeakerReport = {graphWeakerReport}
                />
            </div>
        </div>
    );
};

export default GraphWeakersReportChartGraph;