import React from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import AdmissionProcessList from './AdmissionProcessList';

const AdmissionProcessInnerLayout = ({
    academicYears,
    admissionDataDetails,
    admissionClassroomDetails,
    academicYearId,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AdmissionProcessList
                        academicYears={academicYears}
                        admissionDataDetails={admissionDataDetails}
                        admissionClassroomDetails={admissionClassroomDetails}
                        academicYearId={academicYearId}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdmissionProcessInnerLayout;
