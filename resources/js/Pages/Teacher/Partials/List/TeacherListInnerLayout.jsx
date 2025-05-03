import React from 'react';
import TeacherHeaderMenus from '@/Components/Partials/Menus/Teacher/TeacherHeaderMenus';
import TeacherListFilter from './TeacherListFilter';
import TeacherList from './TeacherList';

const TeacherListInnerLayout = ({teachers}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TeacherHeaderMenus title="Teachers" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherListFilter teachers={teachers} />
                    <TeacherList teachers={teachers} />
                </div>
            </div>
        </div>
    );
};

export default TeacherListInnerLayout;
