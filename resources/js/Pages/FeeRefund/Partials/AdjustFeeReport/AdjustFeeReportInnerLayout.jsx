import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useState } from 'react';
import AdjustFeeReportFilter from './AdjustFeeReportFilter';
import AdjustFeeReportList from './AdjustFeeReportList';

const AdjustFeeReportInnerLayout = ({ adjustFeePayments = [] }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [filterText, setFilterText] = useState("");

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AdjustFeeReportFilter totalCount={totalCount} setFilterText={setFilterText}/>
                    <AdjustFeeReportList adjustFeePayments={adjustFeePayments} setTotalCount={setTotalCount} filterText={filterText} />
                </div>
            </div>
        </div>
    );
};

export default AdjustFeeReportInnerLayout;
