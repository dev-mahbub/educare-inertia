import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import { useMemo, useState } from 'react';
import TeacherDocumentsFilter from './TeacherDocumentsFilter';
import TeacherDocumentsTableList from './TeacherDocumentsTableList';

const TeacherDocumentsInnerLayout = ({
    teachers,
    teacherDocumentCategories,
    documents
}) => {

    // filter by search start
    const [filterText, setFilterText] = useState('');

    const filteredDocuments = useMemo(() => {
        return documents?.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const teacherName = `${item?.staff?.first_name ?? ''} ${item?.staff?.middle_name ?? ''} ${item?.staff?.last_name ?? ''}`.toLowerCase();
            const issuedBy = `${item?.issued_by?.first_name ?? ''} ${item?.issued_by?.middle_name ?? ''} ${item?.issued_by?.last_name ?? ''}`.toLowerCase();
            const documentName = item?.document_name?.toLowerCase();
            const documentNo = item?.document_no?.toLowerCase();
            const documentCategory = item?.document_category?.title?.toLowerCase();
            const notes = item?.notes?.toLowerCase();
            const generatedFor = item?.generated_for?.toLowerCase();
            const issuedDate = item?.issued_date?.toLowerCase();
            const uploadedDate = item?.uploaded_date?.toLowerCase();

            return (
                (teacherName && teacherName.includes(inputText)) ||
                (issuedBy && issuedBy.includes(inputText)) ||
                (documentName && documentName.includes(inputText)) ||
                (documentNo && documentNo.includes(inputText)) ||
                (documentCategory && documentCategory.includes(inputText)) ||
                (notes && notes.includes(inputText)) ||
                (generatedFor && generatedFor.includes(inputText)) ||
                (issuedDate && issuedDate.includes(inputText)) ||
                (uploadedDate && uploadedDate.includes(inputText))
            );
        });
    }, [filterText, documents]);
    // filter by search start
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
                        <TeacherDocumentsFilter
                            teachers={teachers}
                            teacherDocumentCategories={teacherDocumentCategories}
                            documents={filteredDocuments}
                            setFilterText={setFilterText}
                            filterText={filterText}
                        />
                        <TeacherDocumentsTableList
                            documents={filteredDocuments}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDocumentsInnerLayout;
