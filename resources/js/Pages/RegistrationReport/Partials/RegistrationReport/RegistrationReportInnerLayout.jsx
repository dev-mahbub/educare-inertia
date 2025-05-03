import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import RegistrationReportClassWise from './RegistrationReportClassWise';

const RegistrationReportInnerLayout = ({
    academicYears,
    months,
    classWiseReports,
    dayWiseReports
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
                <RegistrationReportClassWise
                    academicYears = {academicYears}
                    months = {months}
                    classWiseReports={classWiseReports}
                    dayWiseReports={dayWiseReports}
                 />
                </div>
            </div>
        </div>
    );
};

export default RegistrationReportInnerLayout;
