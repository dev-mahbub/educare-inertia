import React from "react";
import AssignTeacherForm from "./AssignTeacherForm";
import ClassNameHeaderMenus from "@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus";

const AssignTeacherInnerLayout = ({subjects, teachers, selectedTeachers, id}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ClassNameHeaderMenus title="Assign Subject Teacher" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignTeacherForm
                        subjects = {subjects}
                        teachers={teachers}
                        selectedTeachers={selectedTeachers}
                        id={id}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignTeacherInnerLayout;
