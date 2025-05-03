import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import AdvancePaymentReportFilter from './AdvancePaymentReportFilter';
import AdvancePaymentReportTable from './AdvancePaymentReportTable';

const AdvancePaymentReportInnerLayout = ({
    staffs,
    paymentMonths,
    staffAdvancePayments
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
                    <AdvancePaymentReportFilter
                        staffs={staffs}
                        paymentMonths={paymentMonths}
                        staffAdvancePayments={staffAdvancePayments}
                    />
                    <AdvancePaymentReportTable
                        staffAdvancePayments={staffAdvancePayments}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdvancePaymentReportInnerLayout;
