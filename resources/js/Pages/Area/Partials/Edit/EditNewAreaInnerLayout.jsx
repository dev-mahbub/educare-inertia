import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import EditNewAreaForm from './EditNewAreaForm';

const EditNewAreaInnerLayout = ({
    areas,
    area
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
                    <EditNewAreaForm areas={areas} area={area} />
                </div>
            </div>
        </div>
    );
};

export default EditNewAreaInnerLayout;
