
import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import YearlyHeadWiseDuesFilter from './YearlyHeadWiseDuesFilter';
import YearlyHeadWiseDuesTable from './YearlyHeadWiseDuesTable';
import YearlyHeadWiseDuesTopbar from './YearlyHeadWiseDuesTopbar';

const YearlyHeadWiseDuesInnerLayout = ({
    fees = [],
    headWiseDueSummary = [],
    installmentWiseAmounts = [],
}) => {
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [dueSummaryData, setDueSummaryData] = useState([]);
    const [installmentWiseAmountData, setInstallmentWiseAmountData] = useState([]);
    const [params, setParams] = useState({});

    useEffect(() => {
        setDueSummaryData(headWiseDueSummary)
        setLoading(false);
        setTotalCount(Object.keys(headWiseDueSummary)?.length);
    }, [headWiseDueSummary]);

    useEffect(() => {
        setInstallmentWiseAmountData(installmentWiseAmounts);
    }, [installmentWiseAmounts]);


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <YearlyHeadWiseDuesTopbar
                        params={params}
                    />
                    <YearlyHeadWiseDuesFilter
                        fees={fees}
                        setLoading={setLoading}
                        setTotalCount={setTotalCount}
                        totalCount={totalCount}
                        setInstallmentWiseAmountData={setInstallmentWiseAmountData}
                        setDueSummaryData={setDueSummaryData}
                        setParams={setParams}
                    />
                    <YearlyHeadWiseDuesTable
                        loading={loading}
                        dueSummaryData={dueSummaryData}
                        installmentWiseAmounts={installmentWiseAmountData}
                    />
                </div>
            </div>
        </div>
    );
};

export default YearlyHeadWiseDuesInnerLayout;
