import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import MonthlyAdmissionFilter from './MonthlyAdmissionFilter';
import MonthlyAdmissionTable from './MonthlyAdmissionTable';

const MonthlyAdmissionInnerLayout = ({
    academicYears,
    monthlyAdmissionReports
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentHeaderMenus title="STUDENTS" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <MonthlyAdmissionFilter
                            academicYears={academicYears}
                            monthlyAdmissionReports={monthlyAdmissionReports}
                        />
                        <MonthlyAdmissionTable
                            monthlyAdmissionReports={monthlyAdmissionReports}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MonthlyAdmissionInnerLayout;
