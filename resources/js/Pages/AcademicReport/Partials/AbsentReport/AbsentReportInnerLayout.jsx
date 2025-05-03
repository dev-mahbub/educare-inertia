// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import AbsentReportList from "./AbsentReportList";

const AbsentReportInnerLayout = ({
    exams,
    classrooms,
    subjects,
    absentStudentData,
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
                    <AbsentReportList
                        exams={exams}
                        classrooms={classrooms}
                        subjects={subjects}
                        absentStudentData={absentStudentData}
                    />
                </div>
            </div>
        </div>
    );
};

export default AbsentReportInnerLayout;
