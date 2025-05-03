import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import AddVehicleStaffForm from './AddVehicleStaffForm';

const AddVehicleStaffInnerLayout = ({ driverType, driverProofType,  status, genderArr, drivers,states }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AddVehicleStaffForm
                        driverType={driverType}
                        driverProofType={driverProofType}
                        status={status}
                        genderArr={genderArr}
                        drivers={drivers}
                        states={states}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddVehicleStaffInnerLayout;