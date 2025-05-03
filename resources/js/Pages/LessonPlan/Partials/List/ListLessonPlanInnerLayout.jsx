import LessonPlanHeaderMenus from "@/Components/Partials/Menus/LessonPlan/LessonPlanHeaderMenus";
import LessonPlanList from "./LessonPlanList";
import SearchBar from "./SearchBar";

const ListLessonPlanInnerLayout = ({
    lessonPlans,
    classrooms,
    subjects
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <LessonPlanHeaderMenus title="Lesson plan list" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar
                        classrooms={classrooms}
                        subjects={subjects}
                        lessonPlans={lessonPlans}
                    />
                    <LessonPlanList
                        lessonPlans={lessonPlans}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListLessonPlanInnerLayout;
