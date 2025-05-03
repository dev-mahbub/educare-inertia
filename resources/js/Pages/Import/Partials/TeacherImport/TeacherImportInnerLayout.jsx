import React from 'react';
import UpdateStudentMenu from '../UpdateStudentMenu';
import TeacherImportForm from './TeacherImportForm';

const TeacherImportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <UpdateStudentMenu title="Import Data" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherImportForm />
                </div>
            </div>
        </div>
    );
};

export default TeacherImportInnerLayout;