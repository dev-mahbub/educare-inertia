import ClassroomHeaderMenus from '@/Components/Partials/Menus/Classroom/ClassroomHeaderMenus';
import TodaysClassListFilter from './TodaysClassListFilter';
import TodaysClassesList from './TodaysClassesList';

const TodaysClassesInnerLayout = ({
    today_online_class,
    classrooms,
    subjects,
    currentDate
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
                    <TodaysClassListFilter
                        today_online_class={today_online_class}
                        classrooms={classrooms}
                        subjects={subjects}
                    />
                    <TodaysClassesList
                        today_online_class={today_online_class}
                        currentDate={currentDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodaysClassesInnerLayout;
