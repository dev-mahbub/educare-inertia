import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React, { useState } from 'react';
import StudentIssuedBookReportFilter from './StudentIssuedBookReportFilter';
import StudentIssuedBookReportTableList from './StudentIssuedBookReportTableList';

const StudentIssuedBookReportInnerLayout = ({
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
                        <StudentIssuedBookReportFilter
                            studentIssusBookCount={studentIssusBooks?.length}
                            setLoading={setLoading}
                            classrooms={classrooms}
                            students={students}
                        />
                        <StudentIssuedBookReportTableList
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

export default StudentIssuedBookReportInnerLayout;
