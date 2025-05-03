import React from 'react';
import VendorsTables from './VendorsTables';
import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';

const VendorsInnerLayout = ({
    libraryVendor,
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
                        <VendorsTables
                            libraryVendor={libraryVendor}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default VendorsInnerLayout;
