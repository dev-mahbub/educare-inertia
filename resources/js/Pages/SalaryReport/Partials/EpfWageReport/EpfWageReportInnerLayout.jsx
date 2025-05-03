import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import { useState } from 'react';
import EpfWageReportFilter from './EpfWageReportFilter';
import EpfWageReportTable from './EpfWageReportTable';

const EpfWageReportInnerLayout = ({
    paymentMonths,
    staffSalaryPayments
}) => {

    const [filterText, setFilterText] = useState("");
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
                        <EpfWageReportFilter
                            paymentMonths={paymentMonths}
                            totalReportCount={totalReportCount}
                            setFilterText={setFilterText}
                        />
                        <EpfWageReportTable
                            staffSalaryPayments={staffSalaryPayments}
                            totalReportCount={totalReportCount}
                            filterText={filterText}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EpfWageReportInnerLayout;
