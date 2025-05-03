import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import PaymentMonthListFrom from './PaymentMonthListFrom';

const PaymentMonthInnerLayout = ({
    paymentMonths
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
                    <PaymentMonthListFrom
                        paymentMonths={paymentMonths}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentMonthInnerLayout;
