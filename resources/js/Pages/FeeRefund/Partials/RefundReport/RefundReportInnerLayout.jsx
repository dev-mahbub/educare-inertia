import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useState } from 'react';
import RefundReportFilter from './RefundReportFilter';
import RefundReportList from './RefundReportList';

const RefundReportInnerLayout = ({
    feePaymentRefunds = []
}) => {
    const [filterText, setFilterText] = useState("");
    const [totalRefundCount, setTotalRefundCount] = useState(0);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <RefundReportFilter
                        setFilterText={setFilterText}
                        totalRefundCount={totalRefundCount}
                    />
                    <RefundReportList
                        feePaymentRefunds={feePaymentRefunds}
                        filterText={filterText}
                        setTotalRefundCount={setTotalRefundCount}
                    />
                </div>
            </div>
        </div>
    );
};

export default RefundReportInnerLayout;
