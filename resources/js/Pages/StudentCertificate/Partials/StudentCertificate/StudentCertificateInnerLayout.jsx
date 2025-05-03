import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import StudentCertificateList from './StudentCertificateList';

const StudentCertificateInnerLayout = ({
    classrooms,
    studentNames,
    students,
    academicSession,
    feeTypes,
    feeTitles,
    classroomWthExam,
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
                        <StudentCertificateList
                            classrooms={classrooms}
                            studentNames={studentNames}
                            students={students}
                            academicSession={academicSession}
                            feeTypes={feeTypes}
                            feeTitles={feeTitles}
                            classroomWthExam={classroomWthExam}
                            certificates={certificates}
                            idCardCertificates={idCardCertificates}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentCertificateInnerLayout;
