import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import EditStudentTypeForm from './EditStudentTypeForm';

const EditStudentTypeInnerLayout = ({scholarBoardingType,studentsType,studentsTypeId}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditStudentTypeForm
                    scholarBoardingType = {scholarBoardingType}
                    studentsType = {studentsType}
                    studentsTypeId = {studentsTypeId}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditStudentTypeInnerLayout;
