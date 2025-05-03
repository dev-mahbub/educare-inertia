import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import MonthWiseReport from './MonthWiseReport';

const RegistrationMonthlyCollectionInnerLayout = ({
    academicYears,
    monthWiseRegistrationReport
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
                <MonthWiseReport
                    academicYears = {academicYears}
                    monthWiseRegistrationReport={monthWiseRegistrationReport}
                />
                </div>
            </div>
        </div>
    );
};

export default RegistrationMonthlyCollectionInnerLayout;
