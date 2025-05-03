import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import YearlyHeadWisePaidSummaryFilter from './YearlyHeadWisePaidSummaryFilter';
import YearlyHeadWisePaidSummaryFilterTopbar from './YearlyHeadWisePaidSummaryFilterTopbar';
import YearlyHeadWisePaidSummaryTable from './YearlyHeadWisePaidSummaryTable';

const YearlyHeadWisePaidSummaryInnerLayout = ({
    paymentModes,
    yearlyFeePaymentSummary,
    month_wise_amounts = [],
}) => {

    const [yearlyFeePaymentSummaryData, setYearlyFeePaymentSummaryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalSummaryCount, setTotalSummaryCount] = useState(0);
    const [monthWiseAmountData, setMonthWiseAmountData] = useState([]);
    const [params, setParams] = useState({});

    useEffect(() => {
        setYearlyFeePaymentSummaryData(yearlyFeePaymentSummary);
        setTotalSummaryCount(Object.keys(yearlyFeePaymentSummary)?.length);
        setLoading(false)
    },[yearlyFeePaymentSummary])

    useEffect(() => {
        setMonthWiseAmountData(month_wise_amounts);
    },[month_wise_amounts])

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <YearlyHeadWisePaidSummaryFilterTopbar
                        params={params}
                    />
                    <YearlyHeadWisePaidSummaryFilter
                        paymentModes={paymentModes}
                        setYearlyFeePaymentSummaryData={setYearlyFeePaymentSummaryData}
                        setLoading={setLoading}
                        totalSummaryCount={totalSummaryCount}
                        setTotalSummaryCount={setTotalSummaryCount}
                        setMonthWiseAmountData={setMonthWiseAmountData}
                        setParams={setParams}
                    />
                    <YearlyHeadWisePaidSummaryTable
                        yearlyFeePaymentSummary={yearlyFeePaymentSummaryData}
                        loading={loading}
                        month_wise_amounts={monthWiseAmountData}
                    />
                </div>
            </div>
        </div>
    );
};

export default YearlyHeadWisePaidSummaryInnerLayout;
