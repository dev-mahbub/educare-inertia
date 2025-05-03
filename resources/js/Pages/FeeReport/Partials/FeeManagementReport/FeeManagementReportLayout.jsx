import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import React from 'react';;
import FeeManagementReportLIst from './FeeManagementReportLIst';

const FeeManagementReportLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeManagementReportLIst/>
                </div>
            </div>
        </div>
    );
};

export default FeeManagementReportLayout;