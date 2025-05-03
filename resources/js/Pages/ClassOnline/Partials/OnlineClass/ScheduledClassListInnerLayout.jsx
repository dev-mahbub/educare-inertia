import ClassroomHeaderMenus from '@/Components/Partials/Menus/Classroom/ClassroomHeaderMenus';
import ScheduledClassList from './ScheduledClassList';
import ScheduledClassListFilter from './ScheduledClassListFilter';
import SearchBar from './SearchBar';

const ScheduledClassListInnerLayout = ({
    online_classes,
    classrooms,
    subjects
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
                    <SearchBar />
                    <ScheduledClassListFilter
                        online_classes={online_classes}
                        classrooms={classrooms}
                        subjects ={subjects}
                    />
                    <ScheduledClassList
                        online_classes={online_classes}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScheduledClassListInnerLayout;
