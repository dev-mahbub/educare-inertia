import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import React from 'react';
import DailyOnlineFeePaymentFilterTopbar from './DailyOnlineFeePaymentFilterTopbar';
import DailyOnlineFeePaymentFilter from './DailyOnlineFeePaymentFilter';
import DailyOnlineFeePaymentTable from './DailyOnlineFeePaymentTable';


const DailyOnlineFeePaymentInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                   <DailyOnlineFeePaymentFilterTopbar/>
                   <DailyOnlineFeePaymentFilter/>
                   <DailyOnlineFeePaymentTable/>
                </div>
            </div>
        </div>
    );
};

export default DailyOnlineFeePaymentInnerLayout;