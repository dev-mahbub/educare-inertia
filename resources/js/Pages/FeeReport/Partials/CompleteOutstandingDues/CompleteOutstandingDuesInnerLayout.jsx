import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import CompleteOutstandingDuesFilter from './CompleteOutstandingDuesFilter';
import CompleteOutstandingDuesList from './CompleteOutstandingDuesList';
import CompleteOutstandingDuesTopbar from './CompleteOutstandingDuesTopbar';

const CompleteOutstandingDuesInnerLayout = ({
    classrooms = [],
    fees = [],
    completeOutstandingDueReports = [],
    student_status_array = [],
    student_active_status_array = [],
    employmentCategoryTypes = []
}) => {
    const [completeOutstandingDueReportsData, setCompleteOutstandingDueReportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalDueAmount, setTotalDueAmount] = useState(0);
    const [filterFormData, setFilterFormData] = useState({});
    const [params, setParams] = useState({});

    useEffect(() => {
        setCompleteOutstandingDueReportsData(completeOutstandingDueReports);
        setLoading(false);
    }, [completeOutstandingDueReports]);

    useEffect(() => {
        setTotalCount(Object.keys(completeOutstandingDueReportsData)?.length);
        setTotalDueAmount(Object.values(completeOutstandingDueReportsData)?.reduce((total, item) => total + item?.total_due_amount, 0));
    }, [completeOutstandingDueReportsData]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CompleteOutstandingDuesTopbar
                        totalCount={totalCount}
                        params={[params]}
                    />
                    <CompleteOutstandingDuesFilter
                        classrooms={classrooms}
                        fees={fees}
                        setLoading={setLoading}
                        setCompleteOutstandingDueReportsData={setCompleteOutstandingDueReportsData}
                        student_status_array={student_status_array}
                        student_active_status_array={student_active_status_array}
                        totalDueAmount={totalDueAmount}
                        setFilterFormData={setFilterFormData}
                        employmentCategoryTypes={employmentCategoryTypes}
                        setParams={setParams}
                    />
                    <CompleteOutstandingDuesList
                        completeOutstandingDueReports={completeOutstandingDueReportsData}
                        loading={loading}
                        filterFormData={filterFormData}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompleteOutstandingDuesInnerLayout;
