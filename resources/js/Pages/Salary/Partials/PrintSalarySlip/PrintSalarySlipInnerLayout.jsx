import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import PrintSalarySlipCard from './PrintSalarySlipCard';

const PrintSalarySlipInnerLayout = ({
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
                    <PrintSalarySlipCard
                        paymentMonths={paymentMonths}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrintSalarySlipInnerLayout;
