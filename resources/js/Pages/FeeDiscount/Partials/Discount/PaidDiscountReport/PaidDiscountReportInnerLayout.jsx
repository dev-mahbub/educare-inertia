import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import PaidDiscountReportFilter from './PaidDiscountReportFilter';
import PaidDiscountReportList from './PaidDiscountReportList';

const PaidDiscountReportInnerLayout = ({
    fees = [],
    discounts = [],
    discountPaidReport = []
}) => {
    const [paidDiscountReportData, setPaidDiscountReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPaidDiscountReportData(discountPaidReport);
        setLoading(false);
    }, [discountPaidReport])


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <PaidDiscountReportFilter
                        fees={fees}
                        discounts={discounts}
                        setLoading={setLoading}
                        discountPaidReport={discountPaidReport}
                        paidDiscountReportData={paidDiscountReportData}
                        setPaidDiscountReportData={setPaidDiscountReportData}
                    />
                    <PaidDiscountReportList
                        paidDiscountReportData={paidDiscountReportData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaidDiscountReportInnerLayout;
