import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import StudentLadgerReportFrom from './StudentLadgerReportFrom';

const StudentLadgerReportInnerLayout = ({
    students = [],
    student,
    classrooms = [],
    fees = [],
    student_status_array = []
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
                    <StudentLadgerReportFrom
                        students={students}
                        student={student}
                        classrooms={classrooms}
                        fees={fees}
                        student_status_array={student_status_array}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentLadgerReportInnerLayout;
