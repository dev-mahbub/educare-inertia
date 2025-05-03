import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import RegistrationList from './RegistrationList';
import RegistrationListFilter from './RegistrationListFilter';

const RegistrationListInnerLayout = ({
    registrations,
    registrationStatusArray = [],
    statusArray,
    regModeArray,
    academicYears,
    classNames,
    ewsStatusArray,
    admissionExamStatusArray,
    physicalConditionArray,
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
                    <RegistrationListFilter
                        statusArray={statusArray}
                        registrations={registrations}
                        regModeArray={regModeArray}
                        academicYears={academicYears}
                        classNames={classNames}
                        ewsStatusArray={ewsStatusArray}
                        admissionExamStatusArray={admissionExamStatusArray}
                        physicalConditionArray={physicalConditionArray}
                        academicYearId={academicYearId}
                    />

                    <RegistrationList
                        registrations = {registrations}
                        registrationStatusArray = {registrationStatusArray}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationListInnerLayout;
