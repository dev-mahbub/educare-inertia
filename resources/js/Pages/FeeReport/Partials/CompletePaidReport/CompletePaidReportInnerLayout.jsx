import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import CompletePaidReportFilter from './CompletePaidReportFilter';
import CompletePaidReportList from './CompletePaidReportList';

const CompletePaidReportInnerLayout = ({
    fees = [],
    classrooms = [],
    completePaidReport = []
}) => {

    const [completePaidReportData, setCompletePaidReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    const [totalReportCount, setTotalReportCount] = useState(0);

    useEffect(() => {
        setCompletePaidReportData(completePaidReport);
        setLoading(false);
    }, [completePaidReport])

    useEffect(() => {
        setTotalReportCount(Object.keys(completePaidReportData)?.length);
        setTotalPaidAmount(Object.values(completePaidReportData)?.reduce((total, item) => total + item?.total_paid, 0));
    }, [completePaidReportData])

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CompletePaidReportFilter
                        setCompletePaidReportData={setCompletePaidReportData}
                        setLoading={setLoading}
                        fees={fees}
                        classrooms={classrooms}
                        totalPaidAmount={totalPaidAmount}
                        totalReportCount={totalReportCount}
                    />
                    <CompletePaidReportList
                        completePaidReport={completePaidReportData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompletePaidReportInnerLayout;
