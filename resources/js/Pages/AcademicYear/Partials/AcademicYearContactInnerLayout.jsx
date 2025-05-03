import React from "react";
import AcademicYearForm from "./AcademicYearForm";
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const AcademicYearContactInnerLayout = ({academicYears}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Academic Year" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AcademicYearForm
                        academicYears={academicYears}
                    />
                </div>
            </div>
        </div>
    );
};

export default AcademicYearContactInnerLayout;
