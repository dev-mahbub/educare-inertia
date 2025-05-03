import React from 'react';
import StudentHeaderMenus from '../../../../Components/Partials/Menus/Student/StudentHeaderMenus';
import ChangeStatusList from './ChangeStatusList';

const ChangeStatusInnerLayout = ({ classrooms=[], students=[], classroom_id='' }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>

                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-card-title">
                        <ChangeStatusList
                            classrooms={classrooms}
                            students={students}
                            classroom_id={classroom_id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeStatusInnerLayout;
