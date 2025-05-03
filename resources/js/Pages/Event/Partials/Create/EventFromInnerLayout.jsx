import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import EventForm from './EventForm';

const EventFromInnerLayout = ({
    eventTypes,
    eventLevels
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EventHeaderMenus />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EventForm
                        eventTypes={eventTypes}
                        eventLevels={eventLevels}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventFromInnerLayout;
