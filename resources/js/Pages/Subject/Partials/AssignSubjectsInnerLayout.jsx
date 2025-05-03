// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import AssignSubjectsForm from "./AssignSubjectsForm";

const AssignSubjectsInnerLayout = ({
    dataArray,
    subjects,
    classrooms,
    assignedSubjects,
    classId,
    classSubjectTypes,
    academic_grade_data,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                    <AcademicsExamHeaderMenu title="Academics Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignSubjectsForm
                        dataArray={dataArray}
                        subjects={subjects}
                        assignedSubjects={assignedSubjects}
                        classId={classId}
                        classSubjectTypes={classSubjectTypes}
                        academic_grade_data={academic_grade_data}
                        classrooms={classrooms}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignSubjectsInnerLayout;
