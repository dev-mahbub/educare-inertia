import DocumentHeaderMenus from "@/Components/Partials/Menus/Document/DocumentHeaderMenus";
import StudentClassWiseReportTables from "./StudentClassWiseReportTables";

const StudentClassWiseReportInnerLayout = ({
    classrooms,
    studentDocumentCategories,
    studentDocumentReports
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <DocumentHeaderMenus title="DOCUMENT MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <StudentClassWiseReportTables
                            classrooms={classrooms}
                            studentDocumentCategories={studentDocumentCategories}
                            studentDocumentReports={studentDocumentReports}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentClassWiseReportInnerLayout;
