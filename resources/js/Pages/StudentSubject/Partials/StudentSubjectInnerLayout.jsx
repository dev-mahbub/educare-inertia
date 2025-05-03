// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import StudentSubjectForm from "./StudentSubjectForm";

const StudentSubjectInnerLayout = ({
    studentData,
    classrooms,
    studentNames,
    studentSubjects,
    selected_subject_ids,
    subject_numbers,
    students,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                            <AcademicsExamHeaderMenu title="Academics Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <StudentSubjectForm
                            studentData={studentData}
                            classrooms={classrooms}
                            studentNames={studentNames}
                            studentSubjects={studentSubjects}
                            selected_subject_ids={selected_subject_ids}
                            subject_numbers={subject_numbers}
                            students={students}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentSubjectInnerLayout;
