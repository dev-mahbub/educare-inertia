import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import EsiReportFilter from './EsiReportFilter';
import EsiReportTable from './EsiReportTable';

const EsiReportInnerLayout = ({
    paymentMonths,
    earningTypes,
    staffSalaryPayments
}) => {

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
                        <EsiReportFilter
                            paymentMonths={paymentMonths}
                            earningTypes={earningTypes}
                            totalReportCount={totalReportCount}
                        />
                        <EsiReportTable
                            staffSalaryPayments={staffSalaryPayments}
                            totalReportCount={totalReportCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EsiReportInnerLayout;
