import React from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import EditAdmissionSourceForm from './EditAdmissionSourceForm';

const EditAdmissionSourceInnerLayout = ({enquirySource, enquerySourceId }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditAdmissionSourceForm 
                      enquirySource = {enquirySource}
                      enquerySourceId  = {enquerySourceId}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAdmissionSourceInnerLayout;
