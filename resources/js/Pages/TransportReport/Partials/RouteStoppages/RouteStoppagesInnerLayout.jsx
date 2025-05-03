import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React from 'react';
import RouteStoppagesList from './RouteStoppagesList';
import RouteStoppagesFilter from './RouteStoppagesFilter';

const RouteStoppagesInnerLayout = ({routeStoppages}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <RouteStoppagesFilter />
                    <RouteStoppagesList routeStoppages={routeStoppages} />
                </div>
            </div>
        </div>
    );
};

export default RouteStoppagesInnerLayout;
