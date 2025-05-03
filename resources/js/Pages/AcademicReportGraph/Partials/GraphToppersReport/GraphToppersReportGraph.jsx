import React from "react";
import GraphToppersReportChart from "./GraphToppersReportChart";
const GraphToppersReportGraph = ({ topperReport }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm">
            <div className="student-subject-wise-report-chart">
                <GraphToppersReportChart topperReport={topperReport} />
            </div>
        </div>
    );
};

export default GraphToppersReportGraph;
