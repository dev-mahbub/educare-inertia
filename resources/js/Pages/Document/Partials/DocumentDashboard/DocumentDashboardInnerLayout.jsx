import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import DocumentDashboardSchoolDriverTeacherTable from './DocumentDashboardSchoolDriverTeacherTable';
import DocumentDashboardStudentTable from './DocumentDashboardStudentTable';

const DocumentDashboardInnerLayout = ({
    teacherDocumentSummary,
    studentDocumentSummary,
    studentDocumentCategories,
    driverDocumentSummary,
    schoolDocumentSummary
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
                        <DocumentDashboardSchoolDriverTeacherTable
                            teacherDocumentSummary={teacherDocumentSummary}
                            driverDocumentSummary={driverDocumentSummary}
                            schoolDocumentSummary={schoolDocumentSummary}
                        />
                        <DocumentDashboardStudentTable
                            studentDocumentSummary={studentDocumentSummary}
                            studentDocumentCategories={studentDocumentCategories}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocumentDashboardInnerLayout;
