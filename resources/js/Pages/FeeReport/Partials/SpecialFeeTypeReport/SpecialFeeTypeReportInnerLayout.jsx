import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import SpecialFeeTypeReportFilter from './SpecialFeeTypeReportFilter';
import SpecialFeeTypeReportTable from './SpecialFeeTypeReportTable';
import SpecialFeeTypeReportTopbar from './SpecialFeeTypeReportTopbar';

const SpecialFeeTypeReportInnerLayout = ({
    classrooms = [],
    fees = [],
    specialFeeTypes = [],
    specialFeeTypeReport = []
}) => {
    const [specialFeeTypeReportData, setSpecialFeeTypeReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    useEffect(() => {
        setSpecialFeeTypeReportData(specialFeeTypeReport);
        setLoading(false);
    }, [specialFeeTypeReport]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SpecialFeeTypeReportTopbar
                        params={params}
                        specialFeeTypeReport={specialFeeTypeReportData}
                    />
                    <SpecialFeeTypeReportFilter
                        classrooms={classrooms}
                        fees={fees}
                        specialFeeTypes={specialFeeTypes}
                        setLoading={setLoading}
                        specialFeeTypeReport={specialFeeTypeReportData}
                        setParams={setParams}
                    />
                    <SpecialFeeTypeReportTable
                        specialFeeTypeReport={specialFeeTypeReportData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default SpecialFeeTypeReportInnerLayout;
