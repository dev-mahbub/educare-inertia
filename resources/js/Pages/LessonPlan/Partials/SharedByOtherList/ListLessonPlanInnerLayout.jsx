import LessonPlanHeaderMenus from "@/Components/Partials/Menus/LessonPlan/LessonPlanHeaderMenus";
import { useMemo, useState } from "react";
import LessonPlanList from "./LessonPlanList";
import SearchBar from "./SearchBar";

const ListLessonPlanInnerLayout = ({
    lessonPlans
}) => {
    const[filterText, setFilterText] = useState("");

    const filteredLessonPlans = useMemo(() => {
        return lessonPlans?.filter(item => {
            const inputText = filterText?.trim()?.toLowerCase();

            const teacherName = (`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`)?.toLowerCase();
            const classTitle = item?.classroom_titles?.toLowerCase();
            const subjectTitle = item?.subject?.title?.toLowerCase();
            const title = item?.title?.toLowerCase();
            const topic = item?.lesson_topic?.toLowerCase();
            const startDate = item?.start_date?.toLowerCase();
            const endDate = item?.end_date?.toLowerCase();

            return (
                (teacherName && teacherName?.includes(inputText)) ||
                (classTitle && classTitle?.includes(inputText)) ||
                (subjectTitle && subjectTitle?.includes(inputText)) ||
                (title && title?.includes(inputText)) ||
                (topic && topic?.includes(inputText)) ||
                (startDate && startDate?.includes(inputText)) ||
                (endDate && endDate?.includes(inputText))
            );
        });
    }, [lessonPlans, filterText]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <LessonPlanHeaderMenus title="Lesson Plans shared with you" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar
                        lessonPlans={filteredLessonPlans}
                        filterText={filterText}
                        setFilterText={setFilterText}
                    />
                    <LessonPlanList
                        lessonPlans={filteredLessonPlans}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListLessonPlanInnerLayout;
