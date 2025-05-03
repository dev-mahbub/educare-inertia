import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import { useState } from 'react';
import PublishSalaryTable from './PublishSalaryTable';
import PublishSalaryTopbar from './PublishSalaryTopbar';

const PublishSalaryInnerLayout = ({
    paymentMonths,
    staffSalaryPayments
}) => {

    const [staffSalaryPaymentIds, setStaffSalaryPaymentIds] = useState([]);

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
                    <PublishSalaryTopbar
                        paymentMonths={paymentMonths}
                        staffSalaryPayments={staffSalaryPayments}
                        staffSalaryPaymentIds={staffSalaryPaymentIds}
                        setStaffSalaryPaymentIds={setStaffSalaryPaymentIds}
                        />
                    <PublishSalaryTable
                        staffSalaryPayments={staffSalaryPayments}
                        staffSalaryPaymentIds={staffSalaryPaymentIds}
                        setStaffSalaryPaymentIds={setStaffSalaryPaymentIds}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default PublishSalaryInnerLayout;
