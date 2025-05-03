import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React, { useState } from 'react';
import StudentWiseBookReportFilter from './StudentWiseBookReportFilter';
import StudentWiseBookReportTable from './StudentWiseBookReportTable';

const StudentWiseBookReportInnerLayout = ({
    studentIssusBooks,
    classrooms,
    students,
}) => {
    const [loading, setLoading] = useState(false);
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
                        <StudentWiseBookReportFilter
                            studentIssusBookCount={studentIssusBooks?.length}
                            setLoading={setLoading}
                            classrooms={classrooms}
                            students={students}
                        />
                        <StudentWiseBookReportTable
                            studentIssusBooks={studentIssusBooks}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentWiseBookReportInnerLayout;
