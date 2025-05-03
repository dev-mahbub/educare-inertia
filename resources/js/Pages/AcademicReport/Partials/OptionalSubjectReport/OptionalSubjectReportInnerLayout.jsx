import React from "react";
// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import OptionalSubjectReportForm from "./OptionalSubjectReportForm";

const OptionalSubjectReportInnerLayout = ({
    subjects,
    classrooms,
    getStudentData,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                        <AcademicsExamHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <OptionalSubjectReportForm
                        subjects={subjects}
                        classrooms={classrooms}
                        getStudentData={getStudentData}
                    />
                </div>
            </div>
        </div>
    );
};

export default OptionalSubjectReportInnerLayout;
