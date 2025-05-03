// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import GraphWeakersReportFilter from "./GraphWeakersReportFilter";
import GraphWeakersReportList from "./GraphWeakersReportList";

const GraphWeakersReportInnerLayout = ({
    exams,
    classrooms,
    subjects,
    graphWeakerReport,
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
                    <GraphWeakersReportFilter
                        exams={exams}
                        classrooms={classrooms}
                        subjects={subjects}
                    />
                    <GraphWeakersReportList
                        graphWeakerReport={graphWeakerReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default GraphWeakersReportInnerLayout;
