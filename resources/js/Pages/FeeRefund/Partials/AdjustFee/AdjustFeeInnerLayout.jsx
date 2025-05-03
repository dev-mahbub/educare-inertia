import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import AdjustFeeFrom from './AdjustFeeFrom';

const AdjustFeeInnerLayout = ({
    students = [],
    classrooms = [],
    studentFeeInstallments = [],
    student
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
                    <AdjustFeeFrom
                        students={students}
                        student={student}
                        classrooms={classrooms}
                        studentFeeInstallments={studentFeeInstallments}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdjustFeeInnerLayout;
