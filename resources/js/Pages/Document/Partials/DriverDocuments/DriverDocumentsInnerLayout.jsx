import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import { concatName } from '@/Hooks/GlobalFunction';
import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import DriverDocumentsFilter from './DriverDocumentsFilter';
import DriverDocumentsTableList from './DriverDocumentsTableList';

const DriverDocumentsInnerLayout = ({
    driverDocuments,
    drivers,
    documentCategories
}) => {

    const {
        data,
        setData
    } = useForm({
        search: "",
        driver_id: "",
        document_category_id: ""
    });

    const filteredDocuments = useMemo(() => {
        return driverDocuments?.filter(item => {
            const inputText = data?.search?.trim()?.toLowerCase();
            const driverName = concatName(item?.driver?.first_name, item?.driver?.last_name)?.toLowerCase();
            const documentName = item?.document_name?.toLowerCase();
            const documentNo = item?.document_no?.toLowerCase();
            const documentCategory = item?.document_category?.title?.toLowerCase();
            const notes = item?.notes?.toLowerCase();
            const issuedBy = concatName(item?.issued_by?.first_name, item?.issued_by?.middle_name, item?.issued_by?.last_name)?.toLowerCase();
            const generatedFor = item?.generated_for?.toLowerCase();
            const issuedDate = item?.issued_date?.toLowerCase();
            const uploadedDate = item?.uploaded_date?.toLowerCase();

            return (
                (driverName && driverName?.includes(inputText)) ||
                (documentName && documentName?.includes(inputText)) ||
                (documentNo && documentNo?.includes(inputText)) ||
                (documentCategory && documentCategory?.includes(inputText)) ||
                (notes && notes?.includes(inputText)) ||
                (issuedBy && issuedBy?.includes(inputText)) ||
                (generatedFor && generatedFor?.includes(inputText)) ||
                (issuedDate && issuedDate?.includes(inputText)) ||
                (uploadedDate && uploadedDate?.includes(inputText))
            );
        });
    }, [driverDocuments, data.search]);

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
                        <DriverDocumentsFilter
                            drivers={drivers}
                            documentCategories={documentCategories}
                            data={data}
                            setData={setData}
                            totalDocumentCount={totalDocumentCount}
                        />
                        <DriverDocumentsTableList
                            driverDocuments={filteredDocuments}
                            totalDocumentCount={totalDocumentCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverDocumentsInnerLayout;
