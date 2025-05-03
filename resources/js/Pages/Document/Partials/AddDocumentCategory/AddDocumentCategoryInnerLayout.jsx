import DocumentHeaderMenus from '@/Components/Partials/Menus/Document/DocumentHeaderMenus';
import React from 'react';
import AddDocumentCategoryForm from './AddDocumentCategoryForm';
import AddDocumentCategoriesFilter from './AddDocumentCategoriesFilter';
import AddDocumentCategoriesTableList from './AddDocumentCategoriesTableList';

const AddDocumentCategoryInnerLayout = () => {
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
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                                    <AddDocumentCategoryForm />
                                </div>
                                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                                    <AddDocumentCategoriesFilter />
                                    <AddDocumentCategoriesTableList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddDocumentCategoryInnerLayout;