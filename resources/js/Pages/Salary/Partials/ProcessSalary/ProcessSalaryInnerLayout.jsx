import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import ProcessFormAndTablesMain from "./ProcessFormAndTablesMain";

const ProcessSalaryInnerLayout = ({
    staffs,
    paymentMonths,
    staff,
    staffEarning,
    staffSalaryIncrement,
    staffSalaryPayments,
    totalAdvanceAmount,
    totalAdvanceDeductedAmount,
    totalPaidDueAmount,
    totalDueAmount,
    paymentModes,
    banks,
    bankAccounts,
    totalLeaves,
    staffLeaves,
    dayTypes,
    staffAttendanceSummary,
    totalAbsent,
    isLeaveDeductionOnGrossPay,
    staffExtraDuties,
    totalExtraDuty,
    previousExtraDutyCount,
    previousAbsentDeductedCount
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
                        <ProcessFormAndTablesMain
                            staffs={staffs}
                            paymentMonths={paymentMonths}
                            staff={staff}
                            staffEarning={staffEarning}
                            staffSalaryIncrement={staffSalaryIncrement}
                            staffSalaryPayments={staffSalaryPayments}
                            totalAdvanceAmount={totalAdvanceAmount}
                            totalAdvanceDeductedAmount={totalAdvanceDeductedAmount}
                            totalPaidDueAmount={totalPaidDueAmount}
                            totalDueAmount={totalDueAmount}
                            paymentModes={paymentModes}
                            banks={banks}
                            bankAccounts={bankAccounts}
                            totalLeaves={totalLeaves}
                            staffLeaves={staffLeaves}
                            dayTypes={dayTypes}
                            staffAttendanceSummary={staffAttendanceSummary}
                            totalAbsent={totalAbsent}
                            isLeaveDeductionOnGrossPay={isLeaveDeductionOnGrossPay}
                            staffExtraDuties={staffExtraDuties}
                            totalExtraDuty={totalExtraDuty}
                            previousExtraDutyCount={previousExtraDutyCount}
                            previousAbsentDeductedCount={previousAbsentDeductedCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcessSalaryInnerLayout;
