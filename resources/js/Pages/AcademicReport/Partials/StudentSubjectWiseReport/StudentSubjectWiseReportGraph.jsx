import StudentSubjectWiseReportChart from './StudentSubjectWiseReportChart';
const StudentSubjectWiseReportGraph = ({ studentSubjectWiseRepo }) => {
    return (
        <div className="student-subject-card bg-white rounded-sm">
            <div className="student-subject-wise-report-chart">
                <StudentSubjectWiseReportChart
                    studentSubjectWiseRepo = {studentSubjectWiseRepo}
                />
            </div>
        </div>
    );
};

export default StudentSubjectWiseReportGraph;
