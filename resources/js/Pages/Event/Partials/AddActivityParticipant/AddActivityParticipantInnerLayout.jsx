import EventHeaderMenus from '@/Components/Partials/Menus/Event/EventHeaderMenus';
import AddActivityParticipantForm from './AddActivityParticipantForm';

const AddActivityParticipantInnerLayout = ({
    eventData,
    eventActivity,
    classrooms,
    houses,
    students
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
                    <AddActivityParticipantForm
                        eventData={eventData}
                        eventActivity={eventActivity}
                        classrooms={classrooms}
                        houses={houses}
                        students={students}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddActivityParticipantInnerLayout;
