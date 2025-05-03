import React from 'react';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import EditVehicleForm from './EditVehicleForm';


const EditVehicleInnerLayout = ({vehicleId, vehicles, drivers, conductors, providers}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditVehicleForm
                    vehicleId = {vehicleId}
                    vehicles = {vehicles}
                    drivers = {drivers}
                    conductors = {conductors}
                    providers = {providers}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditVehicleInnerLayout;