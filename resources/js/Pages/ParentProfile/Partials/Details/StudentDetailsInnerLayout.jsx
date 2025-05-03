import React from "react";
import StudentDetailsForm from "./StudentDetailsForm";
import StudentDetailMenus from "@/Components/Partials/Menus/StudentDetail/StudentDetailMenus";

const StudentDetailsInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentDetailMenus title="Student Detail" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentDetailsForm />
                </div>
            </div>
        </div>
    );
};

export default StudentDetailsInnerLayout;
