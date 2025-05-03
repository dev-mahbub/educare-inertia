import React from 'react';
import ClassNameHeaderMenus from '@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus';
import AssignRollList from './AssignRollList';

const ClassOrderInnerLayout = ({ classroom, studentsSortData, students, rolls}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ClassNameHeaderMenus title="Assign Roll" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignRollList
                        classroom={classroom}
                        studentsSortData={studentsSortData}
                        students={students}
                        rolls={rolls}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassOrderInnerLayout;
