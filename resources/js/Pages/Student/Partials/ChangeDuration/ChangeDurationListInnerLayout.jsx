import React from 'react';
import ChangeDurationList from './ChangeDurationList';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';

const ChangeDurationListInnerLayout = ({
    students,
    classrooms,
    searchValue,
    classroom_id,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ChangeDurationList
                        students={students}
                        classrooms={classrooms}
                        searchValue={searchValue}
                        classroom_id={classroom_id}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChangeDurationListInnerLayout;
