import React from 'react';
import WebMessageHeaderMenus from '@/Components/Partials/Menus/MainWebMessage/WebMessageHeaderMenus';
import ComposeList from './ComposeList';

const ComposeListInnerLayout = ({audienceTypes, classrooms, students, teachers, admins, classTeacher, subjectTeachers}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <WebMessageHeaderMenus />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ComposeList audienceTypes={audienceTypes} classrooms={classrooms} students={students} teachers={teachers} admins={admins} classTeacher={classTeacher} subjectTeachers={subjectTeachers}/>
                </div>
            </div>
        </div>
    );
};

export default ComposeListInnerLayout;