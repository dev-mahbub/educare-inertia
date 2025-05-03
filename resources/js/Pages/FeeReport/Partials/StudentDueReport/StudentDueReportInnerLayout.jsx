import StudentDueReportFilter from './StudentDueReportFilter';
import TeacherFeeHeaderMenus from '../../../../Components/Partials/Menus/TeacherFee/TeacherFeeHeaderMenus';
const StudentDueReportInnerLayout = ({
    classNames = [],
    classrooms = [],
    fees = [],
    feeCategories = [],
    feeStructures = [],
    student_status_array = [],
    studentDueReports = [],
    classroom = [],
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TeacherFeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentDueReportFilter
                        classNames={classNames}
                        classrooms={classrooms}
                        fees={fees}
                        feeCategories={feeCategories}
                        feeStructures={feeStructures}
                        student_status_array={student_status_array}
                        studentDueReports={studentDueReports}
                        classroom={classroom}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentDueReportInnerLayout;
