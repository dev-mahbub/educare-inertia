import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import CreateActivityForm from './CreateActivityForm';

const CreateActivityInnerLayout = ({
    eventData
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EventHeaderMenus menuTitle='Create Event Activity'/>
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateActivityForm
                        eventData={eventData}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateActivityInnerLayout;
