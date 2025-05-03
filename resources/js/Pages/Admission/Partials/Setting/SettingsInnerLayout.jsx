import React from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import SettingsForm from './SettingsForm';

const SettingsInnerLayout = ({ siteSettingsRegistration = {}, siteSettingsAccount = {}, siteSettingsPayment = {}, siteSettingsAdmission = {} }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SettingsForm
                        siteSettingsRegistration={siteSettingsRegistration}
                        siteSettingsAccount={siteSettingsAccount}
                        siteSettingsPayment={siteSettingsPayment}
                        siteSettingsAdmission={siteSettingsAdmission}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsInnerLayout;