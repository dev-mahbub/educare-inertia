import React from 'react';
import CreateImport from './CreateImport';
import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';

const ImportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateImport />
                </div>
            </div>
        </div>
    );
};

export default ImportInnerLayout;