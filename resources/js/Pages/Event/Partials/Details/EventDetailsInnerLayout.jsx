import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import EventDetailsArea from './EventDetailsArea';

const EventDetailsInnerLayout = ({
    eventData,
    staffRoles,
    classGroups,
    staffs,
    fileTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EventHeaderMenus menuTitle='Event Details'/>
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EventDetailsArea
                        eventData={eventData}
                        staffRoles={staffRoles}
                        classGroups={classGroups}
                        staffs={staffs}
                        fileTypes={fileTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventDetailsInnerLayout;
