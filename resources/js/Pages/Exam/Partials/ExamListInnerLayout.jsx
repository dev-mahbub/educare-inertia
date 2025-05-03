import React from 'react';
import ExamList from './ExamList';
import ExamListSearch from './ExamListSearch';
import ExamListFilter from './ExamListFilter';

const ExamListInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamListSearch />
                    <ExamListFilter />
                    <ExamList />
                </div>
            </div>
        </div>
    );
};

export default ExamListInnerLayout;