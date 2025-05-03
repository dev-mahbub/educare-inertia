import React from 'react';
import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import TeacherSubjectReportForm from './TeacherSubjectReportForm';

const TeacherSubjectReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AcademicsHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherSubjectReportForm />
                </div>
            </div>
        </div>
    );
};

export default TeacherSubjectReportInnerLayout;