import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import React from 'react';
import GeneratedCertificateTable from './GeneratedCertificateTable';

const GeneratedCertificateInnerLayout = ({ classroomStudents, certificateStudents }) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentHeaderMenus title="STUDENTS" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <GeneratedCertificateTable
                            classroomStudents={classroomStudents}
                            certificateStudents={certificateStudents}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeneratedCertificateInnerLayout;
