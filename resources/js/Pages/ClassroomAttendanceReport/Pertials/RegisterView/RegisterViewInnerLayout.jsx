import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import RegisterViewDetail from './RegisterViewDetail';
import RegisterViewFilter from './RegisterViewFilter';
import RegisterViewTable from './RegisterViewTable';

const RegisterViewInnerLayout = ({
    classrooms
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentAttendanceHeaderMenus title="STUDENT ATTENDANCE" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <RegisterViewFilter
                            classrooms={classrooms}
                        />
                        <RegisterViewTable />
                        <RegisterViewDetail />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterViewInnerLayout;
