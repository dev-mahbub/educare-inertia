import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useState } from 'react';
import StudentAgeReportFilter from './StudentAgeReportFilter';
import StudentAgeReportTable from './StudentAgeReportTable';
import StudentAgeReportTopbar from './StudentAgeReportTopbar';

const StudentAgeReportInnerLayout = ({ studentData }) => {
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentHeaderMenus title="STUDENTS" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <StudentAgeReportTopbar
                            params={params}
                        />
                        <StudentAgeReportFilter
                            studentCount={studentData?.length}
                            setLoading={setLoading}
                            setParams={setParams}
                        />
                        <StudentAgeReportTable
                            studentData={studentData}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentAgeReportInnerLayout;
