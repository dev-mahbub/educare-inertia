import React from 'react';
import TeachingReportHeader from './TeachingReportHeader';
import TeacherReportForm from './TeacherReportForm';
import TeacherReportTitleMenu from '../../../Components/Partials/Header/TeacherReportTitleMenu';

const TeacherReportInnerLayout = ({ siteData }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherReportTitleMenu title="Teacher Report" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeachingReportHeader siteData={siteData} />
                    <TeacherReportForm />
                </div>
            </div>
        </div>
    );
};

export default TeacherReportInnerLayout;