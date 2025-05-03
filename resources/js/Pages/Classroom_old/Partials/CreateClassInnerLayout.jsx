import React from "react";
import ClassNameHeaderMenus from "@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus";
import CreateClassForm from "./CreateClassForm";

const CreateClassInnerLayout = ({classNames, subject_titles, subject_grades}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ClassNameHeaderMenus title="Create Class" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateClassForm
                         classNames={classNames}
                         subject_titles={subject_titles}
                         subject_grades={subject_grades}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateClassInnerLayout;
