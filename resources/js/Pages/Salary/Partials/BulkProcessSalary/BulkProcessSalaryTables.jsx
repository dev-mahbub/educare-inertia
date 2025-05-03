import { useEffect, useState } from "react";
import BulkProcessSalaryForm from "./BulkProcessSalaryForm";
import BulkProcessSalaryTable from "./BulkProcessSalaryTable";

const BulkProcessSalaryTables = ({
    paymentMonths,
    staffEarnings,
    paymentModes,
    banks,
    bankAccounts,
    staffCategories
}) => {

    const [totalEarning, setTotalEarning] = useState(0)
    const [totalDeduction, setTotalDeduction] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [staffEarningData, setStaffEarningData] = useState([]);
    const [staffIds, setStaffIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [paymentMonthId, setPaymentMonthId] = useState(null);
    const [staffCategoryId, setStaffCategoryId] = useState(null);
    const [staffSubCategoryId, setStaffSubCategoryId] = useState(null);

    useEffect(() => {
        let earning_amount = 0;
        let deduction_amount = 0;
        let payable_amount = 0;

        setStaffEarningData(staffEarnings?.filter(item => staffIds?.includes(item?.staff_id))?.map(item => {
            const total_earning_amount = item?.earnings?.reduce((total, earning) => total + parseFloat(earning?.amount ?? 0), 0);
            const total_deduction_amount = item?.deductions?.reduce((total, deduction) => total + parseFloat(deduction?.amount ?? 0), 0);
            const total_payable_amount = total_earning_amount - total_deduction_amount;

            earning_amount += total_earning_amount;
            deduction_amount += total_deduction_amount;
            payable_amount += total_payable_amount;

            const extraDuties = item?.extra_duties?.flatMap(extraDuty => {
                return extraDuty?.attendances?.filter(attendance => attendance?.is_selected === true && attendance?.is_disabled == false) || []
            });

            let total_paid_extra_duty_count = 0;

            extraDuties?.forEach(extraDuty => {
                if (extraDuty?.is_selected) {
                    total_paid_extra_duty_count += extraDuty?.is_halfday == true ? 0.5 : 1;
                }
            });

            let total_extra_duty_amount = 0;

            if (total_paid_extra_duty_count > 0) {
                total_extra_duty_amount = (total_earning_amount / 30) * total_paid_extra_duty_count;
            }

            const leave_balance = (item?.total_leave + item?.total_extra_duty + item?.total_previous_absent_deduction) - (item?.total_absent + total_paid_extra_duty_count + item?.total_previous_extra_duty);

            return {
                staff_id: item?.staff_id,
                earnings: item?.earnings,
                deductions: item?.deductions,
                total_earning_amount: total_earning_amount,
                total_deduction_amount: total_deduction_amount,
                advance_deducted_amount: 0,
                paid_due_amount: 0,
                bonus_amount: 0,
                advance_amount: 0,
                payable_amount: total_payable_amount,
                paid_amount: total_payable_amount,
                due_amount: 0,
                absent_deductions: [],
                extra_duties: extraDuties,
                extra_duty_amount: total_extra_duty_amount,
                absent_deduction_amount: 0,
                total_leave: item?.total_leave,
                leave_balance: leave_balance,
                total_absent: item?.total_absent,
                total_extra_duty: item?.total_extra_duty,
                total_paid_extra_duty: total_paid_extra_duty_count,
                total_previous_extra_duty: item?.total_previous_extra_duty,
                total_deducted_absent: 0,
                total_previous_absent_deduction: item?.total_previous_absent_deduction,
                basic_pay: item?.basic_pay,
                grade_pay: item?.grade_pay
            }
        }));

        setTotalEarning(earning_amount);
        setTotalDeduction(deduction_amount);
        setTotalPayable(payable_amount);

        const payableEarningCount = staffEarnings?.filter(item => item?.is_paid == false)?.length;

        setSelectAll(payableEarningCount > 0 && payableEarningCount == staffIds?.length);
    }, [staffEarnings, staffIds]);

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-6 lg:col-span-12">
                        <BulkProcessSalaryTable
                            paymentMonths={paymentMonths}
                            staffEarnings={staffEarnings}
                            staffIds={staffIds}
                            setStaffIds={setStaffIds}
                            selectAll={selectAll}
                            setSelectAll={setSelectAll}
                            setPaymentMonthId={setPaymentMonthId}
                            staffCategories={staffCategories}
                            setStaffCategoryId={setStaffCategoryId}
                            setStaffSubCategoryId={setStaffSubCategoryId}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-6 lg:col-span-12">
                        <BulkProcessSalaryForm
                            totalEarning={totalEarning}
                            totalDeduction={totalDeduction}
                            totalPayable={totalPayable}
                            paymentModes={paymentModes}
                            banks={banks}
                            bankAccounts={bankAccounts}
                            staffEarningData={staffEarningData}
                            setStaffIds={setStaffIds}
                            paymentMonthId={paymentMonthId}
                            staffCategoryId={staffCategoryId}
                            staffSubCategoryId={staffSubCategoryId}
                         />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BulkProcessSalaryTables;
