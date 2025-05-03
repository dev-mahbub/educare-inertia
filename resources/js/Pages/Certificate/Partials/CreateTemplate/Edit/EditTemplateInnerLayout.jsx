import CertificateMenus from '@/Components/Partials/Menus/Certificate/CertificateMenus';
import CreateTemplateTableList from '../CreateTemplateTableList';
import EditCertificateForm from './EditCertificateForm';

const EditTemplateInnerLayout = ({
    certificateData,
    certTypes,
    viewNames,
    audiences,
    certificates,
    classrooms,
    studentNames,
    students,
    academicSession,
    feeTypes,
    feeTitles,
    teacherNames,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <CertificateMenus title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditCertificateForm
                        certificateData={certificateData}
                        certTypes={certTypes}
                        viewNames={viewNames}
                        audiences={audiences}
                    />
                    <CreateTemplateTableList
                        viewNames={viewNames}
                        certificates={certificates}
                        classrooms={classrooms}
                        studentNames={studentNames}
                        students={students}
                        academicSession={academicSession}
                        feeTypes={feeTypes}
                        feeTitles={feeTitles}
                        teacherNames={teacherNames}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditTemplateInnerLayout;
