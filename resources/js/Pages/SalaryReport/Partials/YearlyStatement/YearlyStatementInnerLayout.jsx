import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import { useState } from "react";
import YearlyStatementFilter from "./YearlyStatementFilter";
import YearlyStatementTable from "./YearlyStatementTable";
import YearlyStatementTopbar from "./YearlyStatementTopbar";

const YearlyStatementInnerLayout = ({
    staffs,
    staffSalaryPayments
}) => {

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
                        <YearlyStatementTopbar
                            totalReportCount={totalReportCount}
                            params={params}
                        />
                        <YearlyStatementFilter
                            staffs={staffs}
                            totalReportCount={totalReportCount}
                            setParams={setParams}
                        />
                        <YearlyStatementTable
                            staffSalaryPayments={staffSalaryPayments}
                            totalReportCount={totalReportCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default YearlyStatementInnerLayout;
