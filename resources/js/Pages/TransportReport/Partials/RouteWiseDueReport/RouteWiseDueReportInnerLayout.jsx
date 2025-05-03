import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React from 'react';
import RouteWiseDueReportTopbar from './RouteWiseDueReportTopbar';
import RouteWiseDueReportTable from './RouteWiseDueReportTable';

const RouteWiseDueReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <RouteWiseDueReportTopbar />
                    <RouteWiseDueReportTable />
                </div>
            </div>
        </div>
    );
};

export default RouteWiseDueReportInnerLayout;