import React from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import AdmissionFilter from './AdmissionFilter.jsx';
import AdmissionList from './AdmissionList.jsx';

const AdmissionInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AdmissionFilter />
                    <AdmissionList />
                </div>
            </div>
        </div>
    );
};

export default AdmissionInnerLayout;