import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import BulkProcessSalaryTables from './BulkProcessSalaryTables';

const BulkProcessSalaryInnerLayout = ({
    paymentMonths,
    staffEarnings,
    paymentModes,
    banks,
    bankAccounts,
    staffCategories
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                        <SalaryHeaderMenu title="Salary Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                         <BulkProcessSalaryTables
                            paymentMonths={paymentMonths}
                            staffEarnings={staffEarnings}
                            paymentModes={paymentModes}
                            banks={banks}
                            bankAccounts={bankAccounts}
                            staffCategories={staffCategories}
                         />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BulkProcessSalaryInnerLayout;
