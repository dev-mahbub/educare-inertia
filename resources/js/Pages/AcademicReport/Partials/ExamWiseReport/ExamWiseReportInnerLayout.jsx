// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import ExamWiseReportFilter from "./ExamWiseReportFilter";
import ExamWiseReportList from "./ExamWiseReportList";

const ExamWiseReportInnerLayout = ({
    classrooms,
    exams,
    examSubjects,
    examData,
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
                    <ExamWiseReportFilter
                        classrooms={classrooms}
                        exams={exams}
                        examData={examData}
                    />
                    <ExamWiseReportList
                        examSubjects={examSubjects}
                        examData={examData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamWiseReportInnerLayout;
