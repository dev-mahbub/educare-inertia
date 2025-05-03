import React from 'react';
import ParentMonthlyIncomeTable from './ParentMonthlyIncomeTable';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
const ParentMonthlyIncomeInnerLayout = () => {
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
                     <ParentMonthlyIncomeTable/>
                </div>
            </div>
        </div>
        </>
    );
};

export default ParentMonthlyIncomeInnerLayout;