import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import StudentHeadWiseFeeReportFilter from './StudentHeadWiseFeeReportFilter';
import StudentHeadWiseFeeReportList from './StudentHeadWiseFeeReportList';
import StudentHeadWiseFeeReportTopbar from './StudentHeadWiseFeeReportTopbar';

const StudentHeadWiseFeeReportInnerLayout = ({
    fees = [],
    classrooms = [],
    student_status_array = [],
    studentHeadWiseReports = []
}) => {
    const [studentHeadWiseReportsData, setStudentHeadWiseReportsData] = useState([]);
    const[totalReportCount, setTotalReportCount] = useState(0);
    const[loading, setLoading] = useState(true);
    const [params, setParams] = useState({});

    useEffect(() => {
        setStudentHeadWiseReportsData(studentHeadWiseReports);
        setLoading(false);
    }, [studentHeadWiseReports]);

    useEffect(() => {
        if (studentHeadWiseReportsData?.reports != null) {
            setTotalReportCount(Object.keys(studentHeadWiseReportsData?.reports)?.length);
        }
        else {
            setTotalReportCount(0);
        }
    }, [studentHeadWiseReportsData]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus
                            title="Fee Management"
                        />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentHeadWiseFeeReportTopbar
                        totalReportCount={totalReportCount}
                        params={params}
                    />
                    <StudentHeadWiseFeeReportFilter
                        fees={fees}
                        classrooms={classrooms}
                        student_status_array={student_status_array}
                        totalReportCount={totalReportCount}
                        setLoading={setLoading}
                        setParams={setParams}
                    />
                    <StudentHeadWiseFeeReportList
                        studentHeadWiseReports={studentHeadWiseReportsData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentHeadWiseFeeReportInnerLayout;
