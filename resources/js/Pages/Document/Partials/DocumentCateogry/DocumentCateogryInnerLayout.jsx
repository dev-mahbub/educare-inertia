import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import DocumentCategoryListForm from './DocumentCategoryListForm';

const DocumentCateogryInnerLayout = ({
    audienceTypes,
    documentCategories
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
                        <div className='educare-parent-montly-income-area'>
                            <DocumentCategoryListForm
                                audienceTypes={audienceTypes}
                                documentCategories={documentCategories}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocumentCateogryInnerLayout;
