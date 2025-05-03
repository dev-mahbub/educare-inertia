import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React from 'react';
import UpdateTransportFeeNote from './UpdateTransportFeeNote';
import UpdateTransportFeeForm from './UpdateTransportFeeForm';

const UpdateTransportFeeInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <UpdateTransportFeeNote />
                    <UpdateTransportFeeForm />
                </div>
            </div>
        </div>
    );
};

export default UpdateTransportFeeInnerLayout;