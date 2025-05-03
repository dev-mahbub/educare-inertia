// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import GraphToppersReportFilter from "./GraphToppersReportFilter";
import GraphToppersReportList from "./GraphToppersReportList";

const GraphToppersReportInnerLayout = ({
    exams,
    classrooms,
    subjects,
    topperReport,
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
                    <GraphToppersReportFilter
                        exams={exams}
                        classrooms={classrooms}
                        subjects={subjects}
                    />
                    <GraphToppersReportList topperReport={topperReport} />
                </div>
            </div>
        </div>
    );
};

export default GraphToppersReportInnerLayout;
