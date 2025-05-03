import React from 'react';
import CertificateMenus from '@/Components/Partials/Menus/Certificate/CertificateMenus';
import CertCategory from './CertCategory';
import { Link } from '@inertiajs/react';

const CertificateMainInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <CertificateMenus title="Manage Certificates" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CertCategory siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default CertificateMainInnerLayout;