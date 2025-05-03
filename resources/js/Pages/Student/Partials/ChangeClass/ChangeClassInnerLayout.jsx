import React from 'react';
import UpdateUserPasswordList from './ChangeClassList';
import ChangeClassList from './ChangeClassList';
import ChangeClassFilter from './ChangeClassFilter';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';

const ChangeClassInnerLayout = ({
    changeStudents,
    classrooms,
    session_year,
    classroom_id,
    selectedStudent,
    searchValue,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Change in Class" />
                    </div>
                </div>

                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-card-title">
                        <ChangeClassList
                            changeStudents={changeStudents}
                            classrooms={classrooms}
                            session_year={session_year}
                            classroom_id={classroom_id}
                            selectedStudent={selectedStudent}
                            searchValue={searchValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeClassInnerLayout;
