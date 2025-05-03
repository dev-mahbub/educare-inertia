import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useState } from 'react';
import StudentPromotedReportFilter from './StudentPromotedReportFilter';
import StudentPromotedReportFilterTopbar from './StudentPromotedReportFilterTopbar';
import StudentPromotedReportTable from './StudentPromotedReportTable';

const StudentPromotedReportInnerLayout = ({ students, classrooms }) => {
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
                        <StudentPromotedReportFilterTopbar
                            studentCount={students?.length}
                            params={params}
                        />
                        <StudentPromotedReportFilter
                            studentCount={students?.length}
                            setLoading={setLoading}
                            classrooms={classrooms}
                            setParams={setParams}
                        />
                        <StudentPromotedReportTable
                            students={students}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentPromotedReportInnerLayout;
