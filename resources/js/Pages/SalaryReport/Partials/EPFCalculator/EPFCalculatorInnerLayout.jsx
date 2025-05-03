import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import { useState } from 'react';
import EPFCalculatorFilter from './EPFCalculatorFilter';
import EPFCalculatorTable from './EPFCalculatorTable';

const EPFCalculatorInnerLayout = ({
    paymentMonths,
    earningTypes,
    staffSalaryPayments
}) => {

    const [earningTypeTitles, setEarningTypeTitles] = useState([]);

    const totalReportCount = staffSalaryPayments?.length;

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-bottom-header">
                    <div className="educare-bottom-header-middle">
                        <SalaryHeaderMenu title="Salary Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-dashboard-main-content-body-wrap">
                        <EPFCalculatorFilter
                            paymentMonths={paymentMonths}
                            earningTypes={earningTypes}
                            setEarningTypeTitles={setEarningTypeTitles}
                            totalReportCount={totalReportCount}
                        />
                        <EPFCalculatorTable
                            earningTypeTitles={earningTypeTitles}
                            totalReportCount={totalReportCount}
                            staffSalaryPayments={staffSalaryPayments}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EPFCalculatorInnerLayout;
