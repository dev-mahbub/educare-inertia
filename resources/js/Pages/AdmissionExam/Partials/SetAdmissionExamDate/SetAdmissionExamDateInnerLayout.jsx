import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import React from "react";
import SetAdmissionExamDateFrom from "./SetAdmissionExamDateFrom";


const SetAdmissionExamDateInnerLayout = ( {
    classNames, 
    academicYears,
    registrations,
    academicYearId
} ) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                     <SetAdmissionExamDateFrom 
                        classNames = {classNames}
                        academicYears = {academicYears}
                        registrations={registrations}
                        academicYearId={academicYearId}
                    />
                </div>
            </div>
        </div>
    );
};

export default SetAdmissionExamDateInnerLayout;
