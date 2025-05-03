import LessonPlanHeaderMenus from "@/Components/Partials/Menus/LessonPlan/LessonPlanHeaderMenus";
import EditLessonPlanForm from "./EditLessonPlanForm";

const EditLessonPlanInnerLayout = ({
    subjects,
    classNames,
    classrooms,
    teachers,
    lessonPlan
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <LessonPlanHeaderMenus title="Edit lesson plan" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditLessonPlanForm
                        subjects={subjects}
                        classNames={classNames}
                        classrooms={classrooms}
                        teachers={teachers}
                        lessonPlan={lessonPlan}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditLessonPlanInnerLayout;
