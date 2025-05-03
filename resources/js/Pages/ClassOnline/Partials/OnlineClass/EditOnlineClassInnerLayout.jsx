import ClassroomHeaderMenus from '@/Components/Partials/Menus/Classroom/ClassroomHeaderMenus';
import EditOnlineClassForm from './EditOnlineClassForm';

const EditOnlineClassInnerLayout = ({
    online_class,
    classrooms,
    subjects,
    dayTitles
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ClassroomHeaderMenus title="Online Class" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditOnlineClassForm
                        online_class={online_class}
                        classrooms={classrooms}
                        subjects={subjects}
                        dayTitles={dayTitles}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditOnlineClassInnerLayout;
