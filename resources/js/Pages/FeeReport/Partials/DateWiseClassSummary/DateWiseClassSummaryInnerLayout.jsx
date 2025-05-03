import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import DateWiseClassSummaryFilter from './DateWiseClassSummaryFilter';
import DateWiseClassSummaryList from './DateWiseClassSummaryList';

const DateWiseClassSummaryInnerLayout = ({
    fees = [],
    feeCollectionSummary = []
}) => {
    const [feeCollectionSummaryData, setFeeCollectionSummaryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    useEffect(() => {
        setFeeCollectionSummaryData(feeCollectionSummary);
        setLoading(false);
    }, [feeCollectionSummary])

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DateWiseClassSummaryFilter
                        fees={fees}
                        setLoading={setLoading}
                        setFeeCollectionSummaryData={setFeeCollectionSummaryData}
                        setParams={setParams}
                    />
                    <DateWiseClassSummaryList
                        loading={loading}
                        feeCollectionSummary={feeCollectionSummaryData}
                        params={params}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateWiseClassSummaryInnerLayout;
