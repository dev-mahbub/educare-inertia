import React from 'react';
import StudentTeachingReportHeader from './StudentTeachingReportHeader';
import StudentTeacherReportForm from './StudentTeacherReportForm';
import TeacherReportTitleMenu from '../../../Components/Partials/Header/TeacherReportTitleMenu';

const StudentTeacherReportInnerLayout = ({ siteData }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherReportTitleMenu title="Teacher Report" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentTeachingReportHeader siteData={siteData} />
                    <StudentTeacherReportForm />
                </div>
            </div>
        </div>
    );
};

export default StudentTeacherReportInnerLayout;