import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import { concatName } from '@/Hooks/GlobalFunction';
import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import SchoolDocumentsFilter from './SchoolDocumentsFilter';
import SchoolDocumentsTable from './SchoolDocumentsTable';

const SchoolDocumentsInnerLayout = ({
    schoolDocuments,
    documentCategories
}) => {

    const {
        data,
        setData
    } = useForm({
        search: "",
        type: "",
        document_category_id: "",
    });

    const filteredDocuments = useMemo(() => {
        return schoolDocuments?.filter(item => {
            const inputText = data?.search?.trim()?.toLowerCase();
            const issuedDate = item?.issued_date?.toLowerCase();
            const generatedFor = item?.generated_for?.toLowerCase();
            const documentNo = item?.document_no?.toLowerCase();
            const notes = item?.notes?.toLowerCase();
            const documentName = item?.document_name?.toLowerCase();
            const issuedBy = concatName(item?.issued_by?.first_name, item?.issued_by?.middle_name, item?.issued_by?.last_name)?.toLowerCase();
            const createdBy = concatName(item?.created_by?.first_name, item?.created_by?.middle_name, item?.created_by?.last_name)?.toLowerCase();
            const audienceType = item?.audience_type?.toLowerCase();
            const uploadedDate = item?.uploaded_date?.toLowerCase();

            return (
                (issuedDate && issuedDate?.includes(inputText)) ||
                (generatedFor && generatedFor?.includes(inputText)) ||
                (documentNo && documentNo?.includes(inputText)) ||
                (notes && notes?.includes(inputText)) ||
                (documentName && documentName?.includes(inputText)) ||
                (issuedBy && issuedBy?.includes(inputText)) ||
                (createdBy && createdBy?.includes(inputText)) ||
                (audienceType && audienceType?.includes(inputText)) ||
                (uploadedDate && uploadedDate?.includes(inputText))
            );
        });
    }, [schoolDocuments, data.search]);

    const totalDocumentCount = filteredDocuments?.length;

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
                         <SchoolDocumentsFilter
                            totalDocumentCount={totalDocumentCount}
                            data={data}
                            setData={setData}
                            documentCategories={documentCategories}
                         />
                         <SchoolDocumentsTable
                            schoolDocuments={filteredDocuments}
                            totalDocumentCount={totalDocumentCount}
                         />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchoolDocumentsInnerLayout;
