import React from 'react';
import FeeMain from './FeeMain';
import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';

const FeeMainInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeMain/>
                </div>
            </div>
        </div>
    );
};

export default FeeMainInnerLayout;