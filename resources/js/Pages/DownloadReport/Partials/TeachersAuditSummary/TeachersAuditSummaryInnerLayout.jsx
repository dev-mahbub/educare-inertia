import React from 'react';
import TeachersAuditSummaryFilter from './TeachersAuditSummaryFilter';
import TeachersAuditSummaryTable from './TeachersAuditSummaryTable';
import DownloadHeaderMenus from '@/Components/Partials/Menus/Download/DownloadHeaderMenus';
const TeachersAuditSummaryInnerLayout = () => {
    return (
        <>
             <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                    <DownloadHeaderMenus title="Download Management"/>
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeachersAuditSummaryFilter/>
                    <TeachersAuditSummaryTable/>
                </div>
            </div>
        </div>
        </>
    );
};

export default TeachersAuditSummaryInnerLayout;