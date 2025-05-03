import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React, { useEffect, useState } from 'react';
import StudentBookTransactionReportFilter from './StudentBookTransactionReportFilter';
import StudentBookTransactionReportTableList from './StudentBookTransactionReportTableList';

const StudentBookTransactionReportInnerLayout = ({
    studentIssuesBooks,
    studentReturnBooks,
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [studentIssuesBooks, studentReturnBooks]);
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <StudentBookTransactionReportFilter
                            setLoading={setLoading}
                        />
                        <StudentBookTransactionReportTableList
                            studentIssuesBooks={studentIssuesBooks}
                            studentReturnBooks={studentReturnBooks}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentBookTransactionReportInnerLayout;
