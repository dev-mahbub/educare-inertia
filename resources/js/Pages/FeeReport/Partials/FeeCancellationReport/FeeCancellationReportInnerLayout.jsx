import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import FeeCancellationReportFilter from './FeeCancellationReportFilter';
import FeeCancellationReportTable from './FeeCancellationReportTable';



const FeeCancellationReportInnerLayout = ({
    classrooms = [],
    students = [],
    cancellationReports = [],
    student
}) => {
    const [cancellationReportsData, setCancellationReportsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCancellationReportsData(cancellationReports);
        setLoading(false);
    }, [cancellationReports]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeCancellationReportFilter
                        classrooms={classrooms}
                        students={students}
                        setLoading={setLoading}
                        student={student}
                        cancellationReports={cancellationReportsData}
                    />
                    <FeeCancellationReportTable
                        cancellationReports={cancellationReportsData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeCancellationReportInnerLayout;
