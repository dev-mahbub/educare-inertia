import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React from 'react';
import CreateStoppageForm from './CreateStoppageForm';

const CreateStoppageInnerLayout = ({areas, routes}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateStoppageForm 
                    areas = {areas}
                    routes={routes}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateStoppageInnerLayout;