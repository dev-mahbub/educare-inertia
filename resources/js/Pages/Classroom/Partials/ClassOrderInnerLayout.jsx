import React from 'react';
import ClassNameHeaderMenus from '@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus';
import ClassOrderList from './ClassOrderList';

const ClassOrderInnerLayout = ({ classrooms }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ClassNameHeaderMenus title="Classes" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClassOrderList classrooms={classrooms} />
                </div>
            </div>
        </div>
    );
};

export default ClassOrderInnerLayout;
