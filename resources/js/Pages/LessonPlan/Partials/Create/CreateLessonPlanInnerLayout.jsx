import LessonPlanHeaderMenus from "@/Components/Partials/Menus/LessonPlan/LessonPlanHeaderMenus";
import CreateLessonPlanForm from "./CreateLessonPlanForm";

const CreateSchoolInnerLayout = ({
    subjects,
    classNames,
    lessonPlan,
    methodologies,
    classrooms,
    teachers
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <LessonPlanHeaderMenus title="Create lesson plan" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateLessonPlanForm
                        subjects={subjects}
                        classNames={classNames}
                        lessonPlan={lessonPlan}
                        methodologies={methodologies}
                        classrooms={classrooms}
                        teachers={teachers}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateSchoolInnerLayout;
