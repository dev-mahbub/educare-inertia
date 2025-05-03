import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import StudentTypeForm from './StudentTypeForm';

const StudentTypeInnerLayout = ({scholarBoardingType,studentType,}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentTypeForm
                        scholarBoardingType = {scholarBoardingType}
                        studentType = {studentType}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentTypeInnerLayout;
