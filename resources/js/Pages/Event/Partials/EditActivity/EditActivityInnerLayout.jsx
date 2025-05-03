import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import EditActivityForm from './EditActivityForm';

const EditActivityInnerLayout = ({
    eventData,
    eventActivity
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EventHeaderMenus menuTitle='Edit Event Activity'/>
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditActivityForm
                        eventData={eventData}
                        eventActivity={eventActivity}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditActivityInnerLayout;
