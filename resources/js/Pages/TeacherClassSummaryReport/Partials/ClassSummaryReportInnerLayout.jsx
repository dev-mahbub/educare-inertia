import React from 'react';
import ClassSummaryReportHeader from './ClassSummaryReportHeader';
import ClassSummeryReportForm from './ClassSummeryReportForm';
import TeacherReportTitleMenu from '../../../Components/Partials/Header/TeacherReportTitleMenu';

const ClassSummaryReportInnerLayout = ({ siteData }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherReportTitleMenu title="Teacher Report" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClassSummaryReportHeader siteData={siteData} />
                    <ClassSummeryReportForm />
                </div>
            </div>
        </div>
    );
};

export default ClassSummaryReportInnerLayout;