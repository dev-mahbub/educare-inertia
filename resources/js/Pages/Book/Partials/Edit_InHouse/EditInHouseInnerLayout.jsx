import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React from 'react';
import Edit_InHouseForm from './Edit_InHouseForm';

const EditInHouseInnerLayout = ({
    bookTypes,
    libraryVendor,
    bookCategory,
    classNames,
    subjects
}) => {
    return (
        <>
             <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <Edit_InHouseForm
                            bookTypes={bookTypes}
                            libraryVendor={libraryVendor}
                            bookCategory={bookCategory}
                            classNames={classNames}
                            subjects={subjects}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditInHouseInnerLayout;
