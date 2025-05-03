import React from 'react';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import EditVehicleStaffForm from './EditVehicleStaffForm';

const EditVehicleStaffInnerLayout = ({ driverType, driverProofType,  status, genderArr, drivers,driverId,}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditVehicleStaffForm
                        driverType={driverType}
                        driverProofType={driverProofType}
                        status={status}
                        genderArr={genderArr}
                        drivers={drivers}
                        driverId={driverId}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditVehicleStaffInnerLayout;