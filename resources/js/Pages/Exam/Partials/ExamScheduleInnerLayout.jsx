import React from 'react';
import ExamScheduleListFilter from './ExamScheduleListFilter';
import ExamScheduleList from './ExamScheduleList';

const ExamScheduleInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamScheduleListFilter />
                    <ExamScheduleList />
                </div>
            </div>
        </div>
    );
};

export default ExamScheduleInnerLayout;