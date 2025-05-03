import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import EventList from '../List/EventList';
import EventListFilter from '../List/EventListFilter';
import SearchBar from './SearchBar';

const EventListInnerLayout = ({
    eventStatusArr,
    eventTypes,
    academicYears,
    events
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
                    <SearchBar />
                    <EventListFilter
                        eventStatusArr={eventStatusArr}
                        eventTypes={eventTypes}
                        academicYears={academicYears}
                        events={events}
                    />
                    <EventList
                        events={events}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventListInnerLayout;
