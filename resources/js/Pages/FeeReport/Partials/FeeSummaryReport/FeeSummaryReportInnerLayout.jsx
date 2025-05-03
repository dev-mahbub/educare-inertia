
import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import FeeSummaryReportFilter from './FeeSummaryReportFilter';
import FeeSummaryReportTable from './FeeSummaryReportTable';
import FeeSummaryReportTop from './FeeSummaryReportTop';

const FeeSummaryReportInnerLayout = ({
    fees = [],
    classrooms = [],
    feeCategories = [],
    feeSummaryReport = []
}) => {
    const [feeSummaryReportData, setFeeSummaryReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    useEffect(() => {
        setFeeSummaryReportData(feeSummaryReport);
        setLoading(false);
    },[feeSummaryReport]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeSummaryReportTop
                        params={params}
                        feeSummaryReport={feeSummaryReportData}
                    />
                    <FeeSummaryReportFilter
                        fees={fees}
                        classrooms={classrooms}
                        feeCategories={feeCategories}
                        feeSummaryReport={feeSummaryReportData}
                        setLoading={setLoading}
                        setParams={setParams}
                    />
                    <FeeSummaryReportTable
                        feeSummaryReport={feeSummaryReportData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeSummaryReportInnerLayout;
