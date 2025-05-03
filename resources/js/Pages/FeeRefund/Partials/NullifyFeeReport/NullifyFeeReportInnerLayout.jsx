import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useState } from 'react';
import NullifyFeeReportFilter from './NullifyFeeReportFilter';
import NullifyFeeReportList from './NullifyFeeReportList';

const NullifyFeeReportInnerLayout = ({ nullifyFeeReports = [] }) => {

    const [filterText, setFilterText] = useState("");
    const [totalReportCount, setTotalReportCount] = useState(0);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <NullifyFeeReportFilter setFilterText={setFilterText} totalReportCount={totalReportCount} />
                    <NullifyFeeReportList nullifyFeeReports={nullifyFeeReports} setTotalReportCount={setTotalReportCount} filterText={filterText}/>
                </div>
            </div>
        </div>
    );
};

export default NullifyFeeReportInnerLayout;
