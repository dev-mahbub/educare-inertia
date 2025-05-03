import SubjectForm from "./SubjectForm";
// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";

const CreateSubjectInnerLayout = ({
    subjects,
    eLearningSubjects,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    {/* <AcademicsHeaderMenu title="Subjects" /> */}
                    <AcademicsExamHeaderMenu title="Subjects" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SubjectForm
                        subjects={subjects}
                        eLearningSubjects={eLearningSubjects}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateSubjectInnerLayout;
