import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React, { useEffect, useState } from 'react';
import StudentBookWiseReportTableList from './StudentBookWiseReportTableList';
import StudentBookWiseReportFilter from './StudentBookWiseReportFilter';

const StudentBookWiseReportInnerLayout = ({
    studentBooks,
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [studentBooks])
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
                        <StudentBookWiseReportFilter
                            setLoading={setLoading}
                        />
                        <StudentBookWiseReportTableList
                            studentBooks={studentBooks}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentBookWiseReportInnerLayout;
