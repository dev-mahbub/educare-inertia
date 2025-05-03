import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import SummaryForm from './SummaryForm';

const SummaryInnerLayout = ({
    classNames,
    classrooms,
    students,
    maleStudents,
    femaleStudents,
    otherStudents,
    newStudents,
    promotedStudents,
    classTotalStudent,
    classroomTotalStudent
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
                    <SummaryForm
                        classNames={classNames}
                        classrooms={classrooms}
                        students={students}
                        maleStudents={maleStudents}
                        femaleStudents={femaleStudents}
                        otherStudents={otherStudents}
                        newStudents={newStudents}
                        promotedStudents={promotedStudents}
                        classTotalStudent={classTotalStudent}
                        classroomTotalStudent={classroomTotalStudent}
                    />
                </div>
            </div>
        </div>
    );
};

export default SummaryInnerLayout;
