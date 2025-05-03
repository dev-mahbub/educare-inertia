import React from 'react';
import UpdateStudentMenu from '../UpdateStudentMenu';
import ImportForm from './ImportForm';

const StudentImportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <UpdateStudentMenu title="Import Data" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ImportForm />
                </div>
            </div>
        </div>
    );
};

export default StudentImportInnerLayout;