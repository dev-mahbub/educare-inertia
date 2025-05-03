import React from 'react';
// import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import ConsolidatedReportList from './ConsolidatedReportList';

const ConsolidatedReportInnerLayout = ({ classrooms, getStudentListWithMark, examsData,examSubjects }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                        <AcademicsExamHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ConsolidatedReportList 
                    classrooms = {classrooms}
                    getStudentListWithMark = {getStudentListWithMark}
                    examsData = {examsData}
                    examSubjects = {examSubjects}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsolidatedReportInnerLayout;