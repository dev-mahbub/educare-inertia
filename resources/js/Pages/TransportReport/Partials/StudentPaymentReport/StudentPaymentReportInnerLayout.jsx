import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import React from 'react';
import StudentPaymentReportFilter from './StudentPaymentReportFilter';
import StudentPaymentReportList from './StudentPaymentReportList';

const StudentPaymentReportInnerLayout = ({ vouchers, students, StudentFees }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentPaymentReportFilter />
                    <StudentPaymentReportList
                        vouchers={vouchers}
                        students={students}
                        StudentFees={StudentFees} />
                </div>
            </div>
        </div>
    );
};

export default StudentPaymentReportInnerLayout;
