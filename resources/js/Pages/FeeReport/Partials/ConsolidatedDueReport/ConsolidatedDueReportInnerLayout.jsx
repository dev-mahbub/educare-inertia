import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import ConsolidatedDueReportFilter from './ConsolidatedDueReportFilter';
import ConsolidatedDueReportList from './ConsolidatedDueReportList';

const ConsolidatedDueReportInnerLayout = ({
    fees = [],
    feeCategories = [],
    student_status_array = [],
    consolidatedDueReports = [],
}) => {
    const [loading, setLoading] = useState(false);
    const [consolidatedDueReportsData, setConsolidatedDueReportsData] = useState([]);
    const [classroomReports, setClassroomReports] = useState({});
    const [params, setParams] = useState({});

    useEffect(() => {
        setConsolidatedDueReportsData(consolidatedDueReports);
        setLoading(false);
    },[consolidatedDueReports]);


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ConsolidatedDueReportFilter
                        fees={fees}
                        feeCategories={feeCategories}
                        student_status_array={student_status_array}
                        setLoading={setLoading}
                        setConsolidatedDueReportsData={setConsolidatedDueReportsData}
                        consolidatedDueReportsData={consolidatedDueReportsData}
                        setClassroomReports={setClassroomReports}
                        params={params}
                        setParams={setParams}
                        />
                    <ConsolidatedDueReportList
                        consolidatedDueReports={consolidatedDueReportsData}
                        loading={loading}
                        classroomReports={classroomReports}
                        setClassroomReports={setClassroomReports}
                        params={params}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsolidatedDueReportInnerLayout;
