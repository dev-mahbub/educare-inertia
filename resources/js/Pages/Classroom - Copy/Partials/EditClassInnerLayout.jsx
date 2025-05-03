import React from "react";
import ClassForm from "./CreateClassForm";
import ClassNameHeaderMenus from "@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus";
import EditClassForm from "./EditClassForm";

const EditClassInnerLayout = ({classrooms, subject_titles, subject_grades, classNames}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ClassNameHeaderMenus title="Edit Class" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditClassForm
                         classrooms={classrooms}
                         subject_titles={subject_titles}
                         subject_grades={subject_grades}
                         classNames={classNames}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditClassInnerLayout;
