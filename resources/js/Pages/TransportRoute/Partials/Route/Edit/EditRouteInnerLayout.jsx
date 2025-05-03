import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React from 'react';
import EditRouteForm from './EditRouteForm';

const EditRouteInnerLayout = ({  vehicles,teachers,routeId,routes }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditRouteForm 
                    vehicles={vehicles} 
                    teachers={teachers} 
                    routeId={routeId} 
                    routes={routes} 
                   
                    />
                </div>
            </div>
        </div>
    );
};

export default EditRouteInnerLayout;
