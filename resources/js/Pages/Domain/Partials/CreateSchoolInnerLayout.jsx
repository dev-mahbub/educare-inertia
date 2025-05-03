import React from "react";
import SchoolForm from "./SchoolForm";
import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";

const CreateSchoolInnerLayout = ({}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <AdmissionHeaderMenus title="Create School" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SchoolForm
                        className=""
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateSchoolInnerLayout;
