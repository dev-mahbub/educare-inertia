import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import UploadDocumentsMain from './UploadDocumentsMain';

const UploadDocumentsInnerlayout = ({
    userTypes,
    teachers,
    classrooms,
    students,
    statusArray,
    // studentDocumentCategories,
    // teacherDocumentCategories,
    documentCategories,
    drivers
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
                        <UploadDocumentsMain
                            userTypes={userTypes}
                            teachers={teachers}
                            classrooms={classrooms}
                            students={students}
                            statusArray={statusArray}
                            // studentDocumentCategories={studentDocumentCategories}
                            // teacherDocumentCategories={teacherDocumentCategories}
                            documentCategories={documentCategories}
                            drivers={drivers}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadDocumentsInnerlayout;
