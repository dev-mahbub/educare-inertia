import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import React, { useState } from 'react';
import CertificateListTable from './CertificateListTable';
import CertificateListTopbar from './CertificateListTopbar';

const CertificateListInnerLayout = ({studentCertificate}) => {

    const [loading, setLoading] = useState(false);

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
                        <CertificateListTopbar
                            certificateLength={studentCertificate?.length}
                            setLoading={setLoading}
                        />
                        <CertificateListTable
                            studentCertificate={studentCertificate}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CertificateListInnerLayout;
