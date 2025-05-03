import React from 'react';
import RegisterViewFilter from './RegisterViewFilter';
import RegisterViewTable from './RegisterViewTable';
import StaffAttendanceHeaderMenus from '@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus';

const RegisterViewInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StaffAttendanceHeaderMenus title="Staff Attendance" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <RegisterViewFilter />
                        <RegisterViewTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterViewInnerLayout;