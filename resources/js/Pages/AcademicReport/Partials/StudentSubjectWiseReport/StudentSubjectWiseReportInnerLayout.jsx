// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import StudentSubjectWiseReportFilter from "./StudentSubjectWiseReportFilter";
import StudentSubjectWiseReportList from "./StudentSubjectWiseReportList";

const StudentSubjectWiseReportInnerLayout = ({
    subjects,
    classrooms,
    students,
    student,
    studentSubjectWiseRepo
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
                    <StudentSubjectWiseReportFilter
                        subjects={subjects}
                        classrooms={classrooms}
                        students={students}
                        student={student}
                    />
                    <StudentSubjectWiseReportList
                        studentSubjectWiseRepo={studentSubjectWiseRepo}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentSubjectWiseReportInnerLayout;
