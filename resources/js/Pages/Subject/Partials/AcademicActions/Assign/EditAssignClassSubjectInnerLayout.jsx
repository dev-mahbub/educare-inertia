import AssignClassSubjectFilter from "./AssignClassSubjectFilter";
import EditAssignClassSubjectForm from "./EditAssignClassSubjectForm";
// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";

const EditAssignClassSubjectInnerLayout = ({
    subjects,
    classSubjectTypes,
    grades,
    classroomSubjects,
    classroomSubject,
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
                    <AssignClassSubjectFilter />
                    <EditAssignClassSubjectForm
                        subjects={subjects}
                        classSubjectTypes={classSubjectTypes}
                        grades={grades}
                        classroomSubjects={classroomSubjects}
                        classroomSubject={classroomSubject}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAssignClassSubjectInnerLayout;
