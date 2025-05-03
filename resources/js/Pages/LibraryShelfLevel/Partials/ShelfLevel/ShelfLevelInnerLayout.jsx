import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React from 'react';
import ShelfLevelTables from './ShelfLevelTables';

const ShelfLevelInnerLayout = ({ librarySelfLevels }) => {
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
                        <ShelfLevelTables
                            librarySelfLevels={librarySelfLevels}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShelfLevelInnerLayout;
