import HeaderSeacrhBar from '@/Components/Partials/Header/HeaderSeacrhBar';
import React from 'react';
import CommunicationCategoryList from './CommunicationCategoryList';
import TeacherMisReportMenu from '@/Components/Partials/Header/TeacherMisReportMenu';
import MisReportMenu from '@/Components/Partials/Header/MisReportMenu';



const CommunicationInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    { siteData?.authRoles.indexOf("Teacher") > -1 ?
                    <TeacherMisReportMenu title="Communications" />
                    :
                    <MisReportMenu title="Communications" />
                    }
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CommunicationCategoryList siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default CommunicationInnerLayout;