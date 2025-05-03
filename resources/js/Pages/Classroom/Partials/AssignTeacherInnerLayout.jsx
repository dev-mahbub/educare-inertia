import React from "react";
import AssignTeacherForm from "./AssignTeacherForm";
import ClassNameHeaderMenus from "@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus";

const AssignTeacherInnerLayout = ({classrooms, teachers, selectedTeachers}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ClassNameHeaderMenus title="Create Class" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignTeacherForm
                        classrooms={classrooms}
                        teachers={teachers}
                        selectedTeachers={selectedTeachers}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignTeacherInnerLayout;
