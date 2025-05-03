import React from "react";
import SendExamMarksList from "./SendExamMarksList";
import SendExamMarksFilter from "./SendExamMarksFilter";
// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";

const SendExamMarksInnerLayout = ({
    exams,
    classrooms,
    studentMark,
    studentSubject,
    totalCount,
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
                    <SendExamMarksFilter
                        totalCount={totalCount}
                        exams={exams}
                        classrooms={classrooms}
                        // studentSubject={studentSubject}
                    />
                    <SendExamMarksList
                        studentMark={studentMark}
                        studentSubject={studentSubject}
                    />
                </div>
            </div>
        </div>
    );
};

export default SendExamMarksInnerLayout;
