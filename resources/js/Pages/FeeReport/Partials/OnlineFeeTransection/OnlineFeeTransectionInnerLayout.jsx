import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import React from 'react';
import OnlineFeeTransectionFilter from './OnlineFeeTransectionFilter';
import OnlineFeeTransectionList from './OnlineFeeTransectionList';
import OnlineFeeTransectionSummaryList from './OnlineFeeTransectionSummaryList';

const OnlineFeeTransectionInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <OnlineFeeTransectionFilter />
                    <OnlineFeeTransectionSummaryList />
                    <OnlineFeeTransectionList />
                </div>
            </div>
        </div>
    );
};

export default OnlineFeeTransectionInnerLayout;