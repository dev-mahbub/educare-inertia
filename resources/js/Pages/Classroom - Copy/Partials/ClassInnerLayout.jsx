import React from 'react';
import ClassNameHeaderMenus from '@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus';
import ClassList from './ClassList';
import ClassFilter from './ClassFilter';

const ClassInnerLayout = ({
    classrooms,
    students,
    students2,
    classTitles,
    subjectTitles,
    classId,
    subjectId,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ClassNameHeaderMenus title="Classes" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">

                    <ClassFilter
                        classTitles={classTitles}
                        subjectTitles={subjectTitles}
                        classId={classId}
                        subjectId={subjectId}
                    />
                    <ClassList
                        classrooms={classrooms}
                        students={students}
                        students2={students2}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassInnerLayout;
