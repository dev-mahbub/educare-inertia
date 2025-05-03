import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import AddEnquiryForm from './AddEnquiryForm';

const AddEnquiryInnerLayout = ({
    users,
    admissionSources,
    states,
    ScholarBoardingType,
    academicYears,
    genderType,
    classes,
    totalEnquiryCount,
    academicYearId
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
                    <AddEnquiryForm
                        users={users}
                        states={states}
                        admissionSources={admissionSources}
                        ScholarBoardingType={ScholarBoardingType}
                        academicYears={academicYears}
                        genderType={genderType}
                        classes={classes}
                        totalEnquiryCount={totalEnquiryCount}
                        academicYearId={academicYearId}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddEnquiryInnerLayout;
