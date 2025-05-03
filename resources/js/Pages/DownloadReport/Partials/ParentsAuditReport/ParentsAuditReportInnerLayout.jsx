import DownloadHeaderMenus from '@/Components/Partials/Menus/Download/DownloadHeaderMenus';
import React from 'react';
import ParentsAuditReportFilter from './ParentsAuditReportFilter';
import ParentsAuditReportTable from './ParentsAuditReportTable';

const ParentsAuditReportInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <DownloadHeaderMenus title="Download Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <ParentsAuditReportFilter />
                        <ParentsAuditReportTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParentsAuditReportInnerLayout;