import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import EventPreviewReport from './EventPreviewReport';

const EventPreviewInnerLayout = ({
    eventData
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EventHeaderMenus menuTitle='Event Preview'/>
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EventPreviewReport
                        eventData={eventData}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventPreviewInnerLayout;
