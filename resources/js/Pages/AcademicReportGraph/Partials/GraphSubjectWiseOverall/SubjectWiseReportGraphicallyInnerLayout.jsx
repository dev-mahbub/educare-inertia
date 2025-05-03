// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import GraphSubjectWiseOverallList from "./GraphSubjectWiseOverallList";
import MarksGraphSubjectWiseOverallGraphList from "./MarksGraphSubjectWiseOverallGraph/MarksGraphSubjectWiseOverallGraphList";
import SubjectWiseReportGraphicallyFilter from "./SubjectWiseReportGraphicallyFilter";

const SubjectWiseReportGraphicallyInnerLayout = ({
    exams,
    classrooms,
    subjects,
    ranges = [],
    markRanges = [],
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
                    <SubjectWiseReportGraphicallyFilter
                        exams={exams}
                        classrooms={classrooms}
                        subjects={subjects}
                    />

                    {ranges?.length > 0 &&
                        <GraphSubjectWiseOverallList ranges={ranges} />
                    }

                    {markRanges?.length > 0 &&
                        <MarksGraphSubjectWiseOverallGraphList
                            markRanges={markRanges}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default SubjectWiseReportGraphicallyInnerLayout;
