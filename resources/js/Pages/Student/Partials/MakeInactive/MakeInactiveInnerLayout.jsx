import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import MakeInactiveFrom from './MakeInactiveFrom';

const MakeInactiveInnerLayout = ({
    classrooms,
    students,
    classroomId,
    student,
    feeInstallments = []
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MakeInactiveFrom
                        classrooms={classrooms}
                        students={students}
                        classroomId={classroomId}
                        student={student}
                        feeInstallments={feeInstallments}
                    />
                </div>
            </div>
        </div>
    );
};

export default MakeInactiveInnerLayout;
