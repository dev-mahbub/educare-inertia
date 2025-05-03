import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DeductedAmount from './DeductedAmount';
import DeductionTable from './DeductionTable';
import DueAmount from './DueAmount';
import EarningsTable from './EarningsTable';
import LeaveDetail from './LeaveDetail';
import NetSalary from './NetSalary';
import ProcessSalaryBottomForm from './ProcessSalaryBottomForm';
import ProcessSalaryRightTable from './ProcessSalaryRightTable';
import ProcessSalaryTopForm from './ProcessSalaryTopForm';

const ProcessFormAndTablesMain = ({
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

    const [selectedStaff, setSelectedStaff] = useState({});
    const [earningData, setEarningData] = useState([]);
    const [deductionData, setDeductionData] = useState([]);
    const [totalEarningAmount, setTotalEarningAmount] = useState(0);
    const [totalDeductionAmount, setTotalDeductionAmount] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [showBonusInput, setShowBonusInput] = useState(false);
    const [advancePayment, setAdvancePayment] = useState(false);
    const [attendanceDeductionData, setAttendanceDeductionData] = useState([]);
    const [totalAbsentDeduction, setTotalAbsentDeduction] = useState(0);
    const [totalAbsentDeductionAmount, setTotalAbsentDeductionAmount] = useState(0);
    const [totalPaidExtraDuty, setTotalPaidExtraDuty] = useState(0);
    const [staffExtraDutyData, setStaffExtraDutyData] = useState([]);
    const [totalExtraDutyAmount, setTotalExtraDutyAmount] = useState(0);
    const [leaveBalance, setLeaveBalance] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        employee_id: "",
        staff_id: "",
        payment_month_id: "",
        basic_pay: "",
        grade_pay: "",
        earnings: earningData,
        deductions: deductionData,
        payment_mode: "",
        payment_date: new Date(),
        payment_note: "",
        total_earning_amount: 0,
        total_deduction_amount: 0,
        advance_deducted_amount: 0,
        paid_due_amount: 0,
        bonus_amount: 0,
        advance_amount: 0,
        payable_amount: 0,
        paid_amount: 0,
        due_amount: 0,
        deduction_message: "",
        absent_deductions: attendanceDeductionData,
        extra_duties: staffExtraDutyData,
        extra_duty_amount: totalExtraDutyAmount,
        absent_deduction_amount: totalAbsentDeductionAmount,
        total_leave: totalLeaves,
        leave_balance: leaveBalance,
        total_absent: totalAbsent,
        total_extra_duty: totalExtraDuty,
        total_paid_extra_duty: totalPaidExtraDuty,
        total_previous_extra_duty: previousExtraDutyCount,
        total_deducted_absent: totalAbsentDeduction,
        total_previous_absent_deduction: previousAbsentDeductedCount,
        // cheque
        cheque_no: "",
        cheque_date: "",
        bank_id: "",
        branch: "",
        //bank process
        bank_account_id: "",

        //leave detail
        // deducted_current_month: "",
        // extra_duty_day: "",

        //earnings
        // basic_amount: "",
        // hra_amount: "",
        // vda_amount: "",
        // madical_amount: "",

        //deduct amount
        // deduct_amount: "",

        //deduction table
        // pf_amount: "",
        // esic_amount: "",

        //payment form
        // add_bonus_amount: "",
        // add_advance_amount: "",
        // amount_payable: "",
        // emp_code: "",

        //select payment mode
        // school_receipt_no: "",
        // keep_same_payment_detail: "",
        //cheque
        // cheque_no: "",
        // cheque_date: "",
        // bank_id: "",
        // amount: "",
        // bank_name: "",
        // branch: "",
        //Bank Process form
        // bank_account_id: "",
        //Demand Draft
        // dd_bank: "",
        // dd_number: "",
        // dd_amount: "",
        //Paytm
        // paytm_ref_no: "",
        // paytm_mobile: "",
        //Neft
        // neft_number: "",
        // neft_desc: "",
        //Online Back Office
        // transection_id: "",
        //UPI
        // upi_description: "",
        // upi_transection_id: "",
    });

    useEffect(() => {
        const leave_balance = (totalLeaves + totalAbsentDeduction + totalExtraDuty + previousAbsentDeductedCount) - (totalAbsent + totalPaidExtraDuty + previousExtraDutyCount);

        setLeaveBalance(leave_balance);

        setData((prevData) => ({
            ...prevData,
            extra_duty_amount: totalExtraDutyAmount,
            absent_deduction_amount: totalAbsentDeductionAmount,
            total_leave: totalLeaves,
            leave_balance: leave_balance,
            total_absent: totalAbsent,
            total_extra_duty: totalExtraDuty,
            total_paid_extra_duty: totalPaidExtraDuty,
            total_previous_extra_duty: previousExtraDutyCount,
            total_deducted_absent: totalAbsentDeduction,
            total_previous_absent_deduction: previousAbsentDeductedCount
        }));
    }, [totalExtraDutyAmount, totalAbsentDeductionAmount, totalLeaves, totalAbsentDeduction, totalExtraDuty, previousAbsentDeductedCount, totalAbsent, totalPaidExtraDuty, previousExtraDutyCount]);

    useEffect(() => {
        setSelectedStaff(staff ?? {});
    }, [staff]);

    useEffect(() => {
        if (selectedStaff?.id != null) {
            setData((prevData) => ({
                ...prevData,
                staff_id: selectedStaff?.id ?? '',
                employee_id: selectedStaff?.employee_id ?? ''
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                staff_id: '',
                employee_id: ''
            }));
        }
    }, [selectedStaff]);

    useEffect(() => {
        setStaffExtraDutyData(staffExtraDuties);
    }, [staffExtraDuties]);

    useEffect(() => {
        setEarningData(staffEarning?.earnings?.map(item => {
            if (staffSalaryIncrement?.id != null) {
                const selectedItem = staffSalaryIncrement?.earnings?.find(earning => earning?.earning_type_id == item?.earning_type_id);

                if (selectedItem) {
                    return {
                        ...item,
                        amount: selectedItem?.total_amount ?? 0,
                        is_editable: item?.earning_type_title == 'Transport' ? true : false
                    }
                }
            }

            return {
                ...item,
                is_editable: item?.earning_type_title == 'Transport' ? true : false
            }
        }) ?? []);

        setDeductionData(staffEarning?.deductions?.map(item => ({
            ...item,
            is_editable: item?.deduction_type_title == 'Transport' || item?.deduction_type_title == 'Due' || item?.deduction_type_title == 'Leave Deduction' ? true : false
        })) ?? []);

        setData((prevData) => ({
            ...prevData,
            basic_pay: staffEarning?.basic_pay,
            grade_pay: staffEarning?.grade_pay
        }));
    }, [staffEarning, staffSalaryIncrement]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            absent_deductions: attendanceDeductionData
        }));

        let total_absent_dedcution_count = 0;

        attendanceDeductionData?.forEach(item => {
            if(item?.is_selected) {
                total_absent_dedcution_count += item?.day_type == 'Half Day' ? 0.5 : 1;
            }
        });

        let total_absent_dedcution_amount = 0;

        if (total_absent_dedcution_count > 0) {
            if (isLeaveDeductionOnGrossPay == true) {
                total_absent_dedcution_amount = (totalEarningAmount / 30) * total_absent_dedcution_count;
            } else {
                total_absent_dedcution_amount = ((parseInt(data?.basic_pay ?? 0) + parseInt(data?.grade_pay ?? 0)) / 30) * total_absent_dedcution_count;
            }
        }

        setTotalAbsentDeduction(total_absent_dedcution_count);
        setTotalAbsentDeductionAmount(parseInt(total_absent_dedcution_amount));
    }, [attendanceDeductionData, data?.basic_pay, data?.grade_pay, isLeaveDeductionOnGrossPay, totalEarningAmount]);

    useEffect(() => {
        const extraDuties = staffExtraDutyData?.flatMap(item => {
            return item?.attendances?.filter(attendance => attendance?.is_selected === true && attendance?.is_disabled == false) || []
        });

        setData((prevData) => ({
            ...prevData,
            extra_duties: extraDuties
        }));

        let total_paid_extra_duty_count = 0;

        extraDuties?.forEach(item => {
            if(item?.is_selected) {
                total_paid_extra_duty_count += item?.is_halfday == true ? 0.5 : 1;
            }
        });

        let total_extra_duty_amount = 0;

        if (total_paid_extra_duty_count > 0) {
            total_extra_duty_amount = (totalEarningAmount / 30) * total_paid_extra_duty_count;
        }

        setTotalPaidExtraDuty(total_paid_extra_duty_count);
        setTotalExtraDutyAmount(parseInt(total_extra_duty_amount));
    }, [staffExtraDutyData, totalEarningAmount]);

    useEffect(() => {
        setTotalEarningAmount(earningData?.reduce((total, item) => total + (item?.amount ? parseInt(item.amount) : 0), 0));

        setData((prevData) => ({
            ...prevData,
            earnings: earningData
        }))
    }, [earningData]);

    useEffect(() => {
        setTotalDeductionAmount(deductionData?.reduce((total, item) => total + (item?.amount ? parseInt(item.amount) : 0), 0));

        setData((prevData) => ({
            ...prevData,
            deductions: deductionData
        }))
    }, [deductionData]);

    useEffect(() => {
        setPayableAmount((totalEarningAmount + totalExtraDutyAmount) - (totalDeductionAmount + totalAbsentDeductionAmount));
        setPaidAmount((totalEarningAmount + totalExtraDutyAmount) - (totalDeductionAmount + totalAbsentDeductionAmount));

        setData((prevData) => ({
            ...prevData,
            total_earning_amount: totalEarningAmount,
            total_deduction_amount: totalDeductionAmount
        }));
    }, [totalEarningAmount, totalDeductionAmount, totalAbsentDeductionAmount, totalExtraDutyAmount]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            payable_amount: payableAmount,
            paid_amount: paidAmount,
            due_amount: payableAmount - paidAmount,
        }));
    }, [payableAmount, paidAmount]);

    //handle top form
    const handleTopForm = (e) => {
        e.preventDefault();
    };

    // Handle amount change for earnings and deductions start
    const handleAmountChange = (type, index, value) => {
        let amount = 0;

        if (isNaN(amount) || value == '') {
            amount = 0;
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        if(type == 'earning') {
            const updatedEarnings = earningData?.map((earning, i) =>
                i === index ? { ...earning, amount: amount } : earning
            );

            setEarningData(updatedEarnings);
        }
        else if(type == 'deduction') {
            const updatedDeductions = deductionData?.map((deduction, i) =>
                i === index ? { ...deduction, amount: amount } : deduction
            );

            setDeductionData(updatedDeductions);
        }
    };
    // Handle amount change for earnings and deductions end

    // handle change paid amount start
    const handlePaidAmountChange = (value) => {
        let amount = 0;

        if (isNaN(amount) || value == '') {
            amount = 0;
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        if (amount > payableAmount) {
            amount = payableAmount;
        }

        setPaidAmount(amount);
    };
    // handle change paid amount end


    // handle change advance deducted amount start
    const handlePaidDueAmountChange = (value) => {
        const netDueAmount = totalDueAmount - totalPaidDueAmount;

        let amount = 0;

        if (isNaN(amount) || value == '') {
            amount = 0;
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        if (amount > netDueAmount) {
            amount = netDueAmount;
        }

        setPayableAmount((prevAmount) => (prevAmount - (data?.paid_due_amount ?? 0)) + amount);
        setPaidAmount((prevAmount) => (prevAmount - (data?.paid_due_amount ?? 0)) + amount);

        setData((prevData) => ({
            ...prevData,
            paid_due_amount: amount
        }));
    };
    // handle change advance deducted amount end

    // handle save process salary start
    const handleSaveProcessSalary = (e) => {
        e.preventDefault();

        post(route('salary.process.save'), {
            onSuccess: () => {
                handleSalryProcessSuccess();
            },
            onError: () => {
                const form_data = {
                    staff_id: data?.staff_id,
                    payment_month_id: data?.payment_month_id
                }

                router.post(route('salary.process'), form_data);
            }
        });
    }
    // handle save process salary end

    // handle salary process success start
    const handleSalryProcessSuccess = () => {
        setData((prevData) => ({
            ...prevData,
            payment_month_id: "",
            payment_mode: "",
            payment_date: new Date(),
            payment_note: "",
            cheque_no: "",
            cheque_date: "",
            bank_id: "",
            branch: "",
            bank_account_id: "",
        }));
        setEarningData([]);
        setDeductionData([]);
        setTotalEarningAmount(0);
        setTotalDeductionAmount(0);
        setPayableAmount(0);
        setPaidAmount(0);
        setShowBonusInput(false);
        setAdvancePayment(false);
        setAttendanceDeductionData([]);
        setAttendanceDeductionData([]);
        setTotalAbsentDeduction(0);
        setTotalAbsentDeductionAmount(0);
        setStaffExtraDutyData([]);
        setTotalExtraDutyAmount(0);

        const form_data = {
            staff_id: data?.staff_id
        }

        router.post(route('salary.process'), form_data);
    }
    // handle salary process success end

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    {/*left side form start*/}
                    <div className="col-span-12 4xl:col-span-5 ">
                        <ProcessSalaryTopForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            handleTopForm={handleTopForm}
                            staffs={staffs}
                            paymentMonths={paymentMonths}
                            setAttendanceDeductionData={setAttendanceDeductionData}
                            setTotalAbsentDeduction={setTotalAbsentDeduction}
                            setTotalAbsentDeductionAmount={setTotalAbsentDeductionAmount}
                            setStaffExtraDutyData={setStaffExtraDutyData}
                            setTotalExtraDutyAmount={setTotalExtraDutyAmount}
                        />

                        {data?.payment_month_id &&
                            <>
                                <LeaveDetail
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    totalLeaves={totalLeaves}
                                    staffLeaves={staffLeaves}
                                    dayTypes={dayTypes}
                                    staffAttendanceSummary={staffAttendanceSummary}
                                    setAttendanceDeductionData={setAttendanceDeductionData}
                                    totalAbsentDeduction={totalAbsentDeduction}
                                    totalAbsent={totalAbsent}
                                    totalExtraDuty={totalExtraDuty}
                                    totalPaidExtraDuty={totalPaidExtraDuty}
                                    staffExtraDutyData={staffExtraDutyData}
                                    setStaffExtraDutyData={setStaffExtraDutyData}
                                    previousExtraDutyCount={previousExtraDutyCount}
                                    previousAbsentDeductedCount={previousAbsentDeductedCount}
                                    leaveBalance={leaveBalance}
                                />

                                <EarningsTable
                                    errors={errors}
                                    earningData={earningData}
                                    handleAmountChange={handleAmountChange}
                                    totalEarningAmount={totalEarningAmount}
                                />

                                <DeductionTable
                                    errors={errors}
                                    deductionData={deductionData}
                                    handleAmountChange={handleAmountChange}
                                    totalDeductionAmount={totalDeductionAmount}
                                />

                                <NetSalary
                                    totalEarningAmount={totalEarningAmount}
                                    totalDeductionAmount={totalDeductionAmount}
                                    payableAmount={payableAmount}
                                    data={data}
                                    totalAbsentDeductionAmount={totalAbsentDeductionAmount}
                                    totalAbsentDeduction={totalAbsentDeduction}
                                    totalExtraDutyAmount={totalExtraDutyAmount}
                                    totalPaidExtraDuty={totalPaidExtraDuty}
                                />

                                {totalAdvanceAmount > 0 &&
                                    <DeductedAmount
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        totalAdvanceAmount={totalAdvanceAmount}
                                        totalAdvanceDeductedAmount={totalAdvanceDeductedAmount}
                                    />
                                }

                                {totalDueAmount > 0 &&
                                    <DueAmount
                                        data={data}
                                        errors={errors}
                                        totalPaidDueAmount={totalPaidDueAmount}
                                        totalDueAmount={totalDueAmount}
                                        handlePaidDueAmountChange={handlePaidDueAmountChange}
                                    />
                                }
                            </>
                        }

                        <ProcessSalaryBottomForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            handlePaidAmountChange={handlePaidAmountChange}
                            setPayableAmount={setPayableAmount}
                            setPaidAmount={setPaidAmount}
                            paymentModes={paymentModes}
                            banks={banks}
                            bankAccounts={bankAccounts}
                            handleSaveProcessSalary={handleSaveProcessSalary}
                            showBonusInput={showBonusInput}
                            setShowBonusInput={setShowBonusInput}
                            advancePayment={advancePayment}
                            setAdvancePayment={setAdvancePayment}
                        />
                    </div>
                    {/*left side form end*/}

                    {/*Right side table*/}
                    <div className="col-span-12 4xl:col-span-7 ">
                        <ProcessSalaryRightTable
                            staffSalaryPayments={staffSalaryPayments}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcessFormAndTablesMain;
