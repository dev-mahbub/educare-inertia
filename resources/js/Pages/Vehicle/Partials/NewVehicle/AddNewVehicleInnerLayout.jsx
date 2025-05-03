import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import AddNewVehicleFrom from './AddNewVehicleFrom';

const AddNewVehicleInnerLayout = ({
    vehicles,
    drivers,
    conductors,
    providers
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AddNewVehicleFrom
                        vehicles={vehicles}
                        drivers={drivers}
                        conductors={conductors}
                        providers={providers}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddNewVehicleInnerLayout;
