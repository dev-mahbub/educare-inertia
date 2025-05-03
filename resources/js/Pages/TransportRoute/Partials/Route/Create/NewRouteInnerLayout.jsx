import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import CreateNewRouteForm from './CreateNewRouteForm';

const NewRouteInnerLayout = ({
    vehicles,
    teachers,
    vehicle_no
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
                    <CreateNewRouteForm
                        vehicles={vehicles}
                        teachers={teachers}
                        vehicle_no={vehicle_no}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewRouteInnerLayout;
