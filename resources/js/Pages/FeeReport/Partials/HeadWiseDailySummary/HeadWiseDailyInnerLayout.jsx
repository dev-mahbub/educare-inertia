import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import HeadWiseDailySummaryList from './HeadWiseDailySummaryList';
import HeadWiseFilter from './HeadWiseFilter';
import HeadWiseTopBar from './HeadWiseTopBar';

const HeadWiseDailyInnerLayout = ({
    paymentModes = [],
    dailyFeePaymentSummary = [],
    payment_fee_types = [],
    payment_mode_types = []
}) => {
    const [loading, setLoading] = useState(false);
    const [summaryData, setSummaryData] = useState([]);
    const [paymentFeeTypeData, setPaymentFeeTypeData] = useState([]);
    const [paymentModeTypeData, setPaymentModeTypeData] = useState([]);
    const [filterMode, setFilterMode] = useState("head_wise");
    const [totalSummaryCount, setTotalSummaryCount] = useState(0);
    const [params, setParams] = useState({});

    useEffect(() => {
        setSummaryData(dailyFeePaymentSummary);
        setTotalSummaryCount(Object.keys(dailyFeePaymentSummary)?.length)
        setLoading(false);
    }, [dailyFeePaymentSummary])

    useEffect(() => {
        setPaymentFeeTypeData(payment_fee_types);
    }, [payment_fee_types])

    useEffect(() => {
        setPaymentModeTypeData(payment_mode_types);
    }, [payment_mode_types])


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <HeadWiseTopBar
                        setFilterMode={setFilterMode}
                        filterMode={filterMode}
                        params={params}
                    />
                    <HeadWiseFilter
                        paymentModes={paymentModes}
                        setLoading={setLoading}
                        setSummaryData={setSummaryData}
                        filterMode={filterMode}
                        setFilterMode={setFilterMode}
                        setPaymentFeeTypeData={setPaymentFeeTypeData}
                        setPaymentModeTypeData={setPaymentModeTypeData}
                        setTotalSummaryCount={setTotalSummaryCount}
                        totalSummaryCount={totalSummaryCount}
                        setParams={setParams}
                    />
                    <HeadWiseDailySummaryList
                        summaryData={summaryData}
                        loading={loading}
                        filterMode={filterMode}
                        payment_fee_types={paymentFeeTypeData}
                        payment_mode_types={paymentModeTypeData}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeadWiseDailyInnerLayout;
