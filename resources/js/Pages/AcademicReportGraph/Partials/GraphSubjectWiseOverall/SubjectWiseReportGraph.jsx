import React from "react";
import SubjectWiseReportGraphChart from "./SubjectWiseReportGraphChart";
const SubjectWiseReportGraph = ({ ranges = [] }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm">
            <div className="student-subject-wise-report-chart">
                <SubjectWiseReportGraphChart ranges={ranges} />
            </div>
        </div>
    );
};

export default SubjectWiseReportGraph;
