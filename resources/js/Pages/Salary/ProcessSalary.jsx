import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import ProcessSalaryInnerLayout from "./Partials/ProcessSalary/ProcessSalaryInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function ProcessSalary({
    auth,
    siteData,
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
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Process Salary
                </h2>
            }
        >
            <Head title="Process Salary" />

            <ProcessSalaryInnerLayout
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
        </DashboardLayout>
    );
}
