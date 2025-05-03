import AssignClassSubjectForm from "./AssignClassSubjectForm";
// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";

const AssignClassSubjectInnerLayout = ({
    subjects,
    classSubjectTypes,
    grades,
    classSubjects,
    classnames,
    subjectGroup,
    classNameId,
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
                    <AssignClassSubjectForm
                        subjects={subjects}
                        classSubjectTypes={classSubjectTypes}
                        grades={grades}
                        classSubjects={classSubjects}
                        classnames={classnames}
                        subjectGroup={subjectGroup}
                        classNameId={classNameId}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignClassSubjectInnerLayout;
