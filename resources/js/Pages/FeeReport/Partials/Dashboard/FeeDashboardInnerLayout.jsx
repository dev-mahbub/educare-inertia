import React from 'react';
import { useRef } from 'react';
import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeeQuickReports from './FeeQuickReports';

const FeeDashboardInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <FeeHeaderMenus title="Fee Report" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeQuickReports />
                </div>
            </div>
        </div>
    );
};

export default FeeDashboardInnerLayout;