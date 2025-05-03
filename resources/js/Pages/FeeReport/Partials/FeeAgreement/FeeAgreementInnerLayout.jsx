import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeeAgreementFrom from './FeeAgreementFrom';

const FeeAgreementInnerLayout = ({
    classrooms = [],
    students = [],
    student,
    student_status_array = [],
    guardian_array = []
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeAgreementFrom
                        classrooms={classrooms}
                        students={students}
                        student={student}
                        student_status_array={student_status_array}
                        guardian_array={guardian_array}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeAgreementInnerLayout;
