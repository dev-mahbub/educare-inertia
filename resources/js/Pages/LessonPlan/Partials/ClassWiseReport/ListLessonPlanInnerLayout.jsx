import LessonPlanHeaderMenus from "@/Components/Partials/Menus/LessonPlan/LessonPlanHeaderMenus";
import { useState } from "react";
import LessonPlanList from "./LessonPlanList";
import SearchBar from "./SearchBar";

const ListLessonPlanInnerLayout = ({
    classWiseReport,
    classrooms
}) => {
    const [lessonPlanData, setLessonPlanData] = useState([]);
    const [selectedKey, setSelectedKey] = useState(null);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <LessonPlanHeaderMenus title="Class Wise Report" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar
                        setLessonPlanData={setLessonPlanData}
                        setSelectedKey={setSelectedKey}
                        classrooms={classrooms}
                    />
                    <LessonPlanList
                        classWiseReport={classWiseReport}
                        lessonPlanData={lessonPlanData}
                        setLessonPlanData={setLessonPlanData}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListLessonPlanInnerLayout;
