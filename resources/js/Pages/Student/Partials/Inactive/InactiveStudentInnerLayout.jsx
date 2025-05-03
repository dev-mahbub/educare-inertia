import React from 'react';
import StudentListFilter from './InactiveStudentFilter';
import StudentList from './InactiveStudentList';
import { useState } from 'react';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';

const InactiveStudentInnerLayout = ({
    students,
    classrooms,
 }) => {

    const [loading, setLoading] = useState(false);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentListFilter
                        studentLength={students?.length}
                        setLoading={setLoading}
                        classrooms={classrooms}
                    />
                    <StudentList
                        students={students}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default InactiveStudentInnerLayout;
