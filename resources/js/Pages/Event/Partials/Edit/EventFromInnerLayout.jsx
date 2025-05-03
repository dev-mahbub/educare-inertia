import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import EventForm from './EventForm';

const EventFromInnerLayout = ({
    eventTypes,
    eventLevels,
    eventData
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EventHeaderMenus menuTitle='Create An Event'/>
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EventForm
                        eventTypes={eventTypes}
                        eventLevels={eventLevels}
                        eventData={eventData}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventFromInnerLayout;
