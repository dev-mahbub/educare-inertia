import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import EditEnquiryForm from './EditEnquiryForm';

const EditEnquiryInnerLayout = ({
    enqueryData,
    enqueryGuardianData,
    admissionSources,
    users,
    states,
    ScholarBoardingType,
    academicYears,
    classes,
    totalEnquiryCount,
    genderType
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
                    <EditEnquiryForm
                        enqueryData={enqueryData}
                        enqueryGuardianData={enqueryGuardianData}
                        admissionSources={admissionSources}
                        users={users}
                        states={states}
                        ScholarBoardingType={ScholarBoardingType}
                        academicYears={academicYears}
                        classes={classes}
                        totalEnquiryCount={totalEnquiryCount}
                        genderType={genderType}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditEnquiryInnerLayout;
