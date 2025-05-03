import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import { useState } from "react";
import BankStatementFilter from "./BankStatementFilter";
import BankStatementFilterTopbar from "./BankStatementFilterTopbar";
import BankStatementTable from "./BankStatementTable";
const BankStatementInnerLayout = ({
    paymentMonths,
    staffSalaryPayments
}) => {

    const [filterText, setFilterText] = useState("");
    const [params, setParams] = useState({});

    const totalReportCount = staffSalaryPayments?.length;

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
                        <BankStatementFilterTopbar
                            totalReportCount={totalReportCount}
                            params={params}
                        />
                        <BankStatementFilter
                            paymentMonths={paymentMonths}
                            totalReportCount={totalReportCount}
                            setFilterText={setFilterText}
                            setParams={setParams}
                        />
                        <BankStatementTable
                            staffSalaryPayments={staffSalaryPayments}
                            filterText={filterText}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BankStatementInnerLayout;
