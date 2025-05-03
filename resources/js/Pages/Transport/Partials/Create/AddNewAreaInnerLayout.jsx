import React from 'react';
import AddNewAreaForm from './AddNewAreaForm';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';

const AddNewAreaInnerLayout = ({areas}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AddNewAreaForm areas={areas}/>
                </div>
            </div>
        </div>
    );
};

export default AddNewAreaInnerLayout;