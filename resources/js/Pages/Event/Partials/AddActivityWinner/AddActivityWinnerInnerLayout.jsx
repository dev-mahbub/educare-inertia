import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import AddActivityWinnerForm from './AddActivityWinnerForm';

const AddActivityWinnerInnerLayout = ({
    eventData,
    eventActivity,
    participants
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
                    <AddActivityWinnerForm
                        eventData={eventData}
                        eventActivity={eventActivity}
                        participants={participants}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddActivityWinnerInnerLayout;
