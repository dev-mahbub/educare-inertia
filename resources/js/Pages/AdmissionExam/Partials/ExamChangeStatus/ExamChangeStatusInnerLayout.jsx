import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import React from "react";
import SetAdmissionExamDateFrom from "./ExamChangeStatusForm";
import ExamChangeStatusForm from "./ExamChangeStatusForm";


const ExamChangeStatusInnerLayout = ({
    academicYears,
    examStatusArray,
    classNames,
    registrations,
    academicYearId
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                     <ExamChangeStatusForm 
                        academicYears = {academicYears}
                        examStatusArray = {examStatusArray}
                        classNames = {classNames}
                        registrations = {registrations}
                        academicYearId={academicYearId}
                     />
                </div>
            </div>
        </div>
    );
};

export default ExamChangeStatusInnerLayout;
