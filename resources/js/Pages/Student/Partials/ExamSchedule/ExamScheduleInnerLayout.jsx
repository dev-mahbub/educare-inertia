import React from 'react';
import ExamScheduleListFilter from './ExamScheduleListFilter';
import ExamScheduleList from './ExamScheduleList';

const ExamScheduleInnerLayout = ({students, studentId, examSchedule, examScheduleDetails}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamScheduleListFilter examSchedule={examSchedule} students={students} studentId={studentId}/>
                    <ExamScheduleList examSchedule={examSchedule} students={students} studentId={studentId} examScheduleDetails={examScheduleDetails}/>
                </div>
            </div>
        </div>
    );
};

export default ExamScheduleInnerLayout;