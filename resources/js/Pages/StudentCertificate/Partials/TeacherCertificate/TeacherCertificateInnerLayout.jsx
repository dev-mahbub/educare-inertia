import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import TeacherCertificateTable from './TeacherCertificateTable';

const TeacherCertificateInnerLayout = ({
    teacherNames,
    certificates,
    idCardCertificates
}) => {
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
                        <TeacherCertificateTable
                            teacherNames={teacherNames}
                            certificates={certificates}
                            idCardCertificates={idCardCertificates}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherCertificateInnerLayout;
