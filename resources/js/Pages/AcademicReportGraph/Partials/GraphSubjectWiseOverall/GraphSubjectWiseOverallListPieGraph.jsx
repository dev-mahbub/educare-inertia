import React from "react";
import GraphSubjectWiseOverallListPieChart from "./GraphSubjectWiseOverallListPieChart";
const GraphSubjectWiseOverallListPieGraph = ({ ranges = [] }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm flex justify-center items-center py-5">
            <div className="student-subject-wise-report-chart">
                <GraphSubjectWiseOverallListPieChart ranges={ranges} />
            </div>
        </div>
    );
};

export default GraphSubjectWiseOverallListPieGraph;
