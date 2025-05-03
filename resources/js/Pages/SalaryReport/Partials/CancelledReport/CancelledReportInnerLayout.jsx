import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import CancelledReportFilter from './CancelledReportFilter';
import CancelledReportTable from './CancelledReportTable';

const CancelledReportInnerLayout = ({
    paymentMonths,
    staffs,
    cancelledStaffSalaryPayments
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <SalaryHeaderMenu title="Salary Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CancelledReportFilter
                        paymentMonths={paymentMonths}
                        staffs={staffs}
                        cancelledStaffSalaryPayments={cancelledStaffSalaryPayments}
                    />
                    <CancelledReportTable
                        cancelledStaffSalaryPayments={cancelledStaffSalaryPayments}
                    />
                </div>
            </div>
        </div>
    );
};

export default CancelledReportInnerLayout;
